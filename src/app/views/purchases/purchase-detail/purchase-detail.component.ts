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
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


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
  products: any[] = [];
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
//INICIALIZAR FORMULARIO Y GETS
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
//FORMULARIO PARA MANEJAR EN EL LOS METODOS
  private inicializateForm(id: number): void {
    this.purchaseForm = this.formBuilder.group({
      id_purchase: [''],
      invoice_number: ['',[Validators.required]],
      id_provider: ['', [Validators.required]],
      purchase_date: ['', Validators.required],
      state_purchase: [],
      observation_purchase: ['', [ Validators.maxLength(100)]],
      purchase_detail_form: this.formBuilder.group({
        id_product: [Validators.required],
        id_category: [Validators.required],
        cost_price: [Validators.required],
        selling_price: [Validators.required],
        vat: [],
        product_quantity: [Validators.required]
      }),
      products: this.formBuilder.array([]),
     
    });

    if (this.viewMode == 'print') {
      this.purchaseForm.disable();
  }



  if (this.viewMode != 'new') {
      this.getPurchaseById(id);
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



//FORMATEAR LA FECHA
  convertDateForServer(dateStruct: NgbDateStruct): string {
    if (!dateStruct) {
      return null;
    }
    return `${dateStruct.year}-${dateStruct.month}-${dateStruct.day}`;
  }

  //PLANTILLA DE DETALLE
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
  
  get idCategory() {
    return this.purchaseForm.get('id_category');
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

//LLENAR DETALLLE DE LA COMPRA
  private setProductDetail() {	
    const purchaseDetailFormArray = this.formBuilder.array(this.purchaseDetailArray.map(detail => this.createDetailFormGroup(detail)));
        this.purchaseForm.setControl('products', purchaseDetailFormArray);
  }


//CREAR LA COMPRA
  createPurchase() {
   this.setProductDetail();
    if (this.purchaseForm.valid) {
      const purchaseData  = this.purchaseForm.value;
      purchaseData.purchase_date = this.convertDateForServer(purchaseData.purchase_date);
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

  //AGREGAR PRODUCTO A LA TABLA DETALLE 
  addPurchaseDetail(): void {
    const purchaseDetail = this.purchaseForm.get('purchase_detail_form') as FormArray;
    const newProductFormGroup = this.createDetailFormGroup(purchaseDetail.value);
    this.purchaseDetailArray.push(newProductFormGroup.value);
    
    // Clear the form after adding the new detail
    purchaseDetail.reset();  // Use reset() instead of reset()
  }
  
//REMOVER PRODUCTO DE LA TABLA DETALLE
  removePurchaseDetail(index: number): void {
  
    // Remove the product from the local array
    this.purchaseDetailArray.splice(index, 1);
  }

//CALCULAR TOTAL DE COMPRA
  calculateTotal(): number {
    return this.purchaseDetailArray.reduce((total, item) => {
      const subTotal = (item.cost_price + item.vat) * item.product_quantity;
      return total + subTotal;
    }, 0);
  }
  
  



  handleProviderSelection(event: any, i: number) {
    const selectedProviderId = this.providersFormArray.at(i).get('id_provider').value;
  
    const selectedProvider = this.lisProviders.find(provider => provider.id_provider == selectedProviderId);
    if (selectedProvider) {
    
    } else {
      console.log('Proveedor no encontrado.');
    
    }
  }
  
  handleCategorySelection(event: any, i: number) {
    const selectedCategoryId = event.target.value;
    const selectedCategory = this.listCategories.find(category => category.id_category == selectedCategoryId);
    
    if (selectedCategory) {
      
    this.products = this.listProducts.filter(product => product.id_category == selectedCategoryId)
      this.purchaseDetailArray[i].id_category = selectedCategory.id_category; 

    }


  }
  
  
  handleProductSelection(event: any, i: number) {
    const selectedProductId = this.productsFormSelect.at(i).get('id_product').value;
  
    const selectedProduct = this.listProducts.find(product => product.id_product == selectedProductId);
    if (selectedProduct) {
;
    } else {
      console.log('Producto no encontrado.');
    }
  }
  

//SET PARA PINTAR DETALLE
private setDataPurchase(): void {
  if (this.purchaseData) {
    this.idPurchase.setValue(this.purchaseData.id_purchase)
    this.purchaseForm.setValue(this.purchaseData)
    this.datePurchase.setValue(Utils.ngbDateToDate(this.purchaseForm.value.purchase_date));
    const purchaseDetailArray = this.purchaseData.purchase_detail || []; // Asegúrate de que purchase_detail no sea nulo
  
 
    const purchaseDetailFormArray = this.formBuilder.array(purchaseDetailArray.map(detail => this.createDetailFormGroup(detail)));
        this.purchaseForm.setControl('purchase_detail', purchaseDetailFormArray);
    
}

  }


}
