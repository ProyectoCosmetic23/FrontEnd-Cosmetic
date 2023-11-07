import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'app-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
    loading: boolean;
    listOrders: any[] = [];
    modalAbierto = false;
    searchControl: UntypedFormControl = new UntypedFormControl();
    filteredOrders: any[] = [];
    currentPage = 1;
    itemsPerPage = 6;
    countLabel: number;

    constructor(
        private _ordersService: OrdersService,
        private modalService: NgbModal,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getOrders();
    }

    getOrders() {
        this._ordersService.getAllOrders().subscribe(
            (data) => {
                this.listOrders = data;
                console.log(this.listOrders);
                this.sortListOrdersById();
                this.adjustListOrders();
            },
            (error) => {
                console.error('Error al obtener pedidos:', error);
            }
        );
    }

    @ViewChild(DatatableComponent)
    table: DatatableComponent;

    actualizarCountLabel() {
        this.countLabel = this.listOrders.length;
    }

    adjustListOrders() {
        const totalRows = this.listOrders.length;
        const remainingRows = 6 - (totalRows % 6);

        for (let i = 0; i < remainingRows; i++) {
            this.listOrders.push({}); // Agrega filas vacías
        }

        this.loadData();
    }

    sortListOrdersById() {
        this.listOrders.sort((a, b) => {
            if (a.order_number < b.order_number) {
                return -1;
            }
            if (a.order_number > b.order_number) {
                return 1;
            }
            return 0;
        });
    }

    loadData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;

        const totalPages = Math.ceil(this.listOrders.length / this.itemsPerPage);

        if (this.currentPage === totalPages) {
            const remainingRows = this.listOrders.length % this.itemsPerPage;
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows;
            }
        }

        const rowsToAdd = 6 - (endIndex % 6);
        endIndex += rowsToAdd;

        this.filteredOrders = this.listOrders.slice(startIndex, endIndex);

        console.log('load data charged');
    }

    onPageChange(event: any) {
        console.log('onPageChange event:', event);
        this.currentPage = event.offset + 1;
        this.loadData();
    }

    @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

    openModal(idRole: number) {
        this._ordersService.getOrderById(idRole).subscribe(
            (data) => {
                if (!this.modalAbierto) {
                    this.modalAbierto = true;
                    this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
                        (result) => {
                            if (result === 'Ok') {
                                this._ordersService.updateOrderStatus(idRole).subscribe(
                                    (data) => {
                                        this.loading = false;
                                        this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', {
                                            progressBar: true,
                                            timeOut: 2000
                                        });
                                        setTimeout(() => {
                                            location.reload();
                                        }, 2000);
                                    },
                                    (error) => {
                                        this.loading = false;
                                        this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', {
                                            progressBar: true,
                                            timeOut: 2000
                                        });
                                        console.error('Error al cambiar de estado:', error);
                                    }
                                );
                            } else if (result === 'Cancel') {
                                this.modalAbierto = false;
                                setTimeout(() => {
                                    location.reload();
                                }, 2000);
                            }
                        },
                        (reason) => {
                            this.modalAbierto = false;
                            location.reload();
                        }
                    );
                }
            },
            (error) => {
                console.error('Error al obtener el pedido:', error);
            }
        );
    }
}
