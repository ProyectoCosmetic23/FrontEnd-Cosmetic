import { Component, OnInit, ViewChild } from '@angular/core';
import { RolesService } from 'src/app/shared/services/roles.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'app-roles-list',
    templateUrl: './roles-list.component.html',
    styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {
    loading: boolean;
    listRoles: any[] = [];
    modalAbierto = false;
    searchControl: UntypedFormControl = new UntypedFormControl();
    filteredRoles: any[] = [];
    currentPage = 1; // Propiedad para rastrear la página actual
    itemsPerPage = 6; // El número de filas por página
    countLabel: number;

    constructor(
        private _rolesService: RolesService,
        private modalService: NgbModal,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getRoles();
    }

    getRoles() {
        this._rolesService.getAllRoles().subscribe(
            (data) => {
                this.listRoles = data;
                console.log(this.listRoles);
                this.sortListRolesById();
                this.adjustListRoles();
            },
            (error) => {
                console.error('Error al obtener roles:', error);
            }
        );
    }

    @ViewChild(DatatableComponent)
    table: DatatableComponent;

    // Luego, puedes actualizar el valor visual de count según tus necesidades
    actualizarCountLabel() {
        this.countLabel = this.listRoles.length;
    }

    adjustListRoles() {
        const totalRows = this.listRoles.length;
        const remainingRows = 6 - (totalRows % 6);

        for (let i = 0; i < remainingRows; i++) {
            this.listRoles.push({}); // Agrega filas vacías
        }

        this.loadData();
    }

    sortListRolesById() {
        this.listRoles.sort((a, b) => {
            if (a.id_role < b.id_role) {
                return -1;
            }
            if (a.id_role > b.id_role) {
                return 1;
            }
            return 0;
        });
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

        console.log('load data charged');
    }

    onPageChange(event: any) {
        console.log('onPageChange event:', event);
        this.currentPage = event.offset + 1;
        this.loadData();
    }

    @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

    openModal(idRole: number) {
        this._rolesService.getRoleById(idRole).subscribe(
            (data) => {
                if (!this.modalAbierto) {
                    this.modalAbierto = true;
                    this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
                        (result) => {
                            if (result === 'Ok') {
                                this._rolesService.updateRoleStatus(idRole).subscribe(
                                    (data) => {
                                        this.loading = false;
                                        this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', {
                                            progressBar: true,
                                            timeOut: 2000
                                        });
                                        setTimeout(() => {
                                            location.reload();
                                        }, 2000);
                                    },
                                    (error) => {
                                        this.loading = false;
                                        this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', {
                                            progressBar: true,
                                            timeOut: 2000
                                        });
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
            },
            (error) => {
                console.error('Error al obtener el rol:', error);
            }
        );
    }
}
