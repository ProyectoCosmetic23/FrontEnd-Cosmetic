import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/user.service';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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


    constructor(
        private _userService: UsersService,
        private modalService: NgbModal,
        private toastr: ToastrService,) { }

    ngOnInit(): void {
        this.getUsers();
        this.searchControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filterData(value);
            });
    }



    getUsers() {
        this._userService.getAllUsers().subscribe(data => {
            this.listUsers = data.sort((a, b) => a.id_user - b.id_user);
            this.filteredUsers = [...this.listUsers];
        }, error => {
            console.log(error);
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