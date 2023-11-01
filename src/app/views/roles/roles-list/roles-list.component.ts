import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/shared/services/roles.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
    selector: 'app-roles-list',
    templateUrl: './roles-list.component.html',
    styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
    loading: boolean;
    listRoles: any[] = []
    modalAbierto = false;
    searchControl: UntypedFormControl = new UntypedFormControl();
    roles;
    filteredRoles;

    constructor(
        private _rolesService: RolesService,
        private modalService: NgbModal,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        this._rolesService.getAllRoles()
            .subscribe((res: any[]) => {
                this.listRoles = [...res];
                this.filteredRoles = res;
            });

        this.searchControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filerData(value);
            });
    }

    filerData(val) {
        if (val) {
            val = val.toLowerCase();
        } else {
            return this.filteredRoles = [...this.roles];
        }

        const columns = Object.keys(this.roles[0]);
        if (!columns.length) {
            return;
        }

        const rows = this.roles.filter(function (d) {
            for (let i = 0; i <= columns.length; i++) {
                const column = columns[i];
                if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                    return true;
                }
            }
        });
        this.filteredRoles = rows;
    }

    sortListRolesById() {
        this.listRoles.sort((a, b) => a.id_role - b.id_role);
    }

    getRoles() {
        this._rolesService.getAllRoles().subscribe(
            (data) => {
                this.listRoles = data;
                this.sortListRolesById();
            },
            (error) => {
                console.error('Error al obtener roles:', error);
            }
        );
    }

    @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

    openModal(idRole: number) {
        this._rolesService.getRoleById(idRole).subscribe
        if (!this.modalAbierto) {
            this.modalAbierto = true;
            this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
                (result) => {
                    if (result === 'Ok') {
                        this._rolesService.updateRoleStatus(idRole).subscribe(
                            (data) => {

                                this.loading = false;
                                this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                                console.log(data);

                                setTimeout(() => {
                                    location.reload();
                                }, 2000);
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