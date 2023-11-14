import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray,UntypedFormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Utils } from 'src/app/shared/utils';
import { PurchaseFormMode, Detail } from '../models/purchase.model';
import { ProvidersService } from 'src/app/shared/services/provider.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { PurchasesService } from 'src/app/shared/services/purchase.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss']
})
export class PurchaseDetailComponent implements OnInit {
  purchaseForm: FormGroup;
  loading: boolean;
  viewMode: 'new' | 'print' = 'new';
  isNew: boolean;
  id: string;
  purchaseData: PurchaseFormMode;
  purchaseDetailArray: Detail[] = [];;
  lisProviders: any  []=[];
  listCategories: any[] = [];
  listProducts: any[] = [];
  selected_categories: string;
  selected_providers: string;
  selected_product: string;
  providersFormArray: FormArray;
  categoriesFormArray: FormArray;
  productsFormSelect: FormArray;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private categoriesService: CategoriesService,
    private providersService: ProvidersService,
    private productsService: ProductService,
    private purchaseService: PurchasesService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id_purchase'];
    console.log(this.id);
    this.isNew = !this.id;
    this.getProviders();
    this.getProducts();
    this.getCategories();
    this.setViewMode();
    this.inicializateForm(Number(this.id));
  }

  private inicializateForm(id: number): void {
    this.purchaseForm = this.formBuilder.group({
      id_purchase: [''],
      invoice_number: [''],
      id_provider: [''],
      purchase_date: [],
      state_purchase: [],
      observation_purchase: ['', [Validators.required, Validators.maxLength(100)]],
      purchase_detail: this.formBuilder.group({
        id_product: [],
        id_category: [],
        cost_price: [],
        selling_price: [],
        vat: [],
        product_quantity: []
      }),
     
    });

    if (this.viewMode == 'print') {
      this.purchaseForm.disable();
  }



  if (this.viewMode != 'new') {
      this.getPurchaseById(id);
  }
    
  }

  private createDetailFormGroup(detail: Detail): FormGroup {
    return this.formBuilder.group({
      id_product: [detail.id_product],
      id_category: [detail.id_category],
      cost_price: [detail.cost_price],
      selling_price: [detail.selling_price],
      vat: [detail.vat],
      product_quantity: [detail.product_quantity],
    });
  }
  

  private setDataPurchase(): void {
    if (this.purchaseData) {
      this.idPurchase.setValue(this.purchaseData.id_purchase)
      this.purchaseForm.setValue(this.purchaseData)
      this.datePurchase.setValue(Utils.ngbDateToDate(this.purchaseForm.value.purchase_date));
 
  }
  
    }
  
    private getPurchaseById(id: number): void {
      this.loading = true;
      this.purchaseService.getPurchaseById(id).subscribe({
        next: (response: any) => {
          this.purchaseData = new PurchaseFormMode(response);
          this.setDataPurchase();
        },
        error: (err) => {
          console.log('err', err);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  

  get idPurchase() {
    return this.purchaseForm.get('id_purchase');
  }

  get datePurchase() {
    return this.purchaseForm.get('purchase_date');
  }

  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/new')) {
      this.viewMode = 'new';
    } 
     else if (currentRoute.includes('/detail/')) {
      this.viewMode = 'print';
    }
  }

  createPurchase() {
          
    if (this.purchaseForm.valid) {
      const purchaseData  = this.purchaseForm.value;
      this.loading = true;
      
      this.purchaseService.createPurchase(purchaseData).subscribe(
        (response) => {
          this.loading = false;
          console.log("Éxito al crear la compra: ", response);
          this.submit();
          this.toastr.success('Compra registrada con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
          // Lógica adicional después de crear la compra, si es necesario
        },
        (error) => {
          this.loading = false;
          console.error("Error al crear la compra: ", error);
          const errorMessage = error.error ? error.error : 'Ocurrió un error al crear la compra.';
          this.toastr.error(errorMessage, 'Error');
        }
      );
    } else {
      this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
    }
  }

  public submitPurchase(): void {
    if (this.viewMode == 'new') {
        this.createPurchase();
    }
  }

  addPurchaseDetail(): void {
    const purchaseDetail = this.purchaseForm.get('purchase_detail') as FormArray;
    const newProductFormGroup = this.createDetailFormGroup(purchaseDetail.value);
    this.purchaseDetailArray.push(newProductFormGroup.value);
    
    // Clear the form after adding the new detail
    purchaseDetail.reset();  // Use reset() instead of reset()
  }
  

  removePurchaseDetail(index: number): void {
    const purchaseDetail = this.purchaseForm.get('purchase_detail') as FormArray;
    const removedProduct = purchaseDetail.removeAt(index);
    // Remove the product from the local array
    this.purchaseDetailArray.splice(index, 1);
  }


  calculateTotal(): number {
    return this.purchaseDetailArray.reduce((total, item) => {
      const subTotal = (item.cost_price + item.vat) * item.product_quantity;
      return total + subTotal;
    }, 0);
  }
  
  
  submit() {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.toastr.success('Compra registrada con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
        setTimeout(() => {
          this.router.navigateByUrl('/purchases');
        },);
      },);
    }
  }


  
  getProviders() {
    this.providersService.getAllProviders().subscribe(
      (data) => {
        this.lisProviders = data;
        console.log(this.lisProviders);
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe(
      (data) => {
        this.listProducts = data;
        console.log(this.listProducts);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  getCategories() {
    this.categoriesService.getAllCategory().subscribe(
      (data) => {
        this.listCategories = data;
        console.log(this.listCategories);
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }



  handleProviderSelection(event: any, i: number) {
    const selectedProviderId = this.providersFormArray.at(i).get('id_provider').value;
  
    const selectedProvider = this.lisProviders.find(provider => provider.id_provider == selectedProviderId);
    if (selectedProvider) {
      // Handle the selected provider, for example, set values in the form array
      // this.providersFormArray.at(i).get('someField').setValue(selectedProvider.someValue);
    } else {
      console.log('Proveedor no encontrado.');
      // Handle the case when the provider is not found, for example, reset values in the form array
      // this.providersFormArray.at(i).get('someField').setValue(null);
    }
  }
  
  handleCategorySelection(event: any, i: number) {
    const selectedCategoryId = event.target.value;
    const selectedCategory = this.listCategories.find(category => category.id_category == selectedCategoryId);
    if (selectedCategory) {
      this.purchaseDetailArray[i].id_category = selectedCategory.id_category; // Store the category ID
      //this.purchaseDetailArray[i].name_category = selectedCategory.name_category; // Store the category name
    } else {
      console.log('Categoría no encontrada.');
    }
  }
  
  
  handleProductSelection(event: any, i: number) {
    const selectedProductId = this.productsFormSelect.at(i).get('id_product').value;
  
    const selectedProduct = this.listProducts.find(product => product.id_product == selectedProductId);
    if (selectedProduct) {
      // Handle the selected product, for example, set values in the form array
      // this.productsFormArray.at(i).get('someField').setValue(selectedProduct.someValue);
    } else {
      console.log('Producto no encontrado.');
      // Handle the case when the product is not found, for example, reset values in the form array
      // this.productsFormArray.at(i).get('someField').setValue(null);
    }
  }
  



}
