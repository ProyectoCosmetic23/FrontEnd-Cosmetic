import { Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CookieService } from "ngx-cookie-service";
import { ToastrService } from "ngx-toastr";
import { debounceTime } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth.service";
import { EmployeesService } from "src/app/shared/services/employee.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"],
})
export class EmployeeListComponent implements OnInit {
  loading: boolean;
  searchControl: UntypedFormControl = new UntypedFormControl();
  listEmployees: any[] = [];
  filteredEmployees: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  modalAbierto = false;
  itemsPerPage = 6;
  countLabel: number;
  reasonAnulate: string = "";
  showLoadingScreen: boolean=false;

  constructor(
    private _employeeService: EmployeesService,
    private cookieService: CookieService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._authService.validateUserPermissions("Empleados");
    this.getEmployees();
  }

  handleChange(event: any, row: any) {
    row.state_employee = event.target.checked ? "Activo" : "Inactivo";
  }

  
  getEmployeesCancel() {
    this.showLoadingScreen = false;
   
    this._employeeService.getAllEmployees().subscribe(
      (data) => {
        this.listEmployees = data.sort((a, b) => a.id_employee - b.id_employee);
        this.filteredEmployees = [...this.listEmployees];
        this.sortListEmployeesById();
        this.irefreshListEmployees();
        this.loading = false; // Oculta el indicador de carga después de obtener los datos
      },
      (error) => {
        this.loading = false; // Manejar el error y ocultar el indicador de carga
        console.error("Error al obtener empleados:", error);
      }
    )
    .add(() => {
      this.showLoadingScreen = false;
  });
}

  getEmployees() {
    this.showLoadingScreen = true;
   
    this._employeeService.getAllEmployees().subscribe(
      (data) => {
        this.listEmployees = data.sort((a, b) => a.id_employee - b.id_employee);
        this.filteredEmployees = [...this.listEmployees];
        this.sortListEmployeesById();
        this.irefreshListEmployees();
        this.loading = false; // Oculta el indicador de carga después de obtener los datos
      },
      (error) => {
        this.loading = false; // Manejar el error y ocultar el indicador de carga
        console.error("Error al obtener empleados:", error);
      }
    )
    .add(() => {
      this.showLoadingScreen = false;
  });
}

  irefreshListEmployees() {
    this.loadData();
  }

  sortListEmployeesById() {
    this.filteredEmployees.sort((a, b) => {
      if (a.id_employee > b.id_employee) {
        return -1;
      }
      if (a.id_employee < b.id_employee) {
        return 1;
      }
      return 0;
    });
  }

  loadData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;

    const totalPages = Math.ceil(
      this.filteredEmployees.length / this.itemsPerPage
    );

    if (this.currentPage === totalPages) {
      const remainingRows = this.filteredEmployees.length % this.itemsPerPage;
      if (remainingRows > 0) {
        endIndex = startIndex + remainingRows;
      }
    }

    // Ajusta endIndex para que sea el próximo número divisible por 6
    const rowsToAdd = 6 - (endIndex % 6);
    endIndex += rowsToAdd;
  }

  onPageChange(event: any) {
    this.currentPage = event.offset + 1;
    this.loadData();
  }

  searchEmployee($event) {
    const normalizeString = (str: string) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
  
    const value = ($event.target as HTMLInputElement).value.toLowerCase();
    const normalizedValue = normalizeString(value);
  
    if (normalizedValue.trim() !== "") {
      this.filteredEmployees = this.listEmployees.filter(
        (employee) =>
          normalizeString(employee.name_employee.toLowerCase()).includes(normalizedValue) ||
          employee.id_card_employee.toLowerCase().includes(normalizedValue) ||
          employee.email.toLowerCase().includes(normalizedValue) ||
          (normalizeString(employee.state_employee.toLowerCase()).slice(0, 3) === normalizedValue || normalizeString(employee.state_employee.toLowerCase()) === normalizedValue)
      );
    } else {
      this.filteredEmployees = this.listEmployees;
    }
  
    this.loadData();
  }
  




  
  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;

  openModal(idEmployee: number) {
    if (!this.modalAbierto) {
      this.modalAbierto = true;

      this.modalService
        .open(this.deleteConfirmModal, {  centered: true,backdrop: 'static', keyboard: false})
        .result.then(
          (result) => {
            if (result === "Ok") {
              const token = this.cookieService.get("token");
              // Modifica la llamada al servicio para enviar la razón de anulación
              this._employeeService
                .employeeChangeStatus(idEmployee, token, this.reasonAnulate)
                .subscribe(
                  (data) => {
                    this.loading = false;
                    this.toastr.success(
                      "Cambio de estado realizado con éxito.",
                      "Proceso Completado",
                      { progressBar: true, timeOut: 2000 }
                    );
                    this.reasonAnulate = '';
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
            this.getEmployeesCancel();
            this.modalAbierto = false;
          }
        );
    }
  }
}
