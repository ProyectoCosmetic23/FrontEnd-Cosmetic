import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComissionsService } from 'src/app/shared/services/comission.service';
import { ToastrService } from 'ngx-toastr';
import { NgZone } from '@angular/core';

interface Comission {
  id_employee: number;
  id_commission_detail: number;
  // total_commission: number;
  // total_sales: number;
  // month_commission: string;
  // commission_percentage: number;

}

@Component({
  selector: 'app-comissions-detail',
  templateUrl: './comission-detail.component.html',
  styleUrls: ['./comission-detail.component.scss']
})
export class ComissionsDetailComponent implements OnInit {
  listEmployees: any[];
  listSales: any[];
  listComisionDetail: any[];
  totalCommissions: number
  loadingData: boolean;
  loading: boolean;
  formBasic: FormGroup;
  sales: any[];
  totalComs: number;
  month: string;
  commissionPercentage: number;
  totalSales: number;
  selectedEmployee: string;
  selectedMonth: Date;
  selectedPercentage: number;
  totalSale: number;
  viewMode: 'new' | 'print' = 'new';
  id: string;
  isNew: boolean;
  comission: any = {};
  new_comission: Comission = {
    id_employee: 0,
    id_commission_detail: 0,
    // total_commission: 0,
    // total_sales: 0,
    // month_commission: '',
    // commission_percentage: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router,
    private _comissionsService: ComissionsService,
    private toastr: ToastrService
  ) {
    this.formBasic = this.formBuilder.group({});
  }

  ngOnInit() {
    this.isNew = !this.id;
    this.loadSales();
    this.loadEmployees();
    this.loadComissionDetail();
    this.id = this.route.snapshot.params['id'];
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
  loadSales() {
    this._comissionsService.getAllSales().subscribe(
      (data) => {
        this.listSales = data;
        console.log('Lista de ventas cargada:', this.listSales);
      },
      (error) => {
        console.error('Error al obtener la lista de ventas:', error);
      }
    );
  }

  updateComs(){
    const detail = this.formBasic.get('id_commission_detail')?.value;
    let employee = this.formBasic.get('id_employee')?.value;
    this.updateCommissionPercentage();
    if (detail === null || detail === undefined || detail === "") {
      console.log("Falta el mes (detalle) comision")
    }
    else if(employee === null || employee === undefined || employee === ""){
      console.log("Falta el empleado")
    }
    else{
      this.salesTotal()
      this.handleEmployeeSelection(event)
      this.handleDetailSelection(event)
    }
  }
  handleEmployeeSelection(event: any) {
    this.new_comission.id_employee = event.target.value;
    console.log("Id empleado: ",this.new_comission.id_employee)
  }
  handleDetailSelection(event: any) {
    this.new_comission.id_commission_detail = event.target.value;
    console.log("Detalle comision: ", this.comission.id_commission_detail)
  }
  salesTotal() {
    const Iddetail = this.formBasic.get('id_commission_detail')?.value;
    let idEmployee = this.formBasic.get('id_employee')?.value;
    idEmployee = Number(idEmployee);
    console.log('Iddetail:', Iddetail);
    console.log('idEmployee:', idEmployee);
    const selectedCommission = this.listComisionDetail.find(
      (commission) => commission.id_commission_detail === parseInt(Iddetail, 10)
    );
    this.month = selectedCommission.month_commission;
    console.log(this.month);
  
    this._comissionsService.getSalesByEmployeeAndMonth(idEmployee, this.month).subscribe(
      (data) => {
        this.sales = data;
        console.log(this.sales);
  
        // Inicializar totalSale antes de la iteración
        this.totalSale = 0;
  
        // Iterar sobre los valores usando for...of
        for (let sale of this.sales) {
          // Convertir el total_sale a número antes de sumarlo
          this.totalSale += parseFloat(sale.total_sale);
        }
        //Calcular el total
        this.totalCommissions = this.totalSale * (this.commissionPercentage/100);
        console.log('Total de ventas:', this.totalSale);
        console.log('Total de comisiones:', this.totalCommissions);
      
        // Actualizar el valor utilizando patchValue y NgZone
        this.ngZone.run(() => {
          this.formBasic.get('total_sales')?.patchValue(this.totalSale);
          this.formBasic.get('total_commission')?.patchValue(this.totalCommissions);
        });
  
        console.log('Total de ventas:', this.totalSale);
      },
      (error) => {
        console.error('Error al obtener la lista de empleados:', error);
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

  updateCommissionPercentage() {
    let selectedId = this.formBasic.get('id_commission_detail')?.value;
    selectedId = Number(selectedId);
    const selectedCommission = this.listComisionDetail.find((commission) => commission.id_commission_detail === selectedId);
    if (selectedCommission) {
      this.commissionPercentage = selectedCommission.commission_percentage
      console.log(this.commissionPercentage)
      this.formBasic.get('commission_percentage')?.setValue(selectedCommission.commission_percentage);
    } else {
      this.formBasic.get('commission_percentage')?.setValue(0);
    }
  }
  buildProvidersForm(i: any = {}) {
    this.formBasic = this.formBuilder.group({
      id: [i.id_commission],
      id_employee: [i.id_employee],
      id_commission_detail: [i.id_commission_detail],
      total_sales: [i.total_sales],
      month_commission: [i.month_commission],
      nit_cedula: [i.nit_cedula],
      total_commission: [i.total_commission],
      commission_percentage: [i.commission_percentage],
    });
  }

  // handleNameProviderSelection(event: any) {
  //   this.comission.id_commission_detail = event.target.value;
  //   // Busca el porcentaje correspondiente en la lista de comisiones
  //   const selectedCommission = this.listComisionDetail.find((commission) => commission.month_commission === this.comission.month_commission);
  //   if (selectedCommission) {
  //     this.comission.commission_percentage = selectedCommission.commission_percentage;
  //   } else {
  //     this.comission.commission_percentage = 0;
  //   }
  // }



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
  getComission() {
    if (this.viewMode === "print") {
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

  }

  submit() {
    if (this.viewMode === 'new') {
      this.createComission(); // Lógica de creación
    }
  }
}
