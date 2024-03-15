import { Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
import { EmployeesService } from "src/app/shared/services/employee.service";
import { RolesService } from "src/app/shared/services/roles.service";
import { UsersService } from "src/app/shared/services/user.service";

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
  pageSize: number = 10;
  currentPage: number = 1;
  rolesList: any;
  employeesList: any[];
  showLoadingScreen: boolean = false;
  reasonAnulate: string = "";
  // Variables para controlar si los modales están abiertos
  isFirstModalOpen: boolean = false;
  isSecondModalOpen: boolean = false;
  @ViewChild("deleteConfirmModal", { static: true }) deleteConfirmModal: any;
  @ViewChild("changeModal", { static: true }) changeModal: any;

  constructor(
    private _userService: UsersService,
    private modalService: NgbModal,
    private _rolesService: RolesService,
    private _employeeService: EmployeesService,
    private toastr: ToastrService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.validateUserPermissions("Usuarios");
    this.getUsers();
  }

  handleChange(event: any, row: any) {
    row.state_user = event.target.checked ? "Activo" : "Inactivo";
  }

  getRoles() {
    this._rolesService.getAllRoles().subscribe(
      (roles) => {
        this.rolesList = roles;
        console.log(this.rolesList);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getEmployees() {
    this._employeeService.getAllEmployees().subscribe(
      (employees) => {
        this.employeesList = employees;
        console.log(this.employeesList);
      },
      (error) => {
        console.error(error);
      }
    );
  }



  getUsersCancel() {
    this.showLoadingScreen = false; // Asegúrate de que la pantalla de carga esté oculta al comenzar la operación

    forkJoin({
      roles: this._rolesService.getAllRoles(),
      employees: this._employeeService.getAllEmployees(),
      users: this._userService.getAllUsers()
    }).subscribe(
      ({ roles, employees, users }) => {
        this.rolesList = roles;
        this.employeesList = employees;

        for (let user of users) {
          const role = this.rolesList.find((r) => r.id_role === user.id_role);
          const employee = this.employeesList.find((emp) => emp.id_employee === user.id_employee);

          user.name_role = role ? role.name_role : "";
          user.id_card_employee = employee ? employee.id_card_employee : "";

          this.listUsers.push(user);
        }

        this.filteredUsers = [...this.listUsers];
        this.sortListUsers();
      },
      (error) => {
        console.error("Error al obtener roles y empleados:", error);
      }

    );
  }


  getUsers() {
    this.showLoadingScreen = true;

    forkJoin({
      roles: this._rolesService.getAllRoles(),
      employees: this._employeeService.getAllEmployees(),
      users: this._userService.getAllUsers()
    }).subscribe(
      ({ roles, employees, users }) => {
        this.rolesList = roles;
        this.employeesList = employees;
        // Obtén el usuario actual
        const currentUser = this._authService.getCurrentUser();
        // Filtra el usuario actual de la lista
        users = users.filter(user => user.id_user !== currentUser?.id_user);

        for (let user of users) {
          const role = this.rolesList.find((r) => r.id_role === user.id_role);
          const employee = this.employeesList.find(
            (emp) => emp.id_employee === user.id_employee
          );

          user.name_role = role ? role.name_role : "";
          user.id_card_employee = employee ? employee.id_card_employee : "";

          this.listUsers.push(user);
        }

        this.filteredUsers = [...this.listUsers];
        this.sortListUsers();
        this.showLoadingScreen = false;
      },
      (error) => {
        console.error("Error al obtener roles y empleados:", error);
        this.showLoadingScreen = false;
      }
    );
  }

  sortListUsers() {
    this.filteredUsers.sort((a, b) => {
      if (a.id_user > b.id_user) {
        return -1;
      }
      if (a.id_user < b.id_user) {
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
          c.email.includes(value) ||
          c.id_card_employee.toLowerCase().includes(value) ||
          c.name_role.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          c.state_user.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    } else {
      this.filteredUsers = this.listUsers;
    }
  }

  openFirstModal(idUser: number) {
    if (!this.isFirstModalOpen) {
      this.isFirstModalOpen = true;

      const modalRef = this.modalService.open(this.deleteConfirmModal, { centered: true, backdrop: 'static', keyboard: false }
      );

      modalRef.result.then(
        (result) => {
          if (result === "Ok") {
            this.confirmUserStatusChange(idUser, true, false);
            this.openSecondModal(idUser, false);
          } else if (result === "Cancel") {
            this.reasonAnulate = '';
            this.isFirstModalOpen = false;
            // Limpiar la lista de usuarios y obtener los usuarios nuevamente
            this.listUsers = [];
            this.getUsersCancel();
          }
        },
        () => {
          this.isFirstModalOpen = false;
          // Limpiar la lista de usuarios y obtener los usuarios nuevamente
          this.listUsers = [];
          this.getUsersCancel();
        }
      );
    }
  }



  openSecondModal(idUser: number, changeEmployee: boolean) {
    if (!this.isSecondModalOpen) {
      this.isSecondModalOpen = true;

      const modalRef = this.modalService.open(this.changeModal, {
        centered: true,
      });

      modalRef.result.then(
        (result) => {
          if (result === "Ok") {
            const idEmployee = this.listUsers.find(user => user.id_user === idUser).id_employee;
            console.log("ID del empleado:", idEmployee); // Añadir esta línea para verificar el id_employee
            this.changeEmployeeStatus(idEmployee);
          } else if (result === "No") {
            this.confirmUserStatusChange(idUser, true, changeEmployee);
          }
        },
        () => {
          this.isSecondModalOpen = false;
        }
      ).finally(() => {
        this.isSecondModalOpen = false;
      });
    }
  }


  confirmUserStatusChange(idUser: number, changeUser: boolean, changeEmployee: boolean) {
    const reasonAnulate = String(this.reasonAnulate);
    if (changeUser) {
      this._userService.userChangeStatus(idUser, reasonAnulate).subscribe(
        (userData) => {
          console.log(userData);
          if (userData.msg.includes("éxito")) {
            if (changeEmployee) {
              const idEmployee = this.listUsers.find(user => user.id_user === idUser).id_employee;

              this.changeEmployeeStatus(idEmployee);
            } else {
              this.toastr.success("Cambio de estado del usuario realizado con éxito.", "Proceso Completado", { progressBar: true, timeOut: 2000 });
              // Reinicia la bandera isFirstModalOpen después de completar el cambio de estado
              this.reasonAnulate = '';
              this.isFirstModalOpen = false;
            }
          } else {
            this.toastr.error("Fallo al cambiar el estado del usuario.", "Error", { progressBar: true, timeOut: 2000 });
            console.log(typeof this.reasonAnulate);
          }
        },
        (error) => {
          this.toastr.error("Fallo al cambiar el estado del usuario.", "Error", { progressBar: true, timeOut: 2000 });
          console.error("Error al cambiar el estado del usuario:", error);
        }
      );
    }
  }

  changeEmployeeStatus(idEmployee: number) {
    this._employeeService.employeeChangeStatus(idEmployee).subscribe(
      (employeeData) => {
        this.toastr.success(
          "Cambio de estado del empleado realizado con éxito.",
          "Proceso Completado",
          { progressBar: true, timeOut: 2000 }
        );
      },
      (error) => {
        this.toastr.error("Fallo al cambiar el estado del empleado.", "Error", {
          progressBar: true,
          timeOut: 2000,
        });
        console.error("Error al cambiar el estado del empleado:", error);
      }
    );
  }
}