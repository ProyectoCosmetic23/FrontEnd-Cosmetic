import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { OrdersService } from "src/app/shared/services/orders.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { FormBuilder, FormGroup, UntypedFormControl } from "@angular/forms";
import { PaymentsService } from "src/app/shared/services/payment.service";

interface payment {
  id_sale: null;
  id_client: number;
  id_order: number;
  total_payment: number;
}

@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.scss"],
})
export class OrdersListComponent implements OnInit {
  new_payment = {
    id_sale: null,
    id_client: 0,
    total_payment: 0,
    id_order: 0,
  };
  loading: boolean;
  modalRef: NgbModalRef;
  currentOrder: any;
  payments: any[] = [];
  listClients: any[] = [];
  clientName: string;
  id_client: number;
  listOrders: any[] = [];
  paymentsForOrder: any[] = [];
  modalAbierto = false;
  modalPayment = false;
  searchControl: UntypedFormControl = new UntypedFormControl();
  filteredOrders: any[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  countLabel: number;
  originalRowCount: any;
  showLoadingScreen: boolean = false;
  formBasic: FormGroup;

  constructor(
    private _ordersService: OrdersService,
    private _paymentService: PaymentsService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private el: ElementRef
  ) {
    this.formBasic = this.formBuilder.group({
      id_sale: null,
      id_order: [""],
      id_client: [""],
      total_order: [""],
      total_remaining: [""],
      total_payment: [""],
      payment_date: [this.getCurrentDate()],
    });
  }
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2); // Agregar cero inicial si es necesario
    const day = ("0" + today.getDate()).slice(-2); // Agregar cero inicial si es necesario
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.getPayments();
    this.getClients();
    this.getOrders();
  }
  updateTotalRemaining() {
    console.log("updateTotalRemaining called");

    const totalOrder = parseFloat(this.formBasic.get("total_order")?.value);
    const id_order = this.formBasic.get("id_order")?.value;
    const totalPayment = parseFloat(this.formBasic.get("total_payment")?.value);

    // Obtén la ID del cliente desde la propiedad id_client
    const id_client = this.id_client;

    // Verifica si hay pagos para este pedido
    const paymentsForOrder = this.payments.filter(
      (payment) => payment.id_order === id_order
    );

    if (paymentsForOrder.length > 0) {
      // Sumar los total_payment de los pagos
      const totalPayments = paymentsForOrder.reduce(
        (sum, payment) => sum + parseFloat(payment.total_payment),
        0
      );

      // Verificar si total_payment es mayor que total_remaining antes de calcular el nuevo total_remaining
      if (totalPayment > totalOrder - totalPayments) {
        console.log(
          "Error: El total_payment no puede ser mayor que total_remaining"
        );
        return; // Detiene la ejecución de la función si hay un error
      }

      // Calcular el nuevo total_remaining
      const updatedTotalRemaining = Math.round(
        -totalPayments - totalPayment + totalOrder
      );

      this.formBasic.patchValue({ total_remaining: updatedTotalRemaining });

      // Utiliza this.id_client en lugar de id_client obtenido del formulario
      this.new_payment.total_payment = totalPayment;
      this.new_payment.id_client = id_client;
      this.new_payment.id_order = id_order;

      console.log(this.new_payment);
    } else {
      // Si no hay pagos, realiza el cálculo estándar
      const totalRemaining =
        Math.round((totalOrder - totalPayment) * 100) / 100;

      // Verificar si total_payment es mayor que total_remaining antes de actualizar total_remaining
      if (totalPayment > totalRemaining) {
        console.log(
          "Error: El total_payment no puede ser mayor que total_remaining"
        );
        return; // Detiene la ejecución de la función si hay un error
      }

      this.formBasic.patchValue({ total_remaining: totalRemaining });

      // Utiliza this.id_client en lugar de id_client obtenido del formulario
      this.new_payment.total_payment = totalPayment;
      this.new_payment.id_client = id_client;
      this.new_payment.id_order = id_order;

      console.log(this.new_payment);
    }
  }

  getOrders() {
    this.showLoadingScreen = true;
    this._ordersService.getAllOrders().subscribe(
      (ordersData) => {
        this.listOrders = ordersData;
        console.log(this.listOrders);

        // Después de obtener la lista de pedidos, obtenemos la lista de clientes
        this._ordersService.getAllClients().subscribe(
          (clientsData) => {
            this.listClients = clientsData;

            // Mapeamos los id_client en la lista de pedidos a los nombres de los clientes
            this.listOrders.forEach((order) => {
              const matchingClient = this.listClients.find(
                (client) => client.id_client === order.id_client
              );

              // Si encontramos un cliente coincidente, asignamos el nombre al pedido
              if (matchingClient) {
                order.name_client = matchingClient.name_client;
              }
            });

            // Resto del código para actualizar la interfaz de usuario
            this.originalRowCount = this.listOrders.length;
            setTimeout(() => {
              const pageCountElement =
                this.el.nativeElement.querySelector(".page-count");
              if (pageCountElement) {
                const innerText = pageCountElement.innerText;
                pageCountElement.innerText =
                  this.originalRowCount + " registros.";
                console.log("Inner text de .page-count:", innerText);
              }
            });
            this.sortListOrdersById();
            this.adjustListOrders();
            this.showLoadingScreen = false;
          },
          (clientsError) => {
            console.error("Error al obtener clientes:", clientsError);
            this.showLoadingScreen = false;
          }
        );
      },
      (error) => {
        console.error("Error al obtener pedidos:", error);
        this.showLoadingScreen = false;
      }
    );
  }
  getPayments() {
    const totalRemaining = parseFloat(
      this.formBasic.get("total_remaining")?.value
    );

    // Obtén el valor de total_payment del formulario
    const totalPayment = parseFloat(this.formBasic.get("total_payment")?.value);

    // Verifica si total_payment es mayor que total_remaining
    if (totalPayment > totalRemaining) {
      console.log(
        "Error: El total_payment no puede ser mayor que total_remaining"
      );
      return; // Detiene la ejecución de la función si hay un error
    }
    this._paymentService.getAllPayments().subscribe(
      (data) => {
        this.payments = data;
        console.log(this.payments);
      },
      (error) => {
        console.error("Error al obtener Clientes:", error);
      }
    );
  }
  createPayment() {
    this._paymentService.createPayment(this.new_payment).subscribe(
      (data) => {
        console.log(data);
        this.loading = false;
        this.toastr.success("Pago creado con éxito.", "Proceso Completado", {
          progressBar: true,
          timeOut: 2000,
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
        this.modalRef.close("Yes");
      },
      (error) => {
        this.loading = false;
        this.toastr.error("Error al crear el pago.", "Error", {
          progressBar: true,
          timeOut: 2000,
        });
        console.error("Error al crear el pago:", error);
      }
    );
  }
  handleClientSelection(event: any) {
    this.new_payment.id_client = this.id_client;
    console.log(this.new_payment.id_client);
  }
  handleOrderSelection(event: any) {
    this.new_payment.id_order = event.target.value;
    console.log(this.new_payment.id_order);
  }
  submit() {
    console.log("llamado a submit");
    this.createPayment();
  }
  @ViewChild("paymentModal", { static: true }) paymentModal: any;
  openPayments(idOrder: number) {
    if (!this.modalPayment) {
      this.modalPayment = true;
      console.log('ID de la orden:', idOrder);
      this.formBasic.patchValue({
        total_remaining: null,
        total_payment: null, // o tu valor inicial
      });
  
      this._paymentService.getPayOrder(idOrder).subscribe(
        (payments) => {
          this.paymentsForOrder = payments;
  
          const order = this.listOrders.find((o) => o.id_order === idOrder);
  
          if (order && this.listClients) {
            this.currentOrder = order; // Asigna el pedido actual a currentOrder
  
            const client = this.listClients.find((c) => c.id_client === order.id_client);
  
            this.clientName = client ? client.name_client : 'Cliente no encontrado';
            this.id_client = client ? client.id_client : null;
  
            this.formBasic.patchValue({
              id_order: order.id_order,
              id_client: this.clientName,
              total_order: order.total_order,
            });
  
            this.modalRef = this.modalService.open(this.paymentModal, { centered: true, size: 'lg',});
  
            if (payments.length > 0) {
              const totalPayments = payments.reduce((sum, payment) => sum + parseFloat(payment.total_payment), 0);
              const updatedTotalRemaining = order.total_order - totalPayments;
  
              this.formBasic.patchValue({
                total_remaining: updatedTotalRemaining,
              });
            }
  
            this.modalRef.result.then(
              (result) => {
                if (result === 'yes' && result.value) {
                  this.createPayment();
                  console.log(result);
                }
                this.modalPayment = false;
              },
              (reason) => {
                this.modalPayment = false;
              }
            );
          }
        },
        (error) => {
          console.error('Error al obtener pagos:', error);
          // Puedes manejar el error según tus necesidades
        }
      );
    }
  }

  asignarPago() {
    console.log('Botón "Asignar" clickeado');

    // Verifica si modalRef está definido antes de intentar cerrar el modal
    if (this.modalRef) {
      this.createPayment();
      this.modalRef.close("yes");
      // Resetea el valor de modalPayment a false
      this.modalPayment = false;
    } else {
      console.error("modalRef no está definido al intentar cerrar el modal");
    }
  }
  getClients() {
    this._ordersService.getAllClients().subscribe(
      (data) => {
        this.listClients = data;
        console.log(this.listClients);
      },
      (error) => {
        console.error("Error al obtener Clientes:", error);
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

    console.log("load data charged");
  }

  onPageChange(event: any) {
    console.log("onPageChange event:", event);
    this.currentPage = event.offset + 1;
    this.loadData();
  }

  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;

  openModal(idOrder: number) {
    this._ordersService.getOrderById(idOrder).subscribe(
      (data) => {
        if (!this.modalAbierto) {
          this.modalAbierto = true;
          this.modalService
            .open(this.deleteConfirmModal, { centered: true })
            .result.then(
              (result) => {
                if (result === "Ok") {
                  this._ordersService.updateOrderStatus(idOrder).subscribe(
                    (data) => {
                      this.loading = false;
                      this.toastr.success(
                        "Cambio de estado realizado con éxito.",
                        "Proceso Completado",
                        {
                          progressBar: true,
                          timeOut: 2000,
                        }
                      );
                      this.getOrders();
                    },
                    (error) => {
                      this.loading = false;
                      this.toastr.error(
                        "Fallo al realizar el cambio de estado.",
                        "Error",
                        {
                          progressBar: true,
                          timeOut: 2000,
                        }
                      );
                      console.error("Error al cambiar de estado:", error);
                    }
                  );
                } else if (result === "Cancel") {
                  this.modalAbierto = false;
                  setTimeout(() => {
                    this.getOrders();
                  }, 2000);
                }
              },
              (reason) => {
                this.modalAbierto = false;
                this.getOrders();
              }
            );
        }
      },
      (error) => {
        console.error("Error al obtener el pedido:", error);
      }
    );
  }
}
