import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductFormModel } from '../models/product.model';
import { DatePipe } from '@angular/common';
import { CategoriesService } from 'src/app/shared/services/category.service';


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
    category: any[];
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
        private datePipe: DatePipe,
        private categorieService: CategoriesService
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
            id_product:[],
            id_category: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7), Validators.pattern('^[0-9]+$')]],
            name_product: ['', [Validators.required, Validators.maxLength(80)],[this.validateNameSimbolAndNumber]],
            quantity: ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
            cost_price: ['', [Validators.required, Validators.maxLength(80)]],
            selling_price: ['', [Validators.required, Validators.maxLength(80), Validators.pattern('^[0-9]{10}$')]],
            max_stock: ['', [Validators.required, Validators.maxLength(100)]],
            min_stock: [],
            profit: [],
            observation: [],
            state_product: [],
            creation_date_product: []
        });

        if (this.viewMode == 'print') {
            this.productForm.disable();
        }

        if (this.viewMode == 'edit') {
            this.idProduct.disable();
        }

        if (this.viewMode != 'new') {
            this.getProductByID(id);
        }

    }
    
    private getCategories() {
        this.categorieService.getAllCategory().subscribe({
          next: (response: any) => {
            this.category = response;
          },
          error: (err) => {
            console.log('Error al obtener categorías', err);
          },
        });
      }


      
    private getProductByID(id: number): void {
        this.loading = true;
        this.productsService.getProductsById(id).subscribe({
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
            this.idProduct.setValue(this.productData.id_product);
            this.productForm.setValue(this.productData)
            this.dateProduct.setValue( this.datePipe.transform(this.productData.creation_date_product, 'yyyy-MM-dd'));
           ;
        }
    }

    createProduct() {
        if (this.productForm.valid) {
            const productData = this.productForm.value;
            this.loading = true;
            this.productsService.createProduct(productData).subscribe(
                (response) => {
                    this.loading = false;
                    console.log("Éxito al crear el producto: ", response);
                    this.submit();
                },
                (error) => {
                    this.loading = false;
                    console.error("Error al crear producto: ", this.toastr.error);
                    const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el producto.';
                    this.toastr.error(errorMessage, 'Error');
                }
            );
        } else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
        }
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
        this.productsService.updateProduct(id, updatedData).subscribe(
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
            id_product: this.idProduct.value,
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
                this.toastr.success('Producto registrado con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
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

}
