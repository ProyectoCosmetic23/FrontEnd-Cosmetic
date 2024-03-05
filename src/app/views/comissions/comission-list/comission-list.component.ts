import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ComissionsService } from 'src/app/shared/services/comission.service';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ComissionsDetailService } from 'src/app/shared/services/comission-detail.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
//import Swal from 'sweetalert2';

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
    showLoadingScreen: boolean = false;
    paginationId: string = 'comissions-pagination';
    currentPage: number = 1;
    itemsPerPage: number = 6;
    selectedMonth: number = new Date().getMonth() + 1;
    listComissions: any[] = []
    originalListComissions: any[] = [];
    employees: any = {};
    comissionDetails: any = {};
    currentYear: number;
    allCommissions: any[] = [];
    openedModal = false;
    countLabel: number;
    searchControl: UntypedFormControl = new UntypedFormControl();
    filteredComissions: any[] = [];
    commissionsMonth;
    modalRef: NgbModalRef;
    sweetAlert: any;
    verifiedPercentage: number = 0;
    verifiedMonth: number = 0;

    constructor(
        private _comissionsService: ComissionsService,
        private formBuilder: FormBuilder,
        private _comssionDetailService: ComissionsDetailService,
        private modalService: NgbModal,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        private _authService: AuthService
    ) {
        this.formBasic = this.formBuilder.group({
            commission_percentage: [0],
        });
    }
    currentMonthYear: string;

    ngOnInit(): void {
        this._authService.validateUserPermissions("Comisiones");
        const date = new Date();
        this.currentYear = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        this.currentMonthYear = `${month}/${year}`;
        this.getComsission()

    }
    getComsission() {
        this.showLoadingScreen = true;
        this._comissionsService.getAllComs().subscribe((res: any[]) => {
            // Cargar todas las comisiones en una variable nueva
            this.allCommissions = res;

            this._comissionsService.getAllEmployees().subscribe((employees: any[]) => {
                employees.forEach(employee => {
                    this.employees[employee.id_employee] = employee.name_employee;
                });

                this._comissionsService.getAllComsDetail().subscribe((details: any[]) => {
                    // console.log('Detalles de comisiones recibidos:', details);
                    this.details = details;

                    this.listComissions = this.allCommissions

                    // Asignar detalles de comisiones a cada comisión en la lista
                    this.listComissions.forEach(comission => {
                        const detail = details.find(detail => detail.id_commission_detail === comission.id_commission_detail);
                        if (detail) {
                            comission.month_commission = detail.month_commission;
                            comission.commission_percentage = detail.commission_percentage;
                        }
                    });

                    this.originalListComissions = this.listComissions;
                    // console.log('this.selectedMonth:', this.selectedMonth);
                    // console.log('this.details:', this.details);
                    this.filterByMonth();
                    this.calculateTotalCommission();
                    // console.log(this.originalListComissions);
                });
            });
           
        });
    }

    @ViewChild(DatatableComponent)
    table: DatatableComponent;
    //  actualizar el valor visual de count según tus necesidades
    actualizarCountLabel() {
        this.countLabel = this.filteredComissions.length;
    }
    filterComissionsByMonth() {
        
        // console.log("actualizar por mes")
        const currentYear = new Date().getFullYear();
        const selectedDate = `${currentYear}-${this.selectedMonth.toString().padStart(2, '0')}-01`;
        const selectedDetail = this.details.find(detail => detail.month_commission === selectedDate);
        // console.log('selectedDate:', selectedDate);
        // console.log('selectedDetail:', selectedDetail);

        if (selectedDetail) {
            this.listComissions = this.originalListComissions.filter(comission => comission.id_commission_detail === selectedDetail.id_commission_detail);
            this.calculateTotalCommission();  // Recalcula el total cuando cambias de mes
        } else {
            this.listComissions = [];
            this.totalCommissions = 0;  // Reinicia el total a cero si no hay comisiones para el mes seleccionado
        }
    }
    calculateTotalCommission() {
        this.totalCommissions = 0;
        for (let commission of this.listComissions) {
            commission = Number(commission.total_commission)
            this.totalCommissions += commission
        }
        this.showLoadingScreen = false;
    }

    handlePerccentageSelection(event: any) {
        this.new_comissionDetail.commission_percentage = event.target.value;
        this.verifiedPercentage = event.target.value;
        // console.log(this.verifiedPercentage, " Porcentaje elegido ")
        // console.log(this.new_comissionDetail.commission_percentage)
        // console.log(this.new_comissionDetail.month_commission)
    }
    handleMonth(event: any) {
        const selectedMonth = event.target.value;
        const currentYear = new Date().getFullYear();
        this.new_comissionDetail.month_commission = `${currentYear}-${selectedMonth.toString().padStart(2, '0')}-01`;
        this.verifiedMonth = event.target.value;
        // console.log(this.verifiedMonth, " Mes elegido")
        // console.log(this.new_comissionDetail.month_commission)
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
                this.resetComissionDetail();
            },
            (error) => {
                this.loading = false;
                this.toastr.error('Ya existe un registro para este mes', 'Error', { progressBar: true });
                this.resetComissionDetail();
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

    filterByMonth() {
        // console.log("actualizar por mes")
        this.filterComissionsByMonth();
    }




    pageChanged(event: any) {
        this.currentPage = event.page;

    }
    onPageChange(event: any) {
        this.currentPage = event.offset / this.itemsPerPage + 1;

    }
    resetComissionDetail() {
        this.new_comissionDetail = {
            commission_percentage: 0,
            month_commission: "",
        };
    }
    @ViewChild('createModal', { static: true }) createModal: any;

    openModal() {
        if (!this.openedModal) {
            this.verifiedMonth = 0; // Reiniciar verifiedMonth a 0
            this.verifiedPercentage = 0; // Reiniciar verifiedPercentage a 0
            // console.log(this.verifiedMonth, this.verifiedPercentage)
            this.openedModal = true;
            this.buildProvidersForm(); // Puedes inicializar el formulario aquí si es necesario
            this.modalRef = this.modalService.open(this.createModal, { centered: true, backdrop: 'static' });

            this.modalRef.result.then(
                (result) => {
                    if (result === 'Yes') {
                        this.openedModal = false;
                        this._comssionDetailService.createDetailCom(this.new_comissionDetail).subscribe((data) => {
                            this.loading = false;
                            this.toastr.success('Porcentaje asignado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                            // console.log(data);
                            this.resetComissionDetail();
                            setTimeout(() => {

                            }, 1000);
                        }, (error) => {
                            this.loading = false;
                            if (error.error && error.error.error) {
                                this.toastr.error(error.error.error, 'Error', { progressBar: true });
                            } else {
                                this.toastr.error('Error al asignar el porcentaje.', 'Error', { progressBar: true });
                            }
                            this.resetComissionDetail();
                        });
                    } else {
                        this.resetComissionDetail();
                    }
                },
                (reason) => {
                    this.openedModal = false;
                    this.resetComissionDetail();
                }
            );
        }
    }
}