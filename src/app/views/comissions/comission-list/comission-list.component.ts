import { Component, OnInit, ViewChild } from '@angular/core';
import { ComissionsService } from 'src/app/shared/services/comission.service';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ComissionsDetailService } from 'src/app/shared/services/comission-detail.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

interface ComissionDetail {
    commission_percentage: number;
    month_commission: string
}

@Component({
    selector: 'app-comission-list',
    templateUrl: './comission-list.component.html',
    styleUrls: ['./comission-list.component.scss']
})
export class ComissionListComponent implements OnInit {
    formBasic: FormGroup;
    comissionDetail: ComissionDetail = {
        commission_percentage: 0,
        month_commission: "",
    };
    new_comissionDetail = {
        commission_percentage: 0,
        month_commission: "",
    };
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
    totalCommissions: number;
    selectedMonth: number = new Date().getMonth() + 1;
    listComissions: any[] = []
    originalListComissions: any[] = [];
    employees: any = {};
    comissionDetails: any = {};
    currentYear: number;
    openedModal = false;
    searchControl: UntypedFormControl = new UntypedFormControl();
    filteredComissions;
    commissionsMonth;
    modalRef: NgbModalRef;
    sweetAlert: any;

    constructor(
        private _comissionsService: ComissionsService,
        private formBuilder: FormBuilder,
        private _comssionDetailService: ComissionsDetailService,
        private modalService: NgbModal,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
    ) {
        this.formBasic = this.formBuilder.group({
            commission_percentage: [0],
        });
    }
    currentMonthYear: string;

    ngOnInit(): void {
        this.sweetAlert = Swal;
        const date = new Date();
        this.currentYear = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        this.currentMonthYear = `${month}/${year}`;
        
        this._comissionsService.getAllComs().subscribe((res: any[]) => {
            this.listComissions = res;
            this._comissionsService.getAllEmployees().subscribe((employees: any[]) => {
                employees.forEach(employee => {
                    this.employees[employee.id_employee] = employee.name_employee;
                });
            });
    
            this._comissionsService.getAllComsDetail().subscribe((details: any[]) => {
                this.details = details;
                this.listComissions.forEach(comission => {
                    const detail = details.find(detail => detail.id_commission_detail === comission.id_commission_detail);
                    if (detail) {
                        comission.month_commission = detail.month_commission;
                        comission.commission_percentage = detail.commission_percentage;
                    }
                });
                this.originalListComissions = res;
                this.filterComissionsByMonth();
                this.calculateTotalCommission();  // Llamada a la función para calcular el total
                console.log(this.originalListComissions)
            });
        });
    }
    
    calculateTotalCommission() {
        this.totalCommissions = 0;
        for (let commission of this.listComissions) {
            commission = Number(commission.total_commission)
            this.totalCommissions += commission
        }
    }
    
    handlePerccentageSelection(event: any) {
        this.new_comissionDetail.commission_percentage = event.target.value;
    }
    handleMonth(event: any) {
        const selectedMonth = event.target.value;
        const currentYear = new Date().getFullYear();
        this.new_comissionDetail.month_commission = `${currentYear}-${selectedMonth.toString().padStart(2, '0')}-01`;
        console.log(this.new_comissionDetail.month_commission)
    }
    createComissionDetail() {
        this._comssionDetailService.createDetailCom(this.new_comissionDetail).subscribe(
            (data) => {
                console.log(data);
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.toastr.success('Detalle comisión creado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
                    setTimeout(() => {
                        this.router.navigate(['/comisiones']);
                    }, 3000);
                }, 3000);
            },
            (error) => {
                this.loading = false;
                this.toastr.error('Ya existe un registro para este mes', 'Error', { progressBar: true });
                console.error('Ya existe un registro para este ', error);
            }
        );
    }
    submit() {
        const formData = this.formBasic.value;
        this.new_comissionDetail.commission_percentage = formData.commission_percentage;
        this.createComissionDetail();
        this.modalRef.close('Yes'); // Cierra el modal después de enviar el formulario
    }
    buildProvidersForm(i: any = {}) {
        this.formBasic = this.formBuilder.group({
            commission_percentage: [i.commission_percentage || 0],
        });
    }

    filterComissionsByMonth() {
        const currentYear = new Date().getFullYear();
        const selectedDate = `${currentYear}-${this.selectedMonth.toString().padStart(2, '0')}-01`;
        const selectedDetail = this.details.find(detail => detail.month_commission === selectedDate);
        
        if (selectedDetail) {
            this.listComissions = this.originalListComissions.filter(comission => comission.id_commission_detail === selectedDetail.id_commission_detail);
            this.calculateTotalCommission();  // Recalcula el total cuando cambias de mes
        } else {
            this.listComissions = [];
            this.totalCommissions = 0;  // Reinicia el total a cero si no hay comisiones para el mes seleccionado
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

    @ViewChild('createModal', { static: true }) createModal: any;


    openModal() {
        if (!this.openedModal) {
          this.openedModal = true;
          this.buildProvidersForm(); // Puedes inicializar el formulario aquí si es necesario
          this.modalRef = this.modalService.open(this.createModal, { centered: true });
      
          this.modalRef.result.then(
            (result) => {
              if (result === 'Yes') {
                // Mostrar confirmación antes de enviar
                const sweetAlertResult = this.sweetAlert.fire({
                    title: '¿Está seguro que desea asignar este porcentaje?',
                    text: 'Recuerde que no lo podrá editar después.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                    customClass: {
                      confirmButton: 'btn btn-wide btn-primary btn-rounded',
                      cancelButton: 'btn btn-outline-secondary btn-rounded'
                    }
                  });
                sweetAlertResult.then((result) => {
                  if (result.value) {
                    this.openedModal = false;
                    this._comssionDetailService.createDetailCom(this.new_comissionDetail).subscribe((data) => {
                      this.loading = false;
                      this.toastr.success('Porcentaje asignado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                      console.log(data);
      
                      setTimeout(() => {
                        location.reload();
                      }, 2000);
                    }, (error) => {
                      this.loading = false;
                      this.toastr.error('Error al asignar el porcentaje.', 'Error', { progressBar: true, timeOut: 2000 });
                    });
                  }
                  this.openedModal = false;
                });
              }
            },
            (reason) => {
              this.openedModal = false;
            }
          );
        }
      }
}