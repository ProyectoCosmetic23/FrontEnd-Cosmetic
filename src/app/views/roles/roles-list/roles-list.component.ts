import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RolesService } from "src/app/shared/services/roles.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { UntypedFormControl } from "@angular/forms";

@Component({
  selector: "app-roles-list",
  templateUrl: "./roles-list.component.html",
  styleUrls: ["./roles-list.component.scss"],
})
export class RolesListComponent implements OnInit {
  loading: boolean;
  showLoadingScreen: boolean = false;
  listRoles: any[] = [];
  modalAbierto = false;
  searchControl: UntypedFormControl = new UntypedFormControl();
  filteredRoles: any[] = [];
  currentPage = 1; // Propiedad para rastrear la página actual
  itemsPerPage = 6; // El número de filas por página
  originalRowCount: any;
  activeLayer: boolean = false;
  stateMessage: string;

  constructor(
    private _rolesService: RolesService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.showLoadingScreen = true;
    this._rolesService.getAllRoles().subscribe(
      (data) => {
        this.listRoles = data;
        this.originalRowCount = this.listRoles.length;
        setTimeout(() => {
          const pageCountElement =
            this.el.nativeElement.querySelector(".page-count");
          if (pageCountElement) {
            const innerText = pageCountElement.innerText;
            pageCountElement.innerText = this.originalRowCount + " registros.";
            console.log("Inner text de .page-count:", innerText);
          }
        });
        this.sortListRolesByState(); // Llama a la nueva función de ordenamiento
        this.adjustListRoles();
        this.showLoadingScreen = false;
      },
      (error) => {
        console.error("Error al obtener roles:", error);
        this.showLoadingScreen = false;
      }
    );
  }

  @ViewChild(DatatableComponent)
  table: DatatableComponent;

  adjustListRoles() {
    const totalRows = this.listRoles.length;
    const remainingRows = 6 - (totalRows % 6);

    for (let i = 0; i < remainingRows; i++) {
      this.listRoles.push({});
    }

    this.loadData();
  }

  sortListRolesByState() {
    this.listRoles.sort((a, b) => {
      // Compara los estados
      const stateOrder =
        this.getStateOrder(a.state_role) - this.getStateOrder(b.state_role);

      // Si los estados son diferentes, ordena según el estado
      if (stateOrder !== 0) {
        return stateOrder;
      }

      // Si los estados son iguales, ordena por id_role
      return a.id_role - b.id_role;
    });
  }

  // Función auxiliar para asignar un valor numérico a cada estado
  getStateOrder(state: string): number {
    // Asigna un valor numérico mayor a "Activo" y menor a "Inactivo"
    return state === "Activo" ? 1 : state === "Inactivo" ? 2 : 0;
  }

  loadData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;

    const totalPages = Math.ceil(this.listRoles.length / this.itemsPerPage);

    if (this.currentPage === totalPages) {
      const remainingRows = this.listRoles.length % this.itemsPerPage;
      if (remainingRows > 0) {
        endIndex = startIndex + remainingRows;
      }
    }

    // Ajusta endIndex para que sea el próximo número divisible por 6
    const rowsToAdd = 6 - (endIndex % 6);
    endIndex += rowsToAdd;

    this.filteredRoles = this.listRoles.slice(startIndex, endIndex);

    console.log("load data charged");
  }

  onPageChange(event: any) {
    console.log("onPageChange event:", event);
    this.currentPage = event.offset + 1;
    this.loadData();
  }

  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;

  openModal(idRole: number, stateRole: string) {
    console.log("Open modal");

    if (stateRole == "Activo") {
      this.stateMessage = "¿Está seguro de que desea desactivar éste rol?";
    } else if (stateRole == "Inactivo") {
      this.stateMessage = "¿Está seguro de que desea activar éste rol?";
    }

    this._rolesService.getRoleById(idRole).subscribe(
      (data) => {
        console.log(this.modalAbierto);
        if (!this.modalAbierto) {
          this.modalAbierto = true;
          this.modalService
            .open(this.deleteConfirmModal, { centered: true })
            .result.then(
              (result) => {
                if (result === "Ok") {
                  this.activeLayer = !this.activeLayer;
                  this._rolesService.updateRoleStatus(idRole).subscribe(
                    (data) => {
                      this.modalAbierto = false;
                      this.loading = false;
                      this.toastr.success(
                        "Cambio de estado realizado con éxito.",
                        "Proceso Completado",
                        {
                          progressBar: true,
                          timeOut: 1000,
                        }
                      );
                      setTimeout(() => {
                        this.getRoles();
                        this.updateSwitchState(idRole);
                        this.activeLayer = !this.activeLayer;
                      }, 1000);
                    },
                    (error) => {
                      this.updateSwitchState(idRole);
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
                  this.getRoles();
                  this.updateSwitchState(idRole);
                }
              },
              (reason) => {
                this.modalAbierto = false;
                this.getRoles();
                this.updateSwitchState(idRole);
              }
            );
        }
      },
      (error) => {
        console.error("Error al obtener el rol:", error);
        this.updateSwitchState(idRole);
      }
    );
  }

  updateSwitchState(idRole: number) {
    const role = this.listRoles.find((role) => role.id_role === idRole);
    if (role) {
      role.state_role = role.state_role === "Activo" ? "Inactivo" : "Activo";
    }
  }
}
