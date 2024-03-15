import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  UntypedFormArray,
  FormControl,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Utils } from "src/app/shared/utils";
import { PurchaseFormMode, Detail } from "../models/purchase.model";
import { ProvidersService } from "src/app/shared/services/provider.service";
import { ProductService } from "src/app/shared/services/product.service";
import { CategoriesService } from "src/app/shared/services/category.service";
import { PurchasesService } from "src/app/shared/services/purchase.service";
import {
  NgbDateStruct,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductFormModel } from "../../products/models/product.model";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-purchase-detail",
  templateUrl: "./purchase-detail.component.html",
  styleUrls: ["./purchase-detail.component.scss"],
  template: `
    <div class="table-footer">
      <div class="col-md-8"></div>
      <div class="col-md-8">
        <div class="total">Total: {{ formatCurrency() }}</div>
      </div>
    </div>
  `,
})
export class PurchaseDetailComponent implements OnInit {
  purchaseForm: FormGroup;
  purchaseDetailform: FormGroup;
  loading: boolean;
  viewMode: "new" | "print" = "new";
  isNew: boolean;
  id: string;
  purchaseData: PurchaseFormMode;
  purchaseDetailArray: Detail[] = [];
  listProviders: any[] = [];
  listCategories: any[] = [];
  listProducts: any[] = [];
  selected_categories: string;
  selected_providers: string;
  selected_product: string;
  providersFormArray: FormArray = this.formBuilder.array([]);
  categoriesFormArray: FormArray;
  productsFormSelect: FormArray;
  products: any[] = [];
  purchaseExists: boolean;
  modalAbierto = false;
  reasonForm: FormGroup;
  productForm: FormGroup;
  productData: ProductFormModel;
  productExists: boolean;
  numberInvoiceExists: boolean;
  showLoadingScreen: boolean;




  minDate = { year: 2023, month: 1, day: 1 };
  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private categoriesService: CategoriesService,
    private providersService: ProvidersService,
    private productsService: ProductService,
    private purchaseService: PurchasesService,
    private modalService: NgbModal,
    private _authService: AuthService
  ) {}
  //INICIALIZAR FORMULARIO Y GETS
  ngOnInit() {
    this._authService.validateUserPermissions("Compras");
    this.id = this.route.snapshot.params["id_purchase"];
    this.isNew = !this.id;
    this.getProviders();
    this.getProducts();
    this.getCategories();
    this.setViewMode();
    this.inicializateForm(Number(this.id));
    this.inicializateProductForm(Number(this.id));
    this.providersFormArray.push(this.formBuilder.control(''));
  }

  //FORMULARIO PARA MANEJAR EN EL LOS METODOS
  private inicializateForm(id: number): void {
    this.purchaseForm = this.formBuilder.group({
      id_purchase: [""],
      invoice_number: ["",[
        Validators.maxLength(10),
        Validators.required, 
        ]],
      id_provider: ["", [Validators.required]],
      purchase_date: ["", [Validators.required]],
      state_purchase: [""],
      observation_purchase: ["", [Validators.maxLength(80)]],
      record_date_purchase: [""],
      reason_anulate: [""],
      products: this.formBuilder.array([]),
    });

    this.purchaseDetailform = this.formBuilder.group({
      id_product: ["", [Validators.required]],
      id_category: ["", [Validators.required]],
      cost_price: ["", [Validators.required]],
      selling_price: [""],
      vat: [""],
      product_quantity: ["", [Validators.required]],
    });

    // Agrega la validación personalizada para el precio de venta
    this.purchaseDetailform
      .get("selling_price")
      .setValidators([
        Validators.required,
        this.validatePriceSelling.bind(this),
      ]);
    this.purchaseDetailform
      .get("vat")
      .setValidators([Validators.required, this.validateVat.bind(this)]);
    this.purchaseForm
      .get("invoice_number")
      .setValidators([Validators.required, Validators.maxLength(10)]);

    if (this.viewMode == "print") {
      this.purchaseForm.disable();
    }

    if (this.viewMode != "new") {
      this.getPurchaseById(id);
    }
  }

  private inicializateProductForm(id: number): void {
    this.productForm = this.formBuilder.group({
      id_category: ["", [Validators.required]],
      name_product: [
        "",
        [
          Validators.required,
          Validators.maxLength(80),
          Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]+$"),
        ],
      ],
      observation: ["", [Validators.maxLength(80)]],
      id_product: [""],
      quantity: 0,
      max_stock: [""],
      min_stock: [""],
      cost_price: 0,
      selling_price: 0,
      profit: 0,
      creation_date_product: [""],
      state_product: [""],
    });
    this.productForm
      .get("max_stock")
      .setValidators([Validators.required, this.validateStockMax.bind(this)]);
  }

  getProviders() {
    this.showLoadingScreen = true;
    this.providersService.getAllProviders().subscribe(
      (data) => {
        this.listProviders = data;
      },
      (error) => {
        console.error("Error al obtener proveedores:", error);
      }
    );
  }

  getProducts() {
    this.showLoadingScreen = true;
    this.productsService.getAllProducts().subscribe(
      (data) => {
        this.listProducts = data;
      },
      (error) => {
        console.error("Error al obtener productos:", error);
      }
    );
  }

  getCategories() {
    this.showLoadingScreen = true;
    this.categoriesService.getAllCategory().subscribe(
      (data) => {
        this.listCategories = data;
      },
      (error) => {
        console.error("Error al obtener proveedores:", error);
      }
    );
  }

  //FORMATEAR LA FECHA
  convertDateForServer(dateStruct: NgbDateStruct): string {
    if (!dateStruct) {
      return null;
    }
    return `${dateStruct.year}-${dateStruct.month}-${dateStruct.day}`;
  }

  formatRecordDate(recordDate: string): NgbDateStruct {
    const date = new Date(recordDate);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }
  //PLANTILLA DE DETALLE de compras
  private createDetailFormGroup(detail: Detail): FormGroup {
    return this.formBuilder.group({
      id_product: [detail.id_product],
      name_product: [
        this.getProductName(detail.id_category, detail.id_product),
      ],
      id_category: [detail.id_category],
      name_category: [this.getCategoryName(detail.id_category)],
      cost_price: [detail.cost_price],
      selling_price: [detail.selling_price],
      vat: [detail.vat],
      product_quantity: [detail.product_quantity],
    });
  }

  private getPurchaseById(id: number): void {
    this.loading = true;
    this.purchaseService.getPurchaseById(id).subscribe({
      next: (response: any) => {
        this.purchaseData = new PurchaseFormMode(response);
        this.setDataPurchase();
      },
      error: (err) => {
        console.log("err", err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.showLoadingScreen = false;
      },
    });
  }

  get idPurchase() {
    return this.purchaseForm.get("id_purchase");
  }

  get idCategory() {
    return this.purchaseForm.get("id_category");
  }

  get datePurchase() {
    return this.purchaseForm.get("purchase_date");
  }

  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes("/new")) {
      this.viewMode = "new";
    } else if (currentRoute.includes("/detail/")) {
      
      this.viewMode = "print";
    }
  }

  //LLENAR DETALLLE DE LA COMPRA
  private setProductDetail() {
    const purchaseDetailFormArray = this.formBuilder.array(
      this.purchaseDetailArray.map((detail) =>
        this.createDetailFormGroup(detail)
      )
    );

    this.purchaseForm.setControl("products", purchaseDetailFormArray);
  }

  //CREAR LA COMPRA
  createPurchase() {
    this.setProductDetail();
    if (this.purchaseForm.valid && !this.purchaseExists) {
      const purchaseData = this.purchaseForm.value;
      purchaseData.purchase_date = this.convertDateForServer(
        purchaseData.purchase_date
      );
      this.loading = true;

      this.purchaseService.createPurchase(purchaseData).subscribe(
        (response) => {
          this.loading = false;
          this.submit();
        },
        (error) => {
          this.loading = false;
          console.error("Error al crear la compra: ", error);
          const errorMessage = error.error
            ? error.error
            : "Ocurrió un error al crear la compra.";
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
  public submitPurchase(): void {
    if (this.viewMode === "new") {
      this.createPurchase();
    }
  }

  submitProduct() {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.toastr.success("Producto registrado con éxito.", "Éxito", {
          progressBar: true,
          timeOut: 3000,
        });
      });
    }
  }

  submit() {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.toastr.success("Compra registrada con éxito.", "Éxito", {
          progressBar: true,
          timeOut: 3000,
        });
        setTimeout(() => {
          this.router.navigateByUrl("/purchases");
        });
      });
    }
  }

  //AGREGAR PRODUCTO A LA TABLA DETALLE
  addPurchaseDetail(): void {
    this.markFormGroupTouched(this.purchaseForm);
    this.markFormGroupTouched(this.purchaseDetailform);
    if (!this.purchaseForm.valid || !this.purchaseDetailform.valid) return;
    const newProductFormGroup = this.createDetailFormGroup(
      this.purchaseDetailform.value
    );

    // Buscar si el producto ya existe en la lista
    const existingProductIndex = this.purchaseDetailArray.findIndex(
      (item) =>
        item.id_product === newProductFormGroup.value.id_product &&
        item.id_category === newProductFormGroup.value.id_category
    );

    if (existingProductIndex !== -1) {
      // Si el producto ya existe, simplemente incrementa la cantidad
      this.purchaseDetailArray[existingProductIndex].product_quantity +=
        newProductFormGroup.value.product_quantity;
    } else {
      // Si el producto no existe, agrégalo a la lista
      this.purchaseDetailArray.push(newProductFormGroup.value);
    }

    // Clear the form after adding the new detail
    this.purchaseDetailform.reset();
  }

  // ...

  removePurchaseDetail(index: number): void {
    // Remove the product from the local array
    this.purchaseDetailArray.splice(index, 1);
  }
  handleProviderSelection(event: any, i: number) {
    const selectedProviderId = event.target.value;

    const selectedProvider = this.listProviders.find(
      (provider) => provider.id_provider == selectedProviderId
    );
    if (selectedProvider) {
    } else {
      console.log("Proveedor no encontrado.");
    }
  }

  handleCategorySelection(event: any) {
    const selectedCategoryId = event.target.value;
    const selectedCategory = this.listCategories.find(
        (category) =>
            category.id_category == selectedCategoryId && category.state_category
    );

    if (selectedCategory) {
        this.products = this.listProducts.filter(
            (product) => product.id_category == selectedCategoryId
        );

        // Si solo hay un producto en la categoría seleccionada, seleccionarlo automáticamente
        if (this.products.length === 1) {
            const selectedProduct = this.products[0];
            this.purchaseDetailform.get('id_product').setValue(selectedProduct.id_product);
        }
    }
}

handleProductSelection(selectedProductId: number) {
    const selectedProduct = this.listProducts.find(
        (product) => product.id_product == selectedProductId
    );

    if (selectedProduct) {
        // Hacer algo con selectedProduct
        console.log("Producto seleccionado:", selectedProduct);
    } else {
        console.log("Producto no encontrado.");
    }
}

  //SET PARA PINTAR DETALL
  private setDataPurchase(): void {
    if (this.purchaseData) {
      const purchaseDate = Utils.dateToNgbDate(this.purchaseData.purchase_date);
      const purchaseDateRegistration = Utils.dateToNgbDate(
        this.purchaseData.record_date_purchase
      );
      this.purchaseForm
        .get("reason_anulate")
        .setValue(this.purchaseData.reason_anulate);
      this.purchaseForm
        .get("id_purchase")
        .setValue(this.purchaseData.id_purchase);
      this.purchaseForm
        .get("invoice_number")
        .setValue(this.purchaseData.invoice_number);
      this.purchaseForm
        .get("id_provider")
        .setValue(this.purchaseData.id_provider);
      this.purchaseForm.get("purchase_date").setValue(purchaseDate);
      this.purchaseForm
        .get("observation_purchase")
        .setValue(this.purchaseData.observation_purchase);
      this.purchaseForm
        .get("record_date_purchase")
        .setValue(purchaseDateRegistration);
      this.purchaseForm
        .get("state_purchase")
        .setValue(this.purchaseData.state_purchase);
      const purchaseDetailArray = this.purchaseData.purchase_details || []; // Asegúrate de que purchase_detail no sea nulo

      this.purchaseDetailArray = purchaseDetailArray.map((detail) => ({
        ...detail,
        name_product: detail.product.name_product,
        name_category: detail.product.product_category.name_category,
      }));

      // const purchaseDetailFormArray = this.formBuilder.array(purchaseDetailArray.map(detail => this.createDetailFormGroup(detail)));
      // this.purchaseForm.setControl('purchase_detail', purchaseDetailFormArray);
    }
  }

  //VALIDAR SI YA EXISTE EL NOMBRE DE UNA CATEGORIA
  validatePurchaseExist() {
    const value = this.purchaseForm.get("invoice_number").value;
    return new Promise((resolve) => {
      if (!value) {
        resolve(true);
      } else {
        this.purchaseService.getValidatePurchaseExist(value).subscribe(
          (isAvailable) => {
            this.purchaseExists = isAvailable;

            resolve(this.purchaseExists ? { purchaseTaken: true } : null);
          },
          (error) => {
            this.purchaseExists = true;
            resolve({ purchaseTaken: true });
          }
        );
      }
    });
  }

  //RETORNAR A LA LISTA DE CATEGORIAS
  cancel() {
    this.router.navigateByUrl("/purchases");
  }

  validateVat() {
    const vatValue = this.purchaseDetailform.get("vat").value;
    const costPriceValue = this.purchaseDetailform.get("cost_price").value;

    if (vatValue > costPriceValue) {
      return { invalidVat: true };
    }

    return null;
  }

  validatePriceSelling(control: FormControl) {
    const sellingPriceValue =
      this.purchaseDetailform.get("selling_price").value;
    const costPriceValue = this.purchaseDetailform.get("cost_price").value;

    if (sellingPriceValue < costPriceValue) {
      return { invalidSellingPrice: true };
    }

    return null;
  }

  validateStockMax(control: FormControl) {
    const stockMin = this.productForm.get("min_stock").value;
    const stockMax = this.productForm.get("max_stock").value;

    if (stockMax < stockMin) {
      return { invalidStock: true };
    }

    return null;
  }

  calculateSubtotal(cost_price, vat, product_quantity) {
    const numericCostPrice = parseFloat(cost_price);
    const numericVat = parseFloat(vat);
    const numericProductQuantity = parseFloat(product_quantity);

    if (
      isNaN(numericCostPrice) ||
      isNaN(numericVat) ||
      isNaN(numericProductQuantity)
    ) {
      // Manejar el caso en el que no se puedan convertir a números.
      return 0;
    }

    const subTotal = (numericCostPrice + numericVat) * numericProductQuantity;

    return subTotal;
  }

  calculateTotal() {
    let total = 0;
    this.purchaseDetailArray.forEach((i) => {
      total += this.calculateSubtotal(i.cost_price, i.vat, i.product_quantity);
    });
    return total;
  }

  //VALIDAR SI YA EXISTE EL NOMBRE DE UNA CATEGORIA
  validateProductExist() {
    const product_name = this.productForm.get("name_product").value;
    const category_id = this.productForm.get("id_category").value;
    return new Promise((resolve) => {
      if (!product_name && !category_id) {
        resolve(true);
      } else {
        this.productsService
          .getValidateProductExist(category_id, product_name)
          .subscribe(
            (isAvailable) => {
              this.productExists = isAvailable;
              resolve(this.productExists ? { productExists: true } : null);
            },
            (error) => {
              this.productExists = true;
              resolve({ productExists: true });
            }
          );
      }
    });
  }

  createProduct() {
    if (this.productForm.valid && !this.productExists) {
      const productData = this.productForm.value;
      this.loading = true;
      this.productsService.createProduct(productData).subscribe(
        (response) => {
          this.loading = false;
          console.log("Éxito al crear  producto desde compras: ", response);
          this.submitProduct();
          this.getProducts();
        },
        (error) => {
          this.loading = false;
          console.error(
            "Error al crear producto desde compras: ",
            this.toastr.error
          );
          const errorMessage = error.error
            ? error.error
            : "Ocurrió un error al crear producto desde compras";
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

  //CREAR UB PRODUTO QUE NO EXISTA EN LA LISTA DE PRODUCTOS

  @ViewChild("createProductModal", { static: true }) createProductModal: any;

  openCreateProductModal(content) {
    this.inicializateProductForm(Number(this.id));
    this.modalService
      .open(content, { ariaLabelledBy: "createProductModal" })
      .result.then(
        (result) => {
          if (result === "Ok") {
            this.createProduct();
            this.getProducts();
          } else if (result === "Cancel") {
            // Lógica adicional si es necesario después de cancelar el modal
            this.modalAbierto = false;
          }
        },
        (reason) => {
          // Lógica adicional si es necesario manejar el cierre del modal debido a un motivo inesperado
          console.log("Modal cerrado con motivo: ", reason);
          this.modalAbierto = false;
        }
      );
  }

  getProductName(id_category: string, id_product: string): string {
    return this.listProducts.find(
      (x) => x.id_category == id_category && x.id_product == id_product
    ).name_product;
  }

  getCategoryName(category_id: string): string {
    return this.listCategories.find((x) => x.id_category == category_id)
      .name_category;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
