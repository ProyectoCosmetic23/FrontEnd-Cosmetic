import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComissionsService } from 'src/app/shared/services/comission.service';
import { ToastrService } from 'ngx-toastr';
import { NgZone } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

interface Comission {
  id_employee: number;
  id_commission_detail: number;
}

@Component({
  selector: 'app-comissions-detail',
  templateUrl: './comission-detail.component.html',
  styleUrls: ['./comission-detail.component.scss']
})
export class ComissionsDetailComponent implements OnInit {
  noSales: boolean = false;
  listEmployees: any[];
  activeEmployees: any[];
  listSales: any[];
  listComisionDetail: any[];
  totalCommissions: number
  loadingData: boolean;
  loading: boolean;
  formBasic: FormGroup;
  sales: any[];
  totalComs: number;
  isReadOnly: boolean = true;
  Commission: any;
  Sales: any;
  month: string;
  commissionPercentage: number;
  totalSales: number;
  selectedEmployee: string;
  selectedMonth: Date;
  message: string = "";
  selectedPercentage: number;
  showLoadingScreen: boolean = false;
  Percentage: any;
  totalSale: number;
  viewMode: 'new' | 'print' = 'new';
  id: string;
  isNew: boolean;
  comission: any = {};
  employeeChosen: boolean = false;
  commissionChosen: boolean = false;
  new_comission: Comission = {
    id_employee: 0,
    id_commission_detail: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router,
    private _comissionsService: ComissionsService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private _authService: AuthService
  ) {
    this.formBasic = this.formBuilder.group({});
  }

  ngOnInit() {
    this._authService.validateUserPermissions("Comisiones");
    this.isNew = !this.id;
    this.loadSales();
    this.loadEmployees();
    this.loadComissionDetail();
    this.id = this.route.snapshot.params['id'];
    this.buildProvidersForm(this.comission);
    this.setViewMode();
    forkJoin({
      employees: this._comissionsService.getAllEmployees(),
      comissionDetail: this._comissionsService.getAllComsDetail(),
      sales: this._comissionsService.getAllSales()
    }).subscribe(
      (data: any) => {
        this.listEmployees = data.employees;
    
        // Aquí es donde ordenas los datos de comissionDetail
        data.comissionDetail.sort((a, b) => {
          return new Date(a.month_commission).getTime() - new Date(b.month_commission).getTime();
        });
    
        // Y luego asignas los datos ya ordenados a listComisionDetail
        this.listComisionDetail = data.comissionDetail;
    
        this.listSales = data.sales;
    
        this.buildProvidersForm(this.comission);
        this.getComission();
      },
      (error) => {
        // console.error('Error al obtener datos:', error);
      }
    );
    this.getComission();
    this.showLoadingScreen = true;
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
    // console.log('viewMode:', this.viewMode);
  }
  getComission() {
    // this.showLoadingScreen = true;
    if (this.viewMode === "print") {
      this.id = this.route.snapshot.params['id_commission'];
      // console.log(this.id);
      this.loadingData = true;
      const comissionId = parseInt(this.id, 10); // Convierte this.id a un número
      this._comissionsService.getComsById(comissionId).subscribe(
        (data) => {
          this.comission = data;
          // console.log(this.comission);
          if (this.comission && this.comission.comissions) {
            const idComissionDetail = this.comission.comissions.id_commission_detail;
            const idEmployee = this.comission.comissions.id_employee;
            this.totalComs = this.comission.comissions.total_commission;
            this.Commission = this.comission.comissions.total_commission;
            this.Commission= '$' + Number(this.Commission).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            // console.log(this.Commission);
            this.totalSales = this.comission.comissions.total_sales;
            this.Sales='$' + Number(this.totalSales).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            // console.log(this.Sales)

            if (this.listComisionDetail && this.listEmployees) {
              this.findComsData(idComissionDetail, idEmployee);
            } else {
              // console.error('Error: Listas no definidas correctamente.');
            }
            // console.log(idComissionDetail)
            // console.log(idEmployee)
            this.loadingData = false;
          } else {
            // console.error('Error: Objeto comission o comission.comissions no definidos correctamente.');
            this.loadingData = false;
          }
          
          this.showLoadingScreen = false;
        },
        (error) => {
          // console.error('Error al obtener comisión:', error);
          this.showLoadingScreen = false;
        }
      );
    }
  }
  loadEmployees() {
    this._comissionsService.getAllEmployees().subscribe(
      (data) => {
        this.listEmployees = data;
        // console.log('Lista de empleados cargada:', this.listEmployees);
  
        // Filtrar empleados activos y agregarlos a la lista activeEmployees
        this.activeEmployees = this.listEmployees.filter(employee => employee.state_employee === "Activo");
  
        // console.log('Lista de empleados activos:', this.activeEmployees);
      },
      (error) => {
        // console.error('Error al obtener la lista de  pempleados:', error);
      }
    );
  }
  
  loadComissionDetail() {
    this._comissionsService.getAllComsDetail().subscribe(
      (data) => {
        this.listComisionDetail = data;
        // console.log('Lista de detalles de comisiones cargada:', this.listComisionDetail);
      },
      (error) => {
        // console.error('Error al obtener la lista de detalle de comisiones:', error);
      }
    );
  }
  loadSales() {
    this._comissionsService.getAllSales().subscribe(
      (data) => {
        this.listSales = data;
        // console.log('Lista de ventas cargada:', this.listSales);
      },
      (error) => {
        // console.error('Error al obtener la lista de ventas:', error);
      }
    );
  }
  updateComs(){
    const detail = this.formBasic.get('id_commission_detail')?.value;
    // console.log("detalle", detail);
    let employee = this.formBasic.get('id_employee')?.value;
    // console.log("detalle empleao", employee);
    this.updateCommissionPercentage();
    if (detail === null || detail === undefined || detail === "") {
      // console.log("Falta el mes (detalle) comision")
    }
    else if(employee === null || employee === undefined || employee === ""){
      // console.log("Falta el empleado")
      this.isReadOnly = false
    }
    else{
      this.new_comission.id_employee = employee
      // console.log("new comission", this.new_comission.id_employee)
      this.new_comission.id_commission_detail = detail
      // console.log("new comission", this.new_comission.id_commission_detail)
      this.salesTotal()
      
    }
  }
  textChange(){
    // console.log("textChange")
    this.employeeChosen = true;
  }
  textComChange() {
    const selectedCommission = this.formBasic.get('id_commission_detail')?.value;

    // Verificar si la opción seleccionada es la opción predeterminada
    if (selectedCommission === null || selectedCommission === undefined || selectedCommission === "") {
        this.commissionChosen = false; // Si es la opción predeterminada, establecer commissionChosen en false para mostrar el mensaje de error
    } else {
        this.commissionChosen = true; // Si se selecciona un mes de comisión válido, establecer commissionChosen en true para ocultar el mensaje de error
    }
}
  handleEmployeeSelection(event: any) {
    this.new_comission.id_employee = event.target.value;
    
    // console.log("Id empleado: ",this.new_comission.id_employee)
  }
  handleDetailSelection(event: any) {
    this.new_comission.id_commission_detail = event.target.value;
    // console.log("Detalle comision: ", this.comission.id_commission_detail)
  }
  salesTotal() {
    const Iddetail = this.formBasic.get('id_commission_detail')?.value;
    let idEmployee = this.formBasic.get('id_employee')?.value;
    idEmployee = Number(idEmployee);
    // console.log('Iddetail:', Iddetail);
    // console.log('idEmployee:', idEmployee);
    const selectedCommission = this.listComisionDetail.find(
      (commission) => commission.id_commission_detail === parseInt(Iddetail, 10)
    );
    this.month = selectedCommission.month_commission;
    // console.log(this.month);
    this._comissionsService.getSalesByEmployeeAndMonth(idEmployee, this.month).subscribe(
      (data) => {
        this.sales = data;
        // console.log(this.sales);
        // Inicializar totalSale antes de la iteración
        this.totalSale = 0;
        // Iterar sobre los valores usando for...of
        for (let sale of this.sales) {
          // Convertir el total_sale a número antes de sumarlo
          this.totalSale += parseFloat(sale.total_order);
        }

        //Calcular el total
        this.totalCommissions = this.totalSale * (this.commissionPercentage/100);
        // console.log('Total de ventas:', this.totalSale);
        // console.log('Total de comisiones:', this.totalCommissions);
        // Actualizar el valor utilizando patchValue y NgZone
        this.ngZone.run(() => {
          this.formBasic.get('total_sales')?.patchValue("$ " + this.totalSale.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
          this.formBasic.get('total_commission')?.patchValue("$ " + this.totalCommissions.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        });
        if (this.totalSale == 0){
          this.noSales = true
          // console.log(this.noSales)
          this.message = "El empleado no realizó o no ha realizado ventas para el mes elegido"        
        }else if (this.formBasic.get('id_commission_detail').value == 1.5) {
          // console.log("Id 1.5")
          this.noSales = true
          this.formBasic.get('total_sales')?.patchValue("$ 0")
        }
        else{
          this.noSales = false;
          // console.log(this.noSales)
        }
  
        // console.log('Total de ventas:', this.totalSale);
      },
      (error) => {
        // console.error('Error al obtener la lista de empleados:', error);
      }
    );
  }
  findComsData(idComissionDetail: number, idEmployee: number) {
    // console.log(idComissionDetail + " " + idEmployee + " ");
    if (!this.listComisionDetail || !this.listEmployees) {
      console.error('Error: Listas no definidas correctamente.');
      return;
    }
    const detail = this.listComisionDetail.find(detail => detail.id_commission_detail === idComissionDetail);
    const employee = this.listEmployees.find(employee => employee.id_employee === idEmployee);
    if (detail && employee) {
      this.selectedMonth = detail.month_commission;
      this.selectedPercentage = detail.commission_percentage;
      this.Percentage = detail.commission_percentage + " %";
      this.selectedEmployee = employee.name_employee;
    } else {
      // console.error('Error: No se pudo encontrar detalle de comisión o empleado.');
      return;
    }
    // console.log("selected employee", this.selectedEmployee);
    // console.log("selected percentaje",this.selectedPercentage);
    // console.log("selected mont",this.selectedMonth);
  }
  updateCommissionPercentage() {
    let selectedId = this.formBasic.get('id_commission_detail')?.value;
    selectedId = Number(selectedId);
    const selectedCommission = this.listComisionDetail.find((commission) => commission.id_commission_detail === selectedId);
    if (selectedCommission) {
      this.commissionPercentage = selectedCommission.commission_percentage;
      // console.log(this.commissionPercentage + "Comision porcentaje")
      this.formBasic.get('commission_percentage')?.setValue(selectedCommission.commission_percentage + " %");
    } else {
      this.commissionPercentage = 0; // O el valor predeterminado que desees asignar
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



  createComission() {
    const currentRoute = this.router.url;
    // console.log(currentRoute);
    if (currentRoute.includes('/registrar')) {
      // console.log(this.new_comission);
      this._comissionsService.createComs(this.new_comission).subscribe(
        (data) => {
          // console.log(data);
          this.loading = true;
            this.loading = false;
            this.toastr.success('Comisión creada con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
            this.router.navigate(['/comisiones']);
        },
        (error) => {
          this.loading = false;
          let backendErrorMessage: string;
        
          if (error.error && error.error.error) {
            backendErrorMessage = error.error.error;
          } else {
            backendErrorMessage = error.message || error.toString();
          }
        
          this.toastr.error(backendErrorMessage, 'Error', { progressBar: true });
          // console.error("Error al crear la comisión:", error);
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
