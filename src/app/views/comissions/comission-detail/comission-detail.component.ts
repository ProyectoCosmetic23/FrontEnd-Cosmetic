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
  loading: boolean;
  formBasic: FormGroup;
  viewMode: 'new' | 'print' = 'new';
  id: string;
  isNew: boolean;
  comission: Comission = {
    id_employee: 0,
    total_commission: 0,
    id_commission_detail: 0,
    total_sales: 0,
    month_commission: '',
    commission_percentage: 0,
  };
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
    this.id = this.route.snapshot.params['id'];
    this.isNew = !this.id;
    this.buildProvidersForm(this.comission);
    this.setViewMode();
    this.getComission();
    if (!this.isNew) {
      this.getComission();
    }
    this.loadEmployees();
    this.loadComissionDetail();
  }

  loadEmployees() {
    this._comissionsService.getAllEmployees().subscribe(
      (data) => {
        this.listEmployees = data;
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
      },
      (error) => {
        console.error('Error al obtener la lista de detalle de comisiones:', error);
      }
    );
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

  setViewMode() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('/registrar')) {
      this.viewMode = 'new';
    } else if (currentRoute.includes('/detalle/')) {
      this.viewMode = 'print';
    }
    console.log('viewMode:', this.viewMode);
  }

  getComission() {
    this.id = this.route.snapshot.params['id_commission'];
    console.log(this.id);
    const comissionId = parseInt(this.id, 10); // Convierte this.id a un número
    this._comissionsService.getComsById(comissionId).subscribe(
      (data) => {
        this.comission = data;
        console.log(this.comission);
      },
      (error) => {
        console.error('Error al obtener comisión:', error);
      }
    );
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
