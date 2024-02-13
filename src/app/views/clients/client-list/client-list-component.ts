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

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list-component.html",
  styleUrls: ["./client-list-component.scss"],
})
export class ClientListComponent implements OnInit {
  loading: boolean;
  searchControl: UntypedFormControl = new UntypedFormControl();
  listClients: any[];
  filteredClients: any[];

  pageSize: number = 10;
  currentPage: number = 1;

  modalAbierto = false;

  constructor(
    private _clientService: ClientsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _authService: AuthService

  ) {}
  private formBuilder: FormBuilder;

  ngOnInit(): void {
    this._authService.validateUserPermissions("Clientes");
    this.getClients();
    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.filterData(value);
      });
  }

  getClients() {
    this._clientService.getAllClients().subscribe(
      (data) => {
        this.listClients = data.sort((a, b) => a.id_client - b.id_client);
        this.filteredClients = [...this.listClients];
        this.sortListClients();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sortListClients() {
    this.filteredClients.sort((a, b) => {
      if (a.id_client > b.id_client) {
        return -1;
      }
      if (a.id_client > b.id_client) {
        return 1;
      }
      return 0;
    });
  }

  filterData(value: string) {
    if (value) {
      value = value.toLowerCase();
    } else {
      this.filteredClients = [...this.listClients];
      return;
    }

    this.filteredClients = this.listClients.filter((client) => {
      const nombreMatch = client.name_client.toLowerCase().includes(value);
      const correoMatch = client.email_client.toLowerCase().includes(value);
      const estadoMatch = client.state_client.toLowerCase().includes(value);

      return nombreMatch || correoMatch || estadoMatch;
    });

    this.currentPage = 1;
  }

  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;

  openModal(idClient: number) {
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      this.modalService
        .open(this.deleteConfirmModal, { centered: true })
        .result.then(
          (result) => {
            if (result === "Ok") {
              this._clientService.clientChangeStatus(idClient).subscribe(
                (data) => {
                  // this.loading = false;
                  // this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                  console.log(data);

                  setTimeout(() => {
                    location.reload();
                  });
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
  }
}
