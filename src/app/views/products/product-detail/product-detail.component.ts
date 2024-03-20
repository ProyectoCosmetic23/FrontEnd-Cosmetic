import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
import { CategoriesService } from "src/app/shared/services/category.service";
import { ProductService } from "src/app/shared/services/product.service";
import { ProductFormModel } from "../models/product.model";



// Función validadora para comparar el stock mínimo y el stock máximo
export function stockMinMaxValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const minStock = control.get('min_stock').value;
    const maxStock = control.get('max_stock').value;

    if (minStock !== null && maxStock !== null && minStock > maxStock) {
      return { invalidStockRange: true };
    }
    return null;
  };
}

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  listProducts: any[] = [];
  productForm: FormGroup;
  productFormSub: Subscription;
  loading: boolean = false;
  formBasic: FormGroup;
  viewMode: "new" | "edit" | "print" = "new";
  id: string;
  isNew: boolean;
  invoice: any = {};
  listCategories: any[] = [];
  categoriesFormArray: FormArray;
  selectedCategory: string;
  activeCategories: any[];
  invoiceForm: UntypedFormGroup;
  invoiceFormSub: Subscription;
  subTotal: number;
  saving: boolean;
  productData: ProductFormModel;
  isEditMode: boolean;
  isShowForm: boolean;
  showLoadingScreen: boolean = false;
  // Agrega esta variable al inicio de tu componente

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private productsService: ProductService,
    private cookieService: CookieService,
    private datePipe: DatePipe,
    private _categoriesService: CategoriesService,
    private _productService: ProductService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._authService.validateUserPermissions("Productos");
    this.id = this.route.snapshot.params["id_product"];
    this.isNew = !this.id;
    this.setViewMode();
    this.getProducts();
    this.loadCategories();
    this.inicializateForm(Number(this.id));
    
    // this.toggleEnableFields();
  }

  private inicializateForm(id: number): void {
    this.productForm = this.formBuilder.group({
      id_product: [""],
      id_category: ["", [Validators.required]],
      name_product: [
        "",
        [Validators.required, Validators.maxLength(80)],
        [this.validateNameSimbolAndNumber],
      ],
      quantity: [null, [Validators.required]], // Establece el valor inicial en 0
      max_stock: [null, [Validators.required, Validators.min(1), this.validateNonNegative]], // Establece el valor inicial en 0 y agrega validador requerido y validador de no negativos
      min_stock: [null, [Validators.required, Validators.min(1), this.validateNonNegative]], // Establece el valor inicial en 0 y agrega validador requerido y validador de no negativos
      profit: [],
      cost_price: [null, [Validators.required, Validators.min(0)]], // Establece el valor inicial en 0 y agrega validador mínimo
      selling_price: [null, [Validators.required, Validators.min(1)]], // Establece el valor inicial en 0 y agrega validador mínimo
      observation: ["", [Validators.maxLength(100)]],
      state_product: [],
      creation_date_product: [],
      reason_anulate: [""],
      enableFields: [false], // Nuevo campo para el checkbox
    }, { validators: stockMinMaxValidator() }); // Aplicar la validación
    

    if (this.viewMode == "print") {
      this.productForm && this.productForm.get("id_category");
      this.productForm.disable();
    }

    if (this.viewMode == "edit") {
      this.productForm && this.productForm.get("id_category");
      this.productForm.get("id_category");
    }

    if (this.viewMode == "new") {
      this.disabledFieldsNewForm();
    }

    if (this.viewMode != "new") {
      this.productForm.get("quantity").disable();
      this.productForm.get("cost_price").disable();
      const token = this.cookieService.get("token");
      this.getProductByID(id, token);
    }
  }

  toggleEnableFields() {
    const enableFields = this.productForm.get("enableFields").value;

    if (enableFields && this.viewMode === "new") {
      // Cuando el checkbox está habilitado en modo nuevo
      this.productForm.disable();
      this.productForm.get("quantity").enable();
      this.productForm.get("cost_price").enable();
      this.productForm.get("selling_price").enable();
      this.enableFields.enable();
      this.productForm.get("id_product").enable();
      // Eliminar los valores cuando el checkbox está habilitado
      this.productForm.get("quantity").setValue(null);
      this.productForm.get("cost_price").setValue(null);
      this.productForm.get("selling_price").setValue(null);
      this.productForm.reset();
      this.enableFields.setValue(true);
    } else {
      // Cuando el checkbox está deshabilitado o en modo de edición
      this.productForm.enable();
      this.productForm.reset();
      this.disabledFieldsNewForm();
    }
  }

  disabledFieldsNewForm() {
    this.productForm.get("quantity").disable();
    this.productForm.get("cost_price").disable();
    this.productForm.get("selling_price").disable();

    // Establecer los valores en 0 cuando el checkbox está deshabilitado
    this.productForm.get("quantity").setValue(0);
    this.productForm.get("cost_price").setValue(0);
    this.productForm.get("selling_price").setValue(0);
  }


  

  loadCategories() {
    this._categoriesService.getAllCategory().subscribe(
      (data) => {
        this.listCategories = data;  
        // Filtrar categorías activas y agregarlas a la lista activeCategories
        this.activeCategories = this.listCategories.filter(category => category.state_category === true);
      },
      (error) => {
        console.error('Error al obtener la lista de categorías:', error);
      }
    );
  }


  private getProductByID(id: number, token?: string): void {
    this.showLoadingScreen = true;
    this.loading = true;
    this.productsService.getProductsById(id, token).subscribe({
      next: (response: any) => {
        this.productData = new ProductFormModel(response);
        this.setDataProduct();
        // this.listProducts = [response];  // Almacena el producto en la lista
      },
      error: (err) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.showLoadingScreen = false;
      },
    });
  }

  private setDataProduct(): void {
    if (this.productData) {
      const { id_product, creation_date_product, ...otherProductData } =
        this.productData;

      if (this.idProduct) {
        this.idProduct.setValue(id_product);
      }
      if (this.productForm) {
        this.productForm.patchValue(otherProductData);
      }
      if (this.dateProduct) {
        this.dateProduct.setValue(
          this.datePipe.transform(creation_date_product, "yyyy-MM-dd")
        );
      }
    }
  }

  handleCategorySelection(event: any) {
    const selectedCategoryId = event.target.value;
    const selectedCategory = this.listCategories.find(
      (category) => category.id_category == selectedCategoryId
    );
  }

  handleProductSelection(event: any) {
    const selectedProductId = event.target.value;
    this.productData = this.listProducts.find(
      (product) => product.id_product == selectedProductId
    );
    this.id = this.productData.id_product;
    // completar fo
    this.setDataProduct();
  }

  validateNonNegative(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value < 0) {
      return { negativeValue: true };
    }
    return null;
  }
  
  
  createProduct() {
    Object.values(this.productForm.controls).forEach((control) => {
      control.markAsTouched();
    });

    if (this.enableFields.value) {
      this.saveChanges();
    } else {
      if (this.productForm.valid) {
        const productData = this.productForm.value;
        productData.quantity = this.productForm.get("quantity").value;
        productData.cost_price = this.productForm.get("cost_price").value;
        productData.selling_price = this.productForm.get("selling_price").value;
        const token = this.cookieService.get("token");
        this.loading = true;
        this.productsService.createProduct(productData, token).subscribe(
          (response) => {
            this.loading = false;
            this.submit();
          },
          (error) => {
            this.loading = false;
            console.error("Error al crear producto: ", error);
            const errorMessage = error.error
              ? error.error
              : "Ocurrió un error al crear el producto.";
            this.toastr.error(errorMessage, "Error");
          }
        );
      } else {
        this.toastr.error(
          "Por favor, complete todos los campos correctamente.",
          "Error de validación",
          { progressBar: true, timeOut: 3000 }
        );
      }
    }
  }

  getCategoryName(category_id: string): string {
    return this.listCategories.find((x) => x.id_category == category_id)
      .name_category;
  }

  validateNameSimbolAndNumber(control: FormControl) {
    const nameValue = control.value;
    const combinedPattern = /^(?!.*\s{2})[A-Za-záéíóúñÑ´](?:[A-Za-záéíóúñÑ´\d]*[A-Za-záéíóúñÑ´\d])?(\s[A-Za-záéíóúñÑ´\d]+)*$/;
  
    return new Promise((resolve) => {
      setTimeout(() => {
        if (combinedPattern.test(nameValue)) {
          resolve(null); // Válido
        } else {
          resolve({ invalidName: true }); // No válido
        }
      }, 0);
    });
}

  
  
  

  

  saveProductChanges(id: number, updatedData: any) {
    const token = this.cookieService.get("token");
    this.productsService.updateProduct(id, updatedData, token).subscribe(
      (response) => {
        this.loading = false;
        this.submit();
      },
      (error) => {
        this.loading = false;
        console.error("Error al crear producto: ", this.toastr.error);
        const errorMessage = error.error
          ? error.error
          : "Ocurrió un error al crear el producto.";
        this.toastr.error(errorMessage, "Error");
      }
    );
  }

  public submitProduct(): void {
    if (this.viewMode == "new") {
      this.createProduct();
    } else if (this.viewMode == "edit") {
      this.saveChanges();
    }
  }

  saveChanges() {
    if (this.productForm.valid) {
      const id = Number(this.id); // Convierte el ID a número
      const updatedData = {
        id_category: this.productForm.get("id_category").value,
        name_product: this.productForm.get("name_product").value,
        cost_price: this.productForm.get("cost_price").value,
        selling_price: this.productForm.get("selling_price").value,
        max_stock: this.productForm.get("max_stock").value,
        min_stock: this.productForm.get("min_stock").value,
        observation: this.productForm.get("observation").value,
        quantity: this.productForm.get("quantity").value,
      };
      this.saveProductChanges(id, updatedData);
    } else {
      this.toastr.error(
        "Por favor, complete todos los campos correctamente.",
        "Error de validación",
        { progressBar: true, timeOut: 3000 }
      );
    }
  }

  cancel() {
    this.router.navigateByUrl("/products");
  }

  submit() {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        if (this.viewMode === 'new') {
          this.toastr.success("Producto registrado con éxito.", "Éxito", {
            progressBar: true,
            timeOut: 3000,
          });
        } else if (this.viewMode === 'edit') {
          this.toastr.success("Producto modificado con éxito.", "Éxito", {
            progressBar: true,
            timeOut: 3000,
          });
        }
        setTimeout(() => {
          this.router.navigateByUrl("/products");
        });
      });
    }
  }
  



  
  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes("/new")) {
      this.viewMode = "new";
    } else if (currentRoute.includes("/edit/")) {
      this.viewMode = "edit";
    } else if (currentRoute.includes("/print/")) {
      this.showLoadingScreen = true;
      this.viewMode = "print";
    }
  }

  
  
  print() {
    if (window) {
      window.print();
    }
  }

  getProducts() {
    this._productService.getAllProducts().subscribe(
      (data) => {
        this.listProducts = data;
      },
      (error) => {
        console.error("Error al obtener Productos:", error);
      }
    );
  }

  get idProduct() {
    return this.productForm.get("id_product");
  }

  get dateProduct() {
    return this.productForm.get("creation_date_product");
  }

  get idCategory() {
    return this.productForm.get("id_category");
  }

  get enableFields() {
    return this.productForm.get("enableFields");
  }
}