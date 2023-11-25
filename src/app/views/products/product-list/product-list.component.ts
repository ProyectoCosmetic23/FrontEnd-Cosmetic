import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    loading: boolean;
    searchControl: UntypedFormControl = new UntypedFormControl();
    listProducts: any[];
    filteredProducts: any[];
    pageSize: number = 10;
    currentPage: number = 1;
    modalAbierto = false;
    selectedProductId: number;
    selectedProductValue: number;
    returnQuantity: number = 0;
    calculatedValue: number = 0;
    returnReason: string = '';
    returnValue: number ;
    countLabel: number;

    itemsPerPage = 6; // El número de filas por página
    constructor(
        private _productService: ProductService,
        private cookieService: CookieService,
        private modalService: NgbModal,
        private toastr: ToastrService,) { }

    ngOnInit(): void {
        this.getProducts()
    }

    handleChange(event: any, row: any) {
        row.state_product = event.target.checked ? 'Activo' : 'Inactivo';
    }

    getProductNameById(productId: number): string {
        const product = this.listProducts.find(p => p.id_product === productId);
        return product ? product.name_product : '';
        }

    calculateUpdatedValue(originalValue: number): number {
        // Asegúrate de que returnQuantity esté definido en tu componente
        return this.returnQuantity * originalValue;
        }
        
        
        getProducts() {
            this._productService.getAllProducts().subscribe(
                (data) => {
                    this.listProducts = data;
                    this.filteredProducts =this.listProducts;
                    this.sortListProdcuctsById();
                    this.irefreshListProducts();
                },
                (error) => {
                    console.error('Error al obtener Productos:', error);
                }
            );
        }
    
    
        //  actualizar el valor visual de count según tus necesidades
        actualizarCountLabel() {
            this.countLabel = this.filteredProducts.length;
        }
    //AJUSTAR LA LISTA DE CATEGORIAS
        irefreshListProducts() {
            // const totalRows = this.filteredProducts.length;
            // const remainingRows = 6 - (totalRows % 6);
    
            // for (let i = 0; i < remainingRows; i++) {
            //     // this.filteredProducts.push({}); // Agrega filas vacías
            // }
    
            this.loadData();
        }
    
        sortListProdcuctsById() {
            this.filteredProducts.sort((a, b) => {
                if (a.id_product > b.id_product) {
                    return -1;
                }
                if (a.id_product > b.id_product) {
                    return 1;
                }
                return 0;
            });
        }
    //CARGA LAS CATEGORIAS EN CADA PAGINA
        loadData() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            let endIndex = startIndex + this.itemsPerPage;
    
            const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    
            if (this.currentPage === totalPages) {
                const remainingRows = this.filteredProducts.length % this.itemsPerPage;
                if (remainingRows > 0) {
                    endIndex = startIndex + remainingRows;
                }
            }
    
            // Ajusta endIndex para que sea el próximo número divisible por 6
            const rowsToAdd = 6 - (endIndex % 6);
            endIndex += rowsToAdd;
    
            // this.filteredProducts = this.filteredProducts.slice(startIndex, endIndex);
    
            console.log('load data charged');
        }
    
        onPageChange(event: any) {
            console.log('onPageChange event:', event);
            this.currentPage = event.offset + 1;
            this.loadData();
        }
    
        searchProduct($event){
            
            const value = ($event.target as HTMLInputElement).value;
            if(value !==null && value !== undefined && value !== '')
            {
                this.filteredProducts = this.listProducts.filter(c => c.name_product.toLowerCase().indexOf(value.toLowerCase()) !== -1
                || this.changeProductStateDescription(c.state_product).toLowerCase().indexOf(value.toLowerCase()) !== -1)
            }else{
                this.filteredProducts = this.listProducts;
            }
        }
    
        changeProductStateDescription(state_product:boolean){
            return state_product ? 'Activo':'Inactivo';}
    
    
    openRetireModal(productId: number, productValue: number, content: any): void {
        this.selectedProductId = productId;
        this.selectedProductValue = productValue;
        this.returnQuantity = 0;
        this.returnReason = '';
        this.returnValue ;
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
    
        
    retireProduct(): void {
        if (this.selectedProductId && this.returnQuantity) {    
            const data = {
                return_quantity: this.returnQuantity,
                return_reason: this.returnReason,
                return_value: this.returnValue,
            };
    
            // Llamada a la API para dar de baja el producto
            this._productService.retireProduct(this.selectedProductId, data).subscribe(
                (response) => {
                    this.updateProductQuantity(this.selectedProductId, this.returnQuantity);
                    this.toastr.success('Producto dado de baja exitosamente.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                    this.modalService.dismissAll();
    
                    console.log('Producto dado de baja exitosamente', response);
                },
                (error) => {
                    console.error('Error al dar de baja el producto', error);
                    this.toastr.error('Fallo al dar de baja el producto.', 'Error', { progressBar: true, timeOut: 2000 });
                }
            );
        }
    }
    
    
    updateProductQuantity(productId: number, quantityToSubtract: number): void {
        // Encuentra el producto en tu lista local y resta la cantidad
        const productToUpdate = this.filteredProducts.find(product => product.id_product === productId);
    
        if (productToUpdate) {
            productToUpdate.quantity -= quantityToSubtract;
        }
    }
    @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

    openModal(idProduct: number) {
        if (!this.modalAbierto) {
            this.modalAbierto = true;
            this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
                (result) => {
                    if (result === 'Ok') {
                        const token = this.cookieService.get('token');
                        this._productService.productChangeStatus(idProduct,token).subscribe(
                            (data) => {
                                this.loading = false;
                                this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                                this.getProducts();
                                this.modalAbierto = false;
                            },
                            (error) => {
                                this.loading = false;
                                this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', { progressBar: true, timeOut: 2000 });
                                console.error('Error al cambiar de estado:', error);
                            }
                        );
                    }

                },
                (reason) => {
                    // Manejar la cancelación del modal aquí
                    this.getProducts();
                    this.modalAbierto = false;
                }
            );
        }
    }

}

