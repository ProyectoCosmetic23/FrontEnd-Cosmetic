import { Component, OnInit,ViewChild  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
     

        constructor(
            private _productService: ProductService,
            private modalService: NgbModal,
            private toastr: ToastrService,) {}

        ngOnInit(): void {
            this.getProducts();
            this.searchControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filterData(value);
            });
        }

        

        getProducts() {
            this._productService.getAllProducts().subscribe(data => {
                this.listProducts = data.sort((a, b) => a.id_product - b.id_product);
                this.filteredProducts = [...this.listProducts];
                
                }, error => {
                console.log(error);
                });
            }

        filterData(value: string) {
            if (value) {
            value = value.toLowerCase();
            } else {
            this.filteredProducts = [...this.listProducts];
            return;
            }

            this.filteredProducts = this.listProducts.filter(productc => {
            const nombreMatch = productc.name_product.toLowerCase().includes(value);
            const cost_priceMatch = productc.cost_price.toLowerCase().includes(value);
            const estadoMatch = productc.state_product.toLowerCase().includes(value);

            return nombreMatch || cost_priceMatch || estadoMatch;
            });

            this.currentPage = 1;
        }

        @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

        openModal(idProduct: number) {
            if (!this.modalAbierto) {
                this.modalAbierto = true;
                this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
                    (result) => {
                    if (result === 'Ok') {
                        this._productService.productChangeStatus(idProduct).subscribe(
                        (data) => {
                            this.loading = false;
                            this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                            console.log(data);
                        },
                        (error) => {
                            this.loading = false;
                            this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', { progressBar: true, timeOut: 2000 });
                            console.error('Error al cambiar de estado:', error);
                        }
                        );
                    } else if (result === 'Cancel') {
                        this.modalAbierto = false;
                    }
                    },
                );
                }
            }
            
    }
            
