import { Component, OnInit, ViewChild } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ComissionsService } from 'src/app/shared/services/comission.service';
import { UntypedFormControl } from '@angular/forms';
import { PaginationControlsComponent } from 'ngx-pagination';
import { debounceTime } from 'rxjs/operators';


@Component({
    selector: 'app-comission-list',
    templateUrl: './comission-list.component.html',
    styleUrls: ['./comission-list.component.scss']
})
export class ComissionListComponent implements OnInit {
    loading: boolean;
    listComissions: any[] = []
    originalListComissions: any[] = [];
    employees: any = {};
    comissionDetails: any = {};
    openedModal = false;
    searchControl: UntypedFormControl = new UntypedFormControl();
    comissions;
    filteredComissions;
    paginationId: string = 'comissions-pagination';

    currentPage: number = 1;
    itemsPerPage: number = 6;


    onPageChange(event: any) {
        this.currentPage = event.offset / this.itemsPerPage + 1;
        this.updateListComissions();
    }

    constructor(
        private _comissionsService: ComissionsService,
        private modalService: NgbModal,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        // Obtener datos de comisiones
        this._comissionsService.getAllComs().subscribe((res: any[]) => {
            this.listComissions = res;
            // Llamar al servicio para obtener datos de empleados
            this._comissionsService.getAllEmployees().subscribe((employees: any[]) => {
                // Mapear los datos de empleados en un objeto para búsquedas rápidas
                employees.forEach(employee => {
                    this.employees[employee.id_employee] = employee.name_employee;
                });
            });
    
            // Llamar al servicio para obtener detalles de comisión
            this._comissionsService.getAllComsDetail().subscribe((details: any[]) => {
                // Crear un objeto que asocie los detalles de comisión con las comisiones principales
                this.listComissions.forEach(comission => {
                    const detail = details.find(detail => detail.id_commission_detail === comission.id_commission_detail);
                    if (detail) {
                        comission.month_commission = detail.month_commission;
                        comission.commission_percentage = detail.commission_percentage;
                    }
                });
            });
        });
    }

    
    updateListComissions() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        const totalPages = Math.ceil(this.listComissions.length / this.itemsPerPage);

        if (this.currentPage === totalPages) {
            const remainingRows = this.listComissions.length%this.itemsPerPage
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows
            }
        }

        const rowsToAdd = 6 -(endIndex % 6)
        endIndex += rowsToAdd
        this.filteredComissions = this.listComissions.slice(startIndex, endIndex)
    }

    pageChanged(event: any) {
        this.currentPage = event.page;
        this.updateListComissions();
    }

    filerData(val) {
        if (val) {
            val = val.toLowerCase();
        } else {
            return this.filteredComissions = [...this.comissions];
        }

        const columns = Object.keys(this.comissions[0]);
        if (!columns.length) {
            return;
        }

        const rows = this.comissions.filter(function (d) {
            for (let i = 0; i <= columns.length; i++) {
                const column = columns[i];
                if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                    return true;
                }
            }
        });
        this.filteredComissions = rows;
    }

    sortListComissionsById() {
        this.listComissions.sort((a, b) => a.id_commission - b.id_commission);
    }

    getComissions() {
        this._comissionsService.getAllComs().subscribe(
            (data) => {
                this.listComissions = data;
                this.sortListComissionsById();
                location.reload();
            },
            (error) => {
                console.error('Error al obtener las comisiones:', error);
            }
        );
    }
}
