import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { EmployeesService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  loading: boolean;
  searchControl: UntypedFormControl = new UntypedFormControl();
  listEmployees: any[];
  filteredEmployees: any[];
  pageSize: number = 10;
  currentPage: number = 1;
  modalAbierto = false;


  constructor(

    private _employeeService: EmployeesService,
    private cookieService: CookieService,
    private modalService: NgbModal,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getEmployees();
    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.filterData(value);
      });
  }



  handleChange(event: any, row: any) {
    row.state_employee = event.target.checked ? 'Activo' : 'Inactivo';
  }

  getEmployees() {
    const token = this.cookieService.get('token');
    this._employeeService.getAllEmployees(token).subscribe(data => {
      this.listEmployees = data.sort((a, b) => a.id_employee - b.id_employee);
      this.filteredEmployees = [...this.listEmployees];
    }, error => {
      console.log(error);
    });
  }

  filterData(value: string) {
    if (value) {
      value = value.toLowerCase();
    } else {
      this.filteredEmployees = [...this.listEmployees];
      return;
    }

    this.filteredEmployees = this.listEmployees.filter(employee => {
      const cedulaMatch = employee.id_card_employee.toLowerCase().includes(value);
      const nombreMatch = employee.name_employee.toLowerCase().includes(value);
      const correoMatch = employee.email.toLowerCase().includes(value);
      const estadoMatch = employee.state_employee.toLowerCase().includes(value);

      return cedulaMatch || nombreMatch || correoMatch || estadoMatch;
    });

    this.currentPage = 1;
  }

  @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

  openModal(idEmployee: number) {
    if (!this.modalAbierto) {
      this.modalAbierto = true;
      const employee = this.filteredEmployees.find(e => e.id_employee === idEmployee);
      const previousState = employee ? employee.state_employee : '';
      this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
        (result) => {
          if (result === 'Ok') {
            const token = this.cookieService.get('token');
            this._employeeService.employeeChangeStatus(idEmployee, token).subscribe(
              (data) => {
                this.loading = false;
                this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                console.log(data);
                this.getEmployees();
                this.modalAbierto = false;
              },
              (error) => {
                this.loading = false;
                this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', { progressBar: true, timeOut: 2000 });
                console.error('Error al cambiar de estado:', error);
              }
            );
          }

        },
        (reason) => {
          // Manejar la cancelación del modal aquí
          this.getEmployees();
          this.modalAbierto = false;
        }
      );
    }
  }


}





