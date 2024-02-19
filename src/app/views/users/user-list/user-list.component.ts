import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UntypedFormControl } from "@angular/forms";
import { UsersService } from "src/app/shared/services/user.service";
import { debounceTime } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { RolesService } from "src/app/shared/services/roles.service";
import { EmployeesService } from "src/app/shared/services/employee.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  loading: boolean;
  searchControl: UntypedFormControl = new UntypedFormControl();
  listUsers: any[] = [];
  filteredUsers: any[] = [];
  modalAbierto = false;
  pageSize: number = 10;
  currentPage: number = 1;
  roles: any = {};
  employees: any = {};
  showLoadingScreen: boolean;

    // Variable para controlar si el primer modal está abierto
isFirstModalOpen: boolean = false;
// Variable para controlar si el segundo modal está abierto
isSecondModalOpen: boolean = false;
  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;
@ViewChild("changeModal", { static: true }) changeModal: any;
  countLabel: any;
  constructor(
    private _userService: UsersService,
    private modalService: NgbModal,
    private _rolesService: RolesService,
    private _employeeService: EmployeesService,
    private toastr: ToastrService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._authService.validateUserPermissions("Usuarios");
    this.getUsers();
    this._rolesService.getAllRoles().subscribe((roles: any[]) => {
      roles.forEach((role) => {
        this.roles[role.id_role] = role.name_role;
      });
    });

    this._employeeService.getAllEmployees().subscribe((employees: any[]) => {
      employees.forEach((employee) => {
        this.employees[employee.id_employee] = employee.id_card_employee;
      });
    });
    this.attachRoleNames();
    this.attachCardEmployee();

    // this.searchControl.valueChanges
    //     .pipe(debounceTime(200))
    //     .subscribe(value => {
    //         this.filterData(value);
    //     });
  }

//Consultar todos los usuarios

  getUsers() {
    this.showLoadingScreen = true;
    this._userService.getAllUsers().subscribe(
      (data) => {
        this.listUsers = data;
        this.filteredUsers = [...this.listUsers];
        this.sortListUsers();
        this.attachRoleNames();
        this.attachCardEmployee();
  
      },
      (error) => {
        console.error("Error al obtener usuario:", error);
      }
    )
    .add(() => {
      this.showLoadingScreen = false; // Establecer en false después de la carga
    });
  }



  attachRoleNames() {
    this.filteredUsers.forEach((user) => {
      user.roleName = this.roles[user.id_role]; // Suponiendo que 'id_role' es el identificador del rol del usuario
    });
  }

  attachCardEmployee() {
    this.filteredUsers.forEach((user) => {
      user.employeeCard = this.employees[user.id_employee]; // Suponiendo que 'id_role' es el identificador del rol del usuario
    });
  }

  @ViewChild(DatatableComponent)
  table: DatatableComponent;

  //  actualizar el valor visual de count según tus necesidades
  actualizarCountLabel() {
    this.countLabel = this.filteredUsers.length;
  }

  sortListUsers() {
    this.filteredUsers.sort((a, b) => {
      if (a.id_user > b.id_user) {
        return -1;
      }
      if (a.id_user > b.id_user) {
        return 1;
      }
      return 0;
    });
  }


  searchUser($event) {
    const value = ($event.target as HTMLInputElement).value;
    if (value !== null && value !== undefined && value !== "") {
      this.filteredUsers = this.listUsers.filter(
        (c) =>
          c.username.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          this.changeUserStateDescription(c.state_user)
            .toLowerCase()
            .indexOf(value.toLowerCase()) !== -1
      );
    } else {
      this.filteredUsers = this.listUsers;
    }
  }
 


  
  changeUserStateDescription(state_user: boolean) {
    return state_user ? "Activo" : "Inactivo";
  }

  openFirstModal(idUser: number) {
    if (!this.isFirstModalOpen) {
      this.isFirstModalOpen = true;
      const modalRef = this.modalService.open(this.deleteConfirmModal, { centered: true });
  
      modalRef.result.then(
        (result) => {
          if (result === "Ok") {
            // Cambiar solo el estado del usuario
            this.confirmUserStatusChange(idUser, true, false);
            // Abrir el segundo modal sin cambiar el estado del empleado
            this.openSecondModal(idUser, false); // Envía false para indicar que no se cambie el estado del empleado en el segundo modal
          } else if (result === "Cancel") {
            this.isFirstModalOpen = false;
          }
        },
        (reason) => {
          console.error("Error al abrir el primer modal:", reason);
          this.isFirstModalOpen = false;
        }
      );
    }
  }
  
  openSecondModal(idUser: number, changeEmployee: boolean) {
    if (!this.isSecondModalOpen) {
      this.isSecondModalOpen = true;
      const modalRef = this.modalService.open(this.changeModal, { centered: true });
  
      modalRef.result.then(
        (result) => {
          if (result === "Ok") {
            // Cambiar el estado del usuario y del empleado
            this.confirmUserStatusChange(idUser, true, true);
          } else if (result === "No") {
            // Cambiar solo el estado del usuario, no del empleado
            this.confirmUserStatusChange(idUser, true, changeEmployee); // Utiliza el valor pasado para changeEmployee
          }
          this.isSecondModalOpen = false;
        },
        (reason) => {
          console.error("Error al abrir el segundo modal:", reason);
          this.isSecondModalOpen = false;
        }
      );
    }
  }
  
  confirmUserStatusChange(idUser: number, changeUser: boolean, changeEmployee: boolean) {
    if (changeUser) {
      this._userService.userChangeStatus(idUser).subscribe(
        (userData) => {
          if (changeEmployee) {
            this.changeEmployeeStatus(idUser);
          } else {
            this.toastr.success('Cambio de estado del usuario realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
          }
        },
        (error) => {
          this.toastr.error('Fallo al cambiar el estado del usuario.', 'Error', { progressBar: true, timeOut: 2000 });
          console.error("Error al cambiar el estado del usuario:", error);
        }
      );
    }
  }
  
  changeEmployeeStatus(idUser: number) {
    this._employeeService.employeeChangeStatus(idUser).subscribe(
      (employeeData) => {
        this.toastr.success('Cambio de estado del empleado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
      },
      (error) => {
        this.toastr.error('Fallo al cambiar el estado del empleado.', 'Error', { progressBar: true, timeOut: 2000 });
        console.error("Error al cambiar el estado del empleado:", error);
      }
    );
  }
}  