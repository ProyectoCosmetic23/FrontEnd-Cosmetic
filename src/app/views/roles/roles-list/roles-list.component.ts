import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RolesService } from "src/app/shared/services/roles.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { UntypedFormControl } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { ChangeDetectorRef } from "@angular/core";

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
  message_observation: any = "";
  listRolesOriginal: any[] = [];

  constructor(
    private _rolesService: RolesService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private el: ElementRef,
    private _authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._authService.validateUserPermissions("Roles");
    this.getRoles();
  }

  getRoles() {
    this.showLoadingScreen = true;
    this._rolesService.getAllRoles().subscribe(
      (data) => {
        this.listRoles = data;
        this.listRolesOriginal = data;
        this.originalRowCount = this.listRoles.length;
        setTimeout(() => {
          const pageCountElement =
            this.el.nativeElement.querySelector(".page-count");
          if (pageCountElement) {
            const innerText = pageCountElement.innerText;
            pageCountElement.innerText = this.originalRowCount + " registros.";
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

  searchRoles(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (searchTerm !== "") {
      this.listRoles = this.listRolesOriginal.filter(
        (role) =>
          (role.name_role &&
            this.normalizeString(role.name_role).includes(
              this.normalizeString(searchTerm)
            )) ||
          (role.state_role &&
            this.normalizeString(role.state_role) ===
              this.normalizeString(searchTerm))
      );
    } else {
      this.listRoles = this.listRolesOriginal;
    }
  }

  normalizeString(str: string): string {
    return str
      ? str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      : "";
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
  }

  onPageChange(event: any) {
    this.currentPage = event.offset + 1;
    this.loadData();
  }

  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;

  openModal(idRole: number, stateRole: string) {
    const roleIndex = this.listRoles.findIndex(
      (role) => role.id_role === idRole
    );
    if (stateRole == "Activo") {
      this.stateMessage = "¿Está seguro de que desea desactivar éste rol?";
    } else if (stateRole == "Inactivo") {
      this.stateMessage = "¿Está seguro de que desea activar éste rol?";
    }

    if (!this.modalAbierto) {
      this.modalAbierto = true;
      this.modalService
        .open(this.deleteConfirmModal, { centered: true, backdrop: "static" })
        .result.then(
          (result) => {
            if (result === "Ok") {
              this.activeLayer = !this.activeLayer;
              if (this.message_observation == "") {
                this.toastr.warning(
                  "Debe indicar el motivo por el que se cambia el estado del rol.",
                  "Advertencia",
                  {
                    progressBar: true,
                    timeOut: 1000,
                  }
                );
                this.message_observation = "";
                this.modalAbierto = false;
              } else {
                this._rolesService
                  .updateRoleStatus(idRole, {
                    observation: this.message_observation,
                  })
                  .subscribe(
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

                      // Cambiar el estado del rol en listRoles
                      if (this.listRoles[roleIndex].state_role === "Activo") {
                        this.listRoles[roleIndex].state_role = "Inactivo";
                      } else {
                        this.listRoles[roleIndex].state_role = "Activo";
                      }

                      this.cdRef.detectChanges(); // Detectar los cambios después de actualizar listRoles

                      // Obtener el estado actualizado del rol
                      const updatedRole = this.listRoles.find(
                        (role) => role.id_role === idRole
                      );
                      if (updatedRole) {
                        this.activeLayer = !this.activeLayer;
                      }
                    },
                    (error) => {
                      this.loading = false;
                      this.toastr.error(
                        "Fallo al realizar el cambio de estado.",
                        "Error",
                        {
                          progressBar: true,
                        }
                      );
                      console.error("Error al cambiar de estado:", error);
                    }
                  );
              }
            } else if (result === "Cancel") {
              this.modalAbierto = false;
            }
          },
          (reason) => {
            this.modalAbierto = false;
          }
        );
    }
    (error) => {
      console.error("Error al obtener el rol:", error);
    };
    this.message_observation = "";
  }
}
