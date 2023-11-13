import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComissionsService } from 'src/app/shared/services/comission.service';
import { ToastrService } from 'ngx-toastr';

interface Comission {
  id_employee: number;
  total_commission: number;
  id_commission_detail: number;
  total_sales: number;
  month_commission: string;
  commission_percentage: number;
}

@Component({
  selector: 'app-comissions-detail',
  templateUrl: './comission-detail.component.html',
  styleUrls: ['./comission-detail.component.scss']
})
export class ComissionsDetailComponent implements OnInit {
  listEmployees: any[];
  listComisionDetail: any[];
  loadingData: boolean;
  loading: boolean;
  formBasic: FormGroup;
  totalComs: number;
  totalSales: number;
  selectedEmployee: string;
  selectedMonth: Date;
  selectedPercentage: number;
  viewMode: 'new' | 'print' = 'new';
  id: string;
  isNew: boolean;
  comission: any = {};
  new_comission: Comission = {
    id_employee: 0,
    total_commission: 0,
    id_commission_detail: 0,
    total_sales: 0,
    month_commission: '',
    commission_percentage: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _comissionsService: ComissionsService,
    private toastr: ToastrService
  ) {
    this.formBasic = this.formBuilder.group({});
  }

  ngOnInit() {
    this.loadEmployees();
    this.loadComissionDetail();
    this.id = this.route.snapshot.params['id'];
    this.isNew = !this.id;
    this.buildProvidersForm(this.comission);
    this.setViewMode();
    this.getComission();
    if (!this.isNew) {
      this.getComission();
    }
  }
  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/registrar')) {
      this.viewMode = 'new';
    } else if (currentRoute.includes('/detalle/')) {
      this.viewMode = 'print';
    }
    console.log('viewMode:', this.viewMode);
  }
  loadEmployees() {
    this._comissionsService.getAllEmployees().subscribe(
      (data) => {
        this.listEmployees = data;
        console.log('Lista de empleados cargada:', this.listEmployees);
      },
      (error) => {
        console.error('Error al obtener la lista de empleados:', error);
      }
    );
  }

  loadComissionDetail() {
    this._comissionsService.getAllComsDetail().subscribe(
      (data) => {
        this.listComisionDetail = data;
        console.log('Lista de detalles de comisiones cargada:', this.listComisionDetail);
      },
      (error) => {
        console.error('Error al obtener la lista de detalle de comisiones:', error);
      }
    );
  }

  getComission() {
    this.id = this.route.snapshot.params['id_commission'];
    console.log(this.id);
    this.loadingData = true;
    const comissionId = parseInt(this.id, 10); // Convierte this.id a un número
    this._comissionsService.getComsById(comissionId).subscribe(
      (data) => {
        this.comission = data;
        console.log(this.comission);
        if (this.comission && this.comission.comissions) {
          const idComissionDetail = this.comission.comissions.id_commission_detail;
          const idEmployee = this.comission.comissions.id_employee;
          this.totalComs = this.comission.comissions.total_commission;
          this.totalSales = this.comission.comissions.total_sales;
  
          if (this.listComisionDetail && this.listEmployees) {
            this.findComsData(idComissionDetail, idEmployee);
          } else {
            console.error('Error: Listas no definidas correctamente.');
          }
          
          console.log(idComissionDetail)
          console.log(idEmployee)
          this.loadingData = false;
        } else {
          console.error('Error: Objeto comission o comission.comissions no definidos correctamente.');
          this.loadingData = false;
        }
      },
      (error) => {
        console.error('Error al obtener comisión:', error);
      }
    );
  }


  findComsData(idComissionDetail: number, idEmployee: number) {
    console.log(idComissionDetail + " " + idEmployee + " ");

    if (!this.listComisionDetail || !this.listEmployees) {
      console.error('Error: Listas no definidas correctamente.');
      return;
    }

    const detail = this.listComisionDetail.find(detail => detail.id_commission_detail === idComissionDetail);
    const employee = this.listEmployees.find(employee => employee.id_employee === idEmployee);

    if (detail && employee) {
      this.selectedMonth = detail.month_commission;
      this.selectedPercentage = detail.commission_percentage;
      this.selectedEmployee = employee.name_employee;
    } else {
      console.error('Error: No se pudo encontrar detalle de comisión o empleado.');
      return;
    }

    console.log(this.selectedEmployee);
    console.log(this.selectedPercentage);
    console.log(this.selectedMonth);
  }

  updatedFields: any = {};

  updateCommissionPercentage() {
    console.log(this.listComisionDetail)
    let selectedId = this.formBasic.get('id_commission_detail')?.value;
    selectedId = Number(selectedId);
    const selectedCommission = this.listComisionDetail.find((commission) => commission.id_commission_detail === selectedId);
    if (selectedCommission) {
      this.formBasic.get('commission_percentage')?.setValue(selectedCommission.commission_percentage);
    } else {
      this.formBasic.get('commission_percentage')?.setValue(0);
    }
  }


  buildProvidersForm(i: any = {}) {
    this.formBasic = this.formBuilder.group({
      id: [i.id_commission],
      id_employee: [i.id_employee],
      nit_cedula: [i.nit_cedula],
      total_commission: [i.total_commission],
      id_commission_detail: [i.id_commission_detail],
      total_sales: [i.total_sales],
      month_commission: [i.month_commission],
      commission_percentage: [i.commission_percentage],
    });
  }







  handleStateSelection(event: any) {
    this.new_comission.id_employee = event.target.value;
  }

  handleNameProviderSelection(event: any) {
    this.comission.id_commission_detail = event.target.value;
    // Busca el porcentaje correspondiente en la lista de comisiones
    const selectedCommission = this.listComisionDetail.find((commission) => commission.month_commission === this.comission.month_commission);
    if (selectedCommission) {
      this.comission.commission_percentage = selectedCommission.commission_percentage;
    } else {
      this.comission.commission_percentage = 0;
    }
  }

  handleNameContactSelection(event: any) {
    this.comission.total_commission = event.target.value;
  }

  handleNitSelection(event: any) {
    this.comission.total_sales = event.target.value;
  }

  createComission() {
    const currentRoute = this.router.url;
    console.log(currentRoute);
    if (currentRoute.includes('/registrar')) {
      console.log(this.new_comission);
      this._comissionsService.createComs(this.new_comission).subscribe(
        (data) => {
          console.log(data);
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.toastr.success('Comisión creada con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
            setTimeout(() => {
              this.router.navigate(['/comisiones']);
            }, 3000);
          }, 3000);
        },
        (error) => {
          this.loading = false;
          this.toastr.error('Fallo al crear la comisión.', 'Error', { progressBar: true });
          console.error('Error al crear la comisión:', error);
        }
      );
    }
    this.loading = true;
  }

  submit() {
    if (this.viewMode === 'new') {
      this.createComission(); // Lógica de creación
    }
  }
}
