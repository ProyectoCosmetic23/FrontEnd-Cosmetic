import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { ClientsService } from "src/app/shared/services/client.service";
import { debounceTime } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/shared/services/auth.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list-component.html",
  styleUrls: ["./client-list-component.scss"],
})
export class ClientListComponent implements OnInit {
  loading: boolean;
  searchControl: UntypedFormControl = new UntypedFormControl();
  listClients: any[] = [];
  filteredClients: any[] = [];
  reasonForm: FormGroup;
  reasonAnulate = '';
  pageSize: number = 10;
  currentPage: number = 1;
  countLabel: number;
  showLoadingScreen: boolean;


  modalAbierto = false;

  constructor(
    private _clientService: ClientsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _authService: AuthService,
    private formBuilder: FormBuilder

  ) {}
  

  ngOnInit(): void {
    this._authService.validateUserPermissions("Clientes");
    this.reasoniniForm();
    this.getClients();
  
  }

  

  getClients() {
    this.showLoadingScreen = true;
    this._clientService.getAllClients().subscribe(
      (data) => {
        this.listClients = data;
        this.filteredClients = [...this.listClients];
        this.sortListClients();
  
      },
      (error) => {
        console.error("Error al obtener Clientes:", error);
      }
    )
    .add(() => {
      this.showLoadingScreen = false; // Establecer en false después de la carga
    });
  }

  
  getClientsCancel() {
    this._clientService.getAllClients().subscribe(
      (data) => {
        this.listClients = data;
        this.filteredClients = [...this.listClients];
        this.sortListClients();
  
      },
      (error) => {
        console.error("Error al obtener Clientes:", error);
      }
    )
    .add(() => {
      this.showLoadingScreen = false; // Establecer en false después de la carga
    });
  }


  @ViewChild(DatatableComponent)
  table: DatatableComponent;

  actualizarCountLabel() {
    this.countLabel = this.filteredClients.length;
  }


  sortListClients() {
    this.filteredClients.sort((a, b) => {
      if (a.id_client > b.id_client ) {
        return -1;
      }
      if (a.id_client  > b.id_client ) {
        return 1;
      }
      return 0;
    });
  }


  searchCategory($event) {
    const value = ($event.target as HTMLInputElement).value;
    if (value !== null && value !== undefined && value !== "") {
      this.filteredClients = this.listClients.filter(
        (c) =>
          c.name_client.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          c.nit_or_id_client.includes(value) ||
          c.email_client.includes(value) ||
          c.last_name_client.toLowerCase().indexOf(value.toLowerCase()) !== -1||
          this.changeClientStateDescription(c.state_client).toLowerCase().indexOf(value.toLowerCase()) !== -1)
    } else {
      this.filteredClients = this.listClients;
    }
  }


  changeClientStateDescription(state_client: boolean) {
    return state_client ? "Activo" : "Inactivo";
  }



  private reasoniniForm(): void {
    this.reasonForm = this.formBuilder.group({
      reason_anulate: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
        ],
      ],
    });
  }

  handleChange(event: any, row: any) {
    row.state_category = event.target.checked ? 'Activo' : 'Inactivo';
 
  }





  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;

  openModal(idClient: number) {
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      this.modalService
        .open(this.deleteConfirmModal, {  centered: true,backdrop: 'static', keyboard: false})
        .result.then(
          (result) => {
            if (result === "Ok") {
              // Modifica la llamada al servicio para enviar la razón de anulación
              this._clientService
                .clientChangeStatus(idClient,  this.reasonAnulate)
                .subscribe(
                  (data) => {
                    this.loading = false;
                    this.toastr.success(
                      "Cambio de estado realizado con éxito.",
                      "Proceso Completado",
                      { progressBar: true, timeOut: 2000 }
                    );
                    this.getClientsCancel();
                    this.modalAbierto = false;
                  },
                  (error) => {
                    this.loading = false;
                    this.toastr.error(
                      "Fallo al realizar el cambio de estado.",
                      "Error",
                      { progressBar: true, timeOut: 2000 }
                    );
                    console.error("Error al cambiar de estado:", error);
                  }
                );
            }
          },
          (reason) => {
            // Manejar la cancelación del modal aquí
            this.reasonAnulate = '';
           this.getClients();
            this.modalAbierto = false;
          }
        );
    }
  }
}