import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductFormModel } from '../models/product.model';
import { DatePipe } from '@angular/common';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    productForm: FormGroup;
    productFormSub: Subscription;
    loading: boolean = false;
    formBasic: FormGroup;
    viewMode: 'new' | 'edit' | 'print' = 'new';
    id: string;
    isNew: boolean;
    invoice: any = {};
    listCategories: any[] = [];
    categoriesFormArray: FormArray;
    selected_categories: string;
    invoiceForm: UntypedFormGroup;
    invoiceFormSub: Subscription;
    subTotal: number;
    saving: boolean;
    productData: ProductFormModel;
   
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private fb: UntypedFormBuilder,
        private toastr: ToastrService,
        private productsService: ProductService,
        private cookieService: CookieService,
        private datePipe: DatePipe,
        private categoriesService: CategoriesService,
    ) {

    }


    ngOnInit() {
        this.id = this.route.snapshot.params['id_product'];
        this.isNew = !this.id;
        this.setViewMode();
        this.inicializateForm(Number(this.id));
        this.getCategories();
        
    }



    private inicializateForm(id: number): void {
        this.productForm = this.formBuilder.group({
            id_category: ['',[Validators.required]],
            name_product: ['',[Validators.required],[this.validateNameSimbolAndNumber]],
            quantity: [''],
            max_stock: ['',[Validators.required]],
            min_stock: ['',[Validators.required]],
            profit: [],
            cost_price: [''],
            selling_price: [''],
            observation: ['',[ Validators.maxLength(100)]],
            state_product: [],
            creation_date_product: [],
           
        });

        if (this.viewMode == 'print') {
            this.productForm && this.productForm.get('id_category')
            this.productForm .disable();
        }

        if (this.viewMode == 'edit') {
            this.productForm && this.productForm.get('id_category')
            this.productForm.get('id_category');
          
            
        }
        

        if (this.viewMode != 'new') {
            const token = this.cookieService.get('token');
            this.getProductByID(id,token);
        }

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
    


      
    private getProductByID(id: number,token?: string): void {
        this.loading = true;
        this.productsService.getProductsById(id,token).subscribe({
            next: (response: any) => {
                this.productData = new ProductFormModel(response);
                this.setDataProduct();
                
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


    private setDataProduct(): void {
    if (this.productData) {
        const { id_product, creation_date_product, ...otherProductData } = this.productData;

        if (this.idProduct) {
            this.idProduct.setValue(id_product);
        }
        if (this.productForm) {
            this.productForm.patchValue(otherProductData);
        }
        if (this.dateProduct) {
            this.dateProduct.setValue(this.datePipe.transform(creation_date_product, 'yyyy-MM-dd'));
        }
    }
}


    handleCategorySelection(event: any) {
        const selectedCategoryId = event.target.value;
        const selectedCategory = this.listCategories.find(category => category.id_category == selectedCategoryId);  
    
      }

   createProduct() {
    if (this.productForm.valid) {
        const productData = this.productForm.value;
        console.log('Datos del producto a enviar:', productData);

        const token = this.cookieService.get('token');
        this.loading = true;

        // Imprimir detalles de la solicitud
        console.log('Solicitud POST a /api/productcs:', productData);

        this.productsService.createProduct(productData, token).subscribe(
            (response) => {
                this.loading = false;
                console.log("Éxito al crear el producto: ", response);
                this.submit();
            },
            (error) => {
                this.loading = false;
                console.error("Error al crear producto: ", error);
                const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el producto.';
                this.toastr.error(errorMessage, 'Error');

                // Imprimir detalles de la respuesta en caso de error
                console.log('Respuesta del servidor en caso de error:', error);
            }
        );
    } else {
        this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
    }
}

    

    getCategoryName(category_id: string): string {
        return this.listCategories.find(x => x.id_category == category_id).name_category
      }
    



    validateNameSimbolAndNumber(control: FormControl) {
        const nameValue = control.value;
        const combinedPattern = /^[\wáéíóúñÑ´\s]+$/;
    
        return new Promise((resolve) => {
            setTimeout(() => {
                if (combinedPattern.test(nameValue)) {
                    const numberCount = (nameValue.match(/\d/g) || []).length;
                    if (numberCount <= 1) {
                        resolve(null); // Válido
                    } else {
                        resolve({ invalidName: true }); // No válido
                    }
                } else {
                    resolve({ invalidName: true }); // No válido
                }
            }, 0);
        });
    }
    
    
    
    

    saveProductChanges(id: number, updatedData: any) {
        const token = this.cookieService.get('token');
        this.productsService.updateProduct(id, updatedData,token).subscribe(
            (response) => {
                this.loading = false;
                this.submit();
            },
            (error) => {
                this.loading = false;
                console.error("Error al crear producto: ", this.toastr.error);
                const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el producto.';
                this.toastr.error(errorMessage, 'Error');
            }
        );
    }




    
    

    public submitProduct(): void {
        if (this.viewMode == 'new') {
            this.createProduct();
        } else if (this.viewMode == 'edit') {
            this.saveChanges();
        }
    }


    saveChanges() {
        console.log('editar')

        if (this.productForm.valid) {
          const id = Number(this.id); // Convierte el ID a número
          const updatedData = {
            id_category: this.productForm.get('id_category').value,
            name_product: this.productForm.get('name_product').value,
            cost_price: this.productForm.get('cost_price').value,
            selling_price: this.productForm.get('selling_price').value,
            max_stock: this.productForm.get('max_stock').value,
            min_stock: this.productForm.get('min_stock').value,
            observation: this.productForm.get('observation').value
          };
          this.saveProductChanges(id, updatedData);
        }else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
        }
      }
      
        

    cancel() {

        this.router.navigateByUrl('/products');
    }

    submit() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.toastr.success('Producto modificado con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
                setTimeout(() => {
                    this.router.navigateByUrl('/products');
                },);
            },);
        }
    }





    setViewMode() {
        const currentRoute = this.router.url;
        if (currentRoute.includes('/new')) {
            this.viewMode = 'new';
        } else if (currentRoute.includes('/edit/')) {
            this.viewMode = 'edit';
        } else if (currentRoute.includes('/print/')) {
            this.viewMode = 'print';
        }
    }



    print() {
        if (window) {
            window.print();
        }
    }


   

    get idProduct() {
        return this.productForm.get('id_product');
    }

    get dateProduct() {
        return this.productForm.get('creation_date_product');
    }
   
    get idCategory() {
        return this.productForm.get('id_category');
    }

}




