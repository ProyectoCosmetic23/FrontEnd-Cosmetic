import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/user.service';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from "src/app/shared/services/roles.service";
import { EmployeesService } from 'src/app/shared/services/employee.service';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
    loading: boolean;
    searchControl: UntypedFormControl = new UntypedFormControl();
    listUsers: any[];
    filteredUsers: any[];
    pageSize: number = 10;
    currentPage: number = 1;
    modalAbierto = false;
    roles:any={};
    employees:any={};


    constructor(
        private _userService: UsersService,
        private modalService: NgbModal,
        private _rolesService: RolesService,
        private _employeeService: EmployeesService,
        private toastr: ToastrService,) { }

    ngOnInit(): void {
        this.getUsers();
        this._rolesService.getAllRoles().subscribe((roles:any[])=>{
            roles.forEach(role=>{
                this.roles[role.id_role]=role.name_role;
            });
        });

        this._employeeService.getAllEmployees().subscribe((employees:any[])=>{
            employees.forEach(employee=>{
                this.employees[employee.id_employee]=employee.id_card_employee;
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



    getUsers() {
        this._userService.getAllUsers().subscribe(data => {
            this.listUsers = data.sort((a, b) => a.id_user - b.id_user);
            this.filteredUsers = [...this.listUsers];
            this.sortListUsers();
            this.attachRoleNames();
            this.attachCardEmployee();
        }, error => {
            console.log(error);
        });
    }

    attachRoleNames() {
        this.filteredUsers.forEach(user => {
            user.roleName = this.roles[user.id_role]; // Suponiendo que 'id_role' es el identificador del rol del usuario
        });
    }

    attachCardEmployee() {
        this.filteredUsers.forEach(user => {
            user.employeeCard = this.employees[user.id_employee]; // Suponiendo que 'id_role' es el identificador del rol del usuario
        });
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
    filterData(value: string) {
        if (value) {
            value = value.toLowerCase();
        } else {
            this.filteredUsers = [...this.listUsers];
            return;
        }

        this.filteredUsers = this.listUsers.filter(user => {
            const nombreMatch = user.username.toLowerCase().includes(value);
            const correoMatch = user.email.toLowerCase().includes(value);
            const estadoMatch = user.state_user.toLowerCase().includes(value);

            return   nombreMatch || correoMatch || estadoMatch;
        });

        this.currentPage = 1;
    }

    @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

    openModal(idUser: number) {
        if (!this.modalAbierto) {
            this.modalAbierto = true;
            this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
                (result) => {
                    if (result === 'Ok') {
                        this._userService.userChangeStatus(idUser).subscribe(
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
                                this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', { progressBar: true, timeOut: 2000 });
                                console.error('Error al cambiar de estado:', error);
                            }
                        );
                    } else if (result === 'Cancel') {
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