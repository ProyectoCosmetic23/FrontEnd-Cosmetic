import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { OrdersService } from "src/app/shared/services/orders.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { UntypedFormControl } from "@angular/forms";

@Component({
  selector: "app-sales-list",
  templateUrl: "./sales-list.component.html",
  styleUrls: ["./sales-list.component.scss"],
})
export class SalesListComponent implements OnInit {
  loading: boolean;
  listOrders: any[] = [];
  modalAbierto = false;
  searchControl: UntypedFormControl = new UntypedFormControl();
  filteredOrders: any[] = [];
  listClients: any[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  countLabel: number;
  originalRowCount: any;
  showLoadingScreen: boolean = false;

  constructor(
    private _ordersService: OrdersService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.getSales();
  }

  // Método para obtener todos los clientes
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

  getSales() {
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
                      setTimeout(() => {
                        location.reload();
                      }, 2000);
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
        console.error("Error al obtener el pedido:", error);
      }
    );
  }
}
