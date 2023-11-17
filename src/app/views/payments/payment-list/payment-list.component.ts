import { Component, OnInit, ViewChild } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormControl } from '@angular/forms';
import { PaginationControlsComponent } from 'ngx-pagination';
import { debounceTime } from 'rxjs/operators';
import { PaymentsService } from 'src/app/shared/services/payment.service';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-payment-list',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
    loading: boolean;
    listPayments: any[] = []
    originalListPayments: any[] = [];
    sales: any[] = [];
    listClients: any[] = [];
    orders: any[] = [];
    clientsToPay: any[] = [];
    openedModal = false;
    clients: any = {};
    searchControl: UntypedFormControl = new UntypedFormControl();
    payments;
    providers: [DatePipe]
    filteredPayments;
    paginationId: string = 'payments-pagination';
    currentPage: number = 1;
    itemsPerPage: number = 6;


    onPageChange(event: any) {
        this.currentPage = event.offset / this.itemsPerPage + 1;
        this.updateListPayments();
    }

    constructor(
        private _paymentsService: PaymentsService,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        this.loadSales();
        this.loadOrders();
        this._paymentsService.getAllPayments().subscribe((res: any[]) => {
            this.listPayments = res;
            // Llamar al servicio para obtener datos de clientes
            this._paymentsService.getAllClients().subscribe((clients: any[]) => {
                // Mapear los datos de clientes en un objeto para búsquedas rápidas
                clients.forEach(client => {
                    this.clients[client.id_client] = client.name_client;
                });
    
                // Ahora, después de cargar las ventas, llamamos a onlyClientsPay
                this.onlyClientsPay();
    
                this.searchControl.valueChanges
                    .pipe(debounceTime(200))
                    .subscribe(value => {
                        this.filerData(value);
                    });
            });
        });
    }
    

    onlyClientsPay() {
        for (let sale of this.sales) {
            if (sale.payment_state === "Por pagar") {
                this.clientsToPay.push(sale.id_client.toString());
            }
        }
        for (let order of this.orders) {
            if (order.payment_state === "Por pagar") {
                this.clientsToPay.push(order.id_client.toString());
            }
        }
    
        // Convertir el array en un conjunto (Set) para eliminar duplicados
        const uniqueClientsToPay = Array.from(new Set(this.clientsToPay));
    
        console.log('Clientes con pago pendiente:', uniqueClientsToPay);
    }
    
    
    loadClients(){
        this._paymentsService.getAllClients().subscribe(
            (data) => {
              this.listClients = data;
              console.log('Lista de clientes cargada:', this.listClients);
            },
            (error) => {
              console.error('Error al obtener la lista de clientes:', error);
            }
          );
    }
    loadSales() {
        this._paymentsService.getAllSales().subscribe(
          (data) => {
            this.sales = data;
            console.log('Lista de ventas cargada:', this.sales);
          },
          (error) => {
            console.error('Error al obtener la lista de ventas:', error);
          }
        );
      }
      loadOrders() {
        this._paymentsService.getAllOrders().subscribe(
          (data) => {
            this.orders = data;
            console.log('Lista de pedidos cargada:', this.orders);
          },
          (error) => {
            console.error('Error al obtener la lista de pedidos:', error);
          }
        );
      }

    updateListPayments() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        const totalPages = Math.ceil(this.listPayments.length / this.itemsPerPage);

        if (this.currentPage === totalPages) {
            const remainingRows = this.listPayments.length % this.itemsPerPage
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows
            }
        }

        const rowsToAdd = 6 - (endIndex % 6)
        endIndex += rowsToAdd
        this.filteredPayments = this.listPayments.slice(startIndex, endIndex)
    }
    
    filterPaymentsByPaymentState() {
        this.filteredPayments = this.payments.filter(payment => payment.payment_state === 'Por pagar');
    }
    pageChanged(event: any) {
        this.currentPage = event.page;
        this.updateListPayments();
    }

    filerData(val) {
        if (val) {
            val = val.toLowerCase();
        } else {
            return this.filteredPayments = [...this.payments];
        }

        const columns = Object.keys(this.payments[0]);
        if (!columns.length) {
            return;
        }

        const rows = this.payments.filter(function (d) {
            for (let i = 0; i <= columns.length; i++) {
                const column = columns[i];
                if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                    return true;
                }
            }
        });
        this.filteredPayments = rows;
    }

    sortListPaymentssById() {
        this.listPayments.sort((a, b) => a.id_payment - b.id_payment);
    }

    getPayments() {
        this._paymentsService.getAllPayments().subscribe(
            (data) => {
                console.log(data);
                this.listPayments = data;
                this.sortListPaymentssById();
                location.reload();
                
            },
            (error) => {
                console.error('Error al obtener los proveedores:', error);
            }
        );
        console.log("pagos" + this.listPayments)
    }
}




