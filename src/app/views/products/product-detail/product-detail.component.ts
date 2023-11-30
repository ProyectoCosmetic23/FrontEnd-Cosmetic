import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductFormModel } from '../models/product.model';


@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

    listProducts: any[] = [];
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
    selectedCategory: any;

    invoiceForm: UntypedFormGroup;
    invoiceFormSub: Subscription;
    subTotal: number;
    saving: boolean;
    productData: ProductFormModel;
    isEditMode: boolean;
    isShowForm: boolean;
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
        private categoriesService: CategoriesService,
        private _productService: ProductService,

    ) {

    }


    ngOnInit() {
        this.id = this.route.snapshot.params['id_product'];
        this.isNew = !this.id;
        this.setViewMode();
        this.getProducts();
        this.inicializateForm(Number(this.id));
        this.getCategories();
       // this.toggleEnableFields();
    }



    private inicializateForm(id: number): void {
        this.productForm = this.formBuilder.group({
            id_product: [''],
            id_category: ['', [Validators.required]],
            name_product: ['', [Validators.required]],
            quantity: [null],
            max_stock: [''],
            min_stock: [''],
            profit: [],
            cost_price: [null],
            selling_price: [null],
            observation: ['', [Validators.maxLength(100)]],
            state_product: [],
            creation_date_product: [],
            enableFields: [false], // Nuevo campo para el checkbox
        });

        if (this.viewMode == 'print') {
            this.productForm && this.productForm.get('id_category')
            this.productForm.disable();
        }

        if (this.viewMode == 'edit') {
            this.productForm && this.productForm.get('id_category')
            this.productForm.get('id_category');
            
        }

        if (this.viewMode == 'new') {
            this.disabledFieldsNewForm();
        }

        if (this.viewMode != 'new') {
            this.productForm.get('quantity').disable();
            this.productForm.get('cost_price').disable();
            const token = this.cookieService.get('token');
            this.getProductByID(id, token);
        }
    }

    toggleEnableFields() {
        const enableFields = this.productForm.get('enableFields').value;

        if (enableFields && this.viewMode === 'new') {
            // Cuando el checkbox está habilitado en modo nuevo
            this.productForm.disable();
            this.productForm.get('quantity').enable();
            this.productForm.get('cost_price').enable();
            this.productForm.get('selling_price').enable();
            this.enableFields.enable();
            this.productForm.get('id_product').enable();
            // Eliminar los valores cuando el checkbox está habilitado
            this.productForm.get('quantity').setValue(null);
            this.productForm.get('cost_price').setValue(null);
            this.productForm.get('selling_price').setValue(null);
            this.productForm.reset();
            this.enableFields.setValue(true);
        } else {
            // Cuando el checkbox está deshabilitado o en modo de edición
            this.productForm.enable();
            this.productForm.reset();
            this.disabledFieldsNewForm();

            console.log("-----------------Disabled ");

        }
    }

    disabledFieldsNewForm() {
        console.log("-----------------Disabled ");
       
        this.productForm.get('quantity').disable();
        this.productForm.get('cost_price').disable();
        this.productForm.get('selling_price').disable();

        // Establecer los valores en 0 cuando el checkbox está deshabilitado
        this.productForm.get('quantity').setValue(0);
        this.productForm.get('cost_price').setValue(0);
        this.productForm.get('selling_price').setValue(0);

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




    private getProductByID(id: number, token?: string): void {
        this.loading = true;
        this.productsService.getProductsById(id, token).subscribe({
            next: (response: any) => {
                this.productData = new ProductFormModel(response);
                this.setDataProduct();
                // this.listProducts = [response];  // Almacena el producto en la lista
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


    handleProductSelection(event: any) {
        const selectedProductId = event.target.value;
        this.productData = this.listProducts.find(product => product.id_product == selectedProductId);
        this.id = this.productData.id_product;
        // completar fo
        this.setDataProduct();


    }

    createProduct() {
        console.log(this.productForm.valid)

        Object.values(this.productForm.controls).forEach(control => {
            control.markAsTouched();
        });

        if (this.enableFields.value) {
            console.log('SE ESTA IENDO POR EDITAR')
            this.saveChanges()
        } else {
            if (this.productForm.valid) {
                const productData = this.productForm.value;
                productData.quantity = this.productForm.get('quantity').value;
                productData.cost_price = this.productForm.get('cost_price').value;
                productData.selling_price = this.productForm.get('selling_price').value;


                console.log(this.productForm.get('quantity').value)
                console.log('Datos del producto a enviar:', productData);

                const token = this.cookieService.get('token');
                this.loading = true;

                // Imprimir detalles de la solicitud
                console.log('Solicitud POST a /api/productcs:', JSON.stringify(productData));

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
                    }
                );


            } else {
                this.toastr.error('Por favor, complete todos los campos correctamenteeeeeee.', 'Error de validación', { progressBar: true, timeOut: 3000 });
            }
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
        console.log('ID del producto a actualizar:', id);
        console.log('Datos actualizados del producto:', updatedData);
        this.productsService.updateProduct(id, updatedData, token).subscribe(
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
                observation: this.productForm.get('observation').value,
                quantity: this.productForm.get('quantity').value
            };
            console.log(JSON.stringify(updatedData))
            this.saveProductChanges(id, updatedData);
        } else {
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

    getProducts() {
        this._productService.getAllProducts().subscribe(
            (data) => {
                this.listProducts = data;
            },
            (error) => {
                console.error('Error al obtener Productos:', error);
            }
        );
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

    get enableFields() {
        return this.productForm.get('enableFields');
    }

}




