import { Component, OnInit, ViewChild } from '@angular/core';
import { ComissionsService } from 'src/app/shared/services/comission.service';
import { UntypedFormControl } from '@angular/forms';


@Component({
    selector: 'app-comission-list',
    templateUrl: './comission-list.component.html',
    styleUrls: ['./comission-list.component.scss']
})
export class ComissionListComponent implements OnInit {
    loading: boolean;
    details: any[] = [];
    months = [
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' },

    ];
    selectedMonth: number = new Date().getMonth() + 1;
    listComissions: any[] = []
    originalListComissions: any[] = [];
    employees: any = {};
    comissionDetails: any = {};
    openedModal = false;
    searchControl: UntypedFormControl = new UntypedFormControl();
    filteredComissions;
    commissionsMonth;
    constructor(
        private _comissionsService: ComissionsService,
    ) { }

    ngOnInit(): void {
        this._comissionsService.getAllComs().subscribe((res: any[]) => {
            this.listComissions = res;
            this._comissionsService.getAllEmployees().subscribe((employees: any[]) => {
                employees.forEach(employee => {
                    this.employees[employee.id_employee] = employee.name_employee;
                });
            });

            this._comissionsService.getAllComsDetail().subscribe((details: any[]) => {
                this.details = details;
                // Crear un objeto que asocie los detalles de comisión con las comisiones principales
                this.listComissions.forEach(comission => {
                    const detail = details.find(detail => detail.id_commission_detail === comission.id_commission_detail);
                    if (detail) {
                        comission.month_commission = detail.month_commission;
                        comission.commission_percentage = detail.commission_percentage;
                    }
                });
                this.originalListComissions = res;
                this.filterComissionsByMonth();
                console.log(this.originalListComissions)
            });

        });
    }
    filterComissionsByMonth() {
        const currentYear = new Date().getFullYear();
        const selectedDate = `${currentYear}-${this.selectedMonth.toString().padStart(2, '0')}-01`;
        const selectedDetail = this.details.find(detail => detail.month_commission === selectedDate);
        if (selectedDetail) {
            this.listComissions = this.originalListComissions.filter(comission => comission.id_commission_detail === selectedDetail.id_commission_detail);
        } else {
            this.listComissions = [];
        }
    }  
    filterByMonth() {
        this.filterComissionsByMonth();
    }
    paginationId: string = 'comissions-pagination';
    currentPage: number = 1;
    itemsPerPage: number = 6;
    updateListComissions() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        const totalPages = Math.ceil(this.listComissions.length / this.itemsPerPage);

        if (this.currentPage === totalPages) {
            const remainingRows = this.listComissions.length % this.itemsPerPage
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows
            }
        }
        const rowsToAdd = 6 - (endIndex % 6)
        endIndex += rowsToAdd
        this.filteredComissions = this.listComissions.slice(startIndex, endIndex)
    }
    pageChanged(event: any) {
        this.currentPage = event.page;
        this.updateListComissions();
    }
    onPageChange(event: any) {
        this.currentPage = event.offset / this.itemsPerPage + 1;
        this.updateListComissions();
    }
}
