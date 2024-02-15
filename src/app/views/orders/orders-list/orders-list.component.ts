import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { OrdersService } from "src/app/shared/services/orders.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { PaymentsService } from "src/app/shared/services/payment.service";
import { AuthService } from "src/app/shared/services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

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
  activTab: string = "formulario";
  loading: boolean;
  modalRef: NgbModalRef;
  currentOrder: any;
  payments: any[] = [];
  listClients: any[] = [];
  clientName: string;
  id_client: number;
  listOrdersOriginal: any[] = [];
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
  order_type: string = "Por entregar";
  modal_message: string;
  message_observation: any = "";
  mensaje = "";
  activeTab: string = "Pedidos Por Entregar";
  usage: string;
  isSmallScreen: boolean = false;
  isNegative: boolean = false;

  constructor(
    private _authService: AuthService,
    private _ordersService: OrdersService,
    private _paymentService: PaymentsService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private el: ElementRef,
  ) {
    this.formBasic = this.formBuilder.group({
      id_sale: null,
      id_order: [""],
      id_client: [""],
      total_order: [""],
      total_remaining: ["", [this.nonNegativeValidator]],
      total_payment: ["", [Validators.required, this.nonNegativeValidator]],
      payment_date: [this.getCurrentDate()],
    });
  }

  ngOnInit(): void {
    this._authService.validateUserPermissions("Pedidos");
    this.getPayments();
    this.getClients();
    this.getOrders(this.order_type);
    this.checkScreenSize();

    // Escucha cambios en el tamaño de la pantalla y actualiza la variable
    window.addEventListener("resize", () => {
      this.checkScreenSize();
    });
  }

  checkScreenSize() {
    // Establece isSmallScreen basándote en la resolución de la pantalla
    this.isSmallScreen = window.innerWidth <= 100; // Ajusta el valor según tus necesidades
  }
  nonNegativeValidator(control) {
    const value = control.value;

    // Verifica si el valor es numérico y no es negativo
    if (isNaN(value) || value < 0) {
      return { nonNegative: true }; // Retorna un objeto indicando que la validación falló
    }

    return null; // La validación pasa si el valor es numérico y no es negativo
  }

  onTabSelect(tabName: string) {
    if (tabName === "Todos los Pedidos") {
      this.activeTab = "Todos los Pedidos";
      this.order_type = "Todos";
      this.getOrders(this.order_type);
    } else if (tabName === "Pedidos Por Entregar") {
      this.activeTab = "Pedidos Por Entregar";
      this.order_type = "Por entregar";
      this.getOrders(this.order_type);
    } else if (tabName === "Pedidos Entregados") {
      this.activeTab = "Pedidos Entregados";
      this.order_type = "Entregado";
      this.getOrders(this.order_type);
    } else if (tabName === "Pedidos Por Pagar") {
      this.activeTab = "Pedidos Por Pagar";
      this.order_type = "Por pagar";
      this.getOrders(this.order_type);
    } else if (tabName === "Pedidos Pagados") {
      this.activeTab = "Pedidos Pagados";
      this.order_type = "Pagado";
      this.getOrders(this.order_type);
    } else if (tabName === "Ventas Realizadas") {
      this.activeTab = "Ventas Realizadas";
      this.order_type = "Ventas";
      this.getOrders(this.order_type);
    } else if (tabName === "Pedidos Anulados") {
      this.activeTab = "Pedidos Anulados";
      this.order_type = "Anulado";
      this.getOrders(this.order_type);
    } else if (tabName === "Devoluciones") {
      this.activeTab = "Devoluciones";
      this.order_type = "Devoluciones";
      this.getOrders(this.order_type);
    }
  }

  getOrders(order_type: string) {
    this.showLoadingScreen = true;
    let orderService;
    if (order_type == "Todos") {
      orderService = this._ordersService.getAllOrders();
    } else if (order_type == "Por entregar") {
      orderService = this._ordersService.getAllProcessingOrders();
    } else if (order_type == "Entregado") {
      orderService = this._ordersService.getAllDeliveredOrders();
    } else if (order_type == "Por pagar") {
      orderService = this._ordersService.getAllUnpaidOrders();
    } else if (order_type == "Pagado") {
      orderService = this._ordersService.getAllPaidOrders();
    } else if (order_type == "Ventas") {
      orderService = this._ordersService.getAllSales();
    } else if (order_type == "Anulado") {
      orderService = this._ordersService.getAllAnulatedOrders();
    } else if (order_type == "Devoluciones") {
      orderService = this._ordersService.getAllReturns();
    }
    orderService.subscribe(
      (ordersData) => {
        this.listOrders = ordersData;
        this.listOrdersOriginal = ordersData;

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
              }
            });
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

  searchOrders($event) {
    const value = ($event.target as HTMLInputElement).value.toLowerCase();

    if (value.trim() !== "") {
      this.listOrders = this.listOrders.filter((order) =>
        Object.values(order).some(
          (field) =>
            field !== null &&
            field !== undefined &&
            field.toString().toLowerCase().includes(value)
        )
      );
    } else {
      // Si el valor de búsqueda está vacío, restaura la lista completa
      this.listOrders = this.listOrdersOriginal;
    }
  }

  getClients() {
    this._ordersService.getAllClients().subscribe(
      (data) => {
        this.listClients = data;
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

    if (totalRows % 6 !== 0) {
      const remainingRows = 6 - (totalRows % 6);

      for (let i = 0; i < remainingRows; i++) {
        this.listOrders.push({}); // Agrega filas vacías
      }
    }
    this.loadData();
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
  }

  onPageChange(event: any) {
    this.currentPage = event.offset + 1;
    this.loadData();
  }

  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;

  openModal(idOrder: number, usage: string, state: string) {
    let subscribe_method = this._ordersService.updateOrderStatus(idOrder);
    this.usage = usage;
    if (usage === "Enviar") {
      if (state === "En proceso") {
        this.modal_message = '¿Marcar este pedido como "Listo para entrega"?';
      } else if (state === "Por entregar") {
        this.modal_message =
          "¿Confirma que el pedido ha sido entregado con éxito?";
      }
    } else if (usage === "Anular") {
      this.modal_message = "¿Está seguro de que desea anular el pedido?";
    }
    this._ordersService.getOrderById(idOrder).subscribe(
      (data) => {
        if (!this.modalAbierto) {
          this.modalAbierto = true;
          this.modalService
            .open(this.deleteConfirmModal, { centered: true })
            .result.then(
              (result) => {
                if (result === "Ok") {
                  if (usage === "Anular" && this.message_observation == "") {
                    this.toastr.warning(
                      "Debe indicar el motivo por el que se anula el pedido.",
                      "Advertencia",
                      {
                        progressBar: true,
                        timeOut: 1000,
                      }
                    );
                    this.message_observation = "";
                    this.modalAbierto = false;
                  }
                  if (usage === "Enviar") {
                    subscribe_method =
                      this._ordersService.updateOrderStatus(idOrder);
                  } else if (usage === "Anular") {
                    subscribe_method = this._ordersService.AnulateOrder(
                      idOrder,
                      (data = {
                        observation: this.message_observation,
                        anulationType: false,
                      })
                    );
                  }
                  subscribe_method.subscribe(
                    (data) => {
                      this.toastr.success(
                        "Cambio de estado realizado con éxito.",
                        "Proceso Completado",
                        {
                          progressBar: true,
                          timeOut: 2000,
                        }
                      );
                      this.getOrders(this.order_type);
                      this.modalAbierto = false;
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
                      this.modalAbierto = false;
                      console.error("Error al cambiar de estado:", error);
                    }
                  );
                  this.message_observation = "";
                } else if (result === "Cancel") {
                  this.message_observation = "";
                  this.modalAbierto = false;
                }
              },
              (reason) => {
                this.message_observation = "";
                this.modalAbierto = false;
              }
            );
        }
      },
      (error) => {
        console.error("Error al obtener el pedido:", error);
      }
    );
  }

  //--------------- Sección de Pagos ---------------//

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
      },
      (error) => {
        console.error("Error al obtener Clientes:", error);
      }
    );
  }

  createPayment() {
    this._paymentService.createPayment(this.new_payment).subscribe(
      (data) => {
        this.loading = false;
        this.toastr.success("Pago creado con éxito.", "Proceso Completado", {
          progressBar: true,
          timeOut: 2000,
        });
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

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2); // Agregar cero inicial si es necesario
    const day = ("0" + today.getDate()).slice(-2); // Agregar cero inicial si es necesario
    return `${year}-${month}-${day}`;
  }

  updateTotalRemaining() {
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
        this.isNegative = true;
        this.mensaje =
          "El pago no puede ser mayor que el restante del último pago o el total de la venta";
        console.log(
          "Error: El total_payment no puede ser mayor que total_remaining"
        );
        // Detiene la ejecución de la función si hay un error
      }else{
        this.isNegative = false;
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
    } else {
      // Si no hay pagos, realiza el cálculo estándar
      const totalRemaining =
        Math.round((totalOrder - totalPayment) * 100) / 100;
      if (totalRemaining < 0) {
        this.isNegative = true;
        this.mensaje = "El pago no puede ser mayor que el restante del último pago o el total de la venta";
        console.log(
          "Error: El total_payment no puede ser mayor que el total de la venta"
        );
      }else{
        this.isNegative = false;
      }
      this.formBasic.patchValue({ total_remaining: totalRemaining });

      // Utiliza this.id_client en lugar de id_client obtenido del formulario
      this.new_payment.total_payment = totalPayment;
      this.new_payment.id_client = id_client;
      this.new_payment.id_order = id_order;
    }
  }

  handleClientSelection(event: any) {
    this.new_payment.id_client = this.id_client;
  }

  handleOrderSelection(event: any) {
    this.new_payment.id_order = event.target.value;
  }

  submit() {
    this.createPayment();
  }

  @ViewChild("paymentModal", { static: true,  }) paymentModal: any;
  openPayments(idOrder: number) {
    if (!this.modalPayment) {
      this.modalPayment = true;
      this.formBasic.patchValue({total_remaining: null,total_payment: null, // o tu valor inicial
      });

      this._paymentService.getPayOrder(idOrder).subscribe(
        (payments) => {
          this.paymentsForOrder = payments;

          const order = this.listOrders.find((o) => o.id_order === idOrder);

          if (order && this.listClients) {
            this.currentOrder = order; // Asigna el pedido actual a currentOrder

            const client = this.listClients.find(
              (c) => c.id_client === order.id_client
            );

            this.clientName = client
              ? client.name_client
              : "Cliente no encontrado";
            this.id_client = client ? client.id_client : null;

            this.formBasic.patchValue({
              id_order: order.id_order,
              id_client: this.clientName,
              total_order:  order.total_order,
            });

            this.modalRef = this.modalService.open(this.paymentModal, {
              centered: true,
              size: "lg",
              backdrop: 'static',
            });

            if (payments.length > 0) {
              const totalPayments = payments.reduce(
                (sum, payment) => sum + parseFloat(payment.total_payment),
                0
              );
              const updatedTotalRemaining = order.total_order - totalPayments;

              this.formBasic.patchValue({
                total_remaining: updatedTotalRemaining,
              });
            }

            this.modalRef.result.then(
              (result) => {
                if (result === "yes" && result.value) {
                  this.createPayment();
                }
                this.modalPayment = false;
                this.activTab = "formulario";
              },
              (reason) => {
                this.modalPayment = false;
                this.activTab = "formulario";
              }
            );
          }
        },
        (error) => {
          console.error("Error al obtener pagos:", error);
          // Puedes manejar el error según tus necesidades
        }
      );
    }
  }

  asignarPago() {
    // Verifica si modalRef está definido antes de intentar cerrar el modal
    if (this.modalRef) {
      this.createPayment();
      this.modalRef.close("yes");
      this.activTab = "formulario";
      // Resetea el valor de modalPayment a false
      this.modalPayment = false;
    } else {
      console.error("modalRef no está definido al intentar cerrar el modal");
    }
  }
}
