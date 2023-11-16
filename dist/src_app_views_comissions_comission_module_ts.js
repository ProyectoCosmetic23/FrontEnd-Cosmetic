"use strict";
(self["webpackChunkgull"] = self["webpackChunkgull"] || []).push([["src_app_views_comissions_comission_module_ts"],{

/***/ 63431:
/*!******************************************************!*\
  !*** ./src/app/shared/services/comission.service.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComissionsService": () => (/* binding */ ComissionsService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 58987);


class ComissionsService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'https://api-cosmetic-w32d.onrender.com/commissions';
        this.url2 = 'https://api-cosmetic-w32d.onrender.com/detailComs';
        this.url3 = 'https://api-cosmetic-w32d.onrender.com/api/employees';
        this.url4 = 'https://api-cosmetic-w32d.onrender.com/api/sales';
    }
    getSalesByEmployeeAndMonth(idEmployee, month) {
        const url = `${this.baseUrl}/sales/${idEmployee}/${month}`;
        return this.http.get(url);
    }
    getAllEmployees() {
        return this.http.get(this.url3);
    }
    getAllSales() {
        return this.http.get(this.url4);
    }
    getComsById(comsId) {
        return this.http.get(`${this.baseUrl}/${comsId}`);
    }
    getAllComsDetail() {
        return this.http.get(this.url2);
    }
    createComs(comisionData) {
        return this.http.post(this.baseUrl, comisionData);
    }
    getAllComs() {
        return this.http.get(this.baseUrl);
    }
    getComsEmploy(employeID) {
        return this.http.get(`${this.baseUrl}/employee/${employeID}`);
    }
    getComissionDetailById(idComissionDetail) {
        return this.http.get(`${this.baseUrl}/detail/${idComissionDetail}`);
    }
}
ComissionsService.ɵfac = function ComissionsService_Factory(t) { return new (t || ComissionsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient)); };
ComissionsService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ComissionsService, factory: ComissionsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 17416:
/*!*********************************************************************************!*\
  !*** ./src/app/views/comissions/comission-detail/comission-detail.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComissionsDetailComponent": () => (/* binding */ ComissionsDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_shared_services_comission_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/comission.service */ 63431);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/components/btn-loading/btn-loading.component */ 38845);







function ComissionsDetailComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Comision");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ComissionsDetailComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Ver Detalle de la Comision");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ComissionsDetailComponent_li_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Comision");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ComissionsDetailComponent_li_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Ver Detalle de la Comision");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ComissionsDetailComponent_div_20_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const employee_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", employee_r10.id_employee);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", employee_r10.name_employee, "");
} }
function ComissionsDetailComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "select", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ComissionsDetailComponent_div_20_Template_select_change_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r11.salesTotal()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Elija el empleado");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ComissionsDetailComponent_div_20_option_4_Template, 2, 2, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r4.listEmployees);
} }
const _c0 = function (a0) { return { "placeholder-black": a0 }; };
function ComissionsDetailComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("readonly", true)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c0, ctx_r5.viewMode === "print"))("value", ctx_r5.selectedEmployee);
} }
function ComissionsDetailComponent_div_25_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const detail_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", detail_r14.id_commission_detail);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](2, 2, detail_r14.month_commission, "yyyy-MM"), "");
} }
function ComissionsDetailComponent_div_25_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "select", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ComissionsDetailComponent_div_25_Template_select_change_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r15.updateCommissionPercentage()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "option", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Elija el mes de la comisi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ComissionsDetailComponent_div_25_option_4_Template, 3, 5, "option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r6.listComisionDetail);
} }
function ComissionsDetailComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("readonly", true)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c0, ctx_r7.viewMode === "print"))("value", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](2, 3, ctx_r7.selectedMonth, "yyyy-MM"));
} }
function ComissionsDetailComponent_btn_loading_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "btn-loading", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Comisi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("loading", ctx_r8.loading);
} }
const _c1 = function () { return ["/comisiones"]; };
class ComissionsDetailComponent {
    constructor(formBuilder, route, ngZone, router, _comissionsService, toastr) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.ngZone = ngZone;
        this.router = router;
        this._comissionsService = _comissionsService;
        this.toastr = toastr;
        this.viewMode = 'new';
        this.comission = {};
        this.new_comission = {
            id_employee: 0,
            total_commission: 0,
            id_commission_detail: 0,
            total_sales: 0,
            month_commission: '',
            commission_percentage: 0,
        };
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
        }
        else if (currentRoute.includes('/detalle/')) {
            this.viewMode = 'print';
        }
        console.log('viewMode:', this.viewMode);
    }
    loadEmployees() {
        this._comissionsService.getAllEmployees().subscribe((data) => {
            this.listEmployees = data;
            console.log('Lista de empleados cargada:', this.listEmployees);
        }, (error) => {
            console.error('Error al obtener la lista de empleados:', error);
        });
    }
    loadComissionDetail() {
        this._comissionsService.getAllComsDetail().subscribe((data) => {
            this.listComisionDetail = data;
            console.log('Lista de detalles de comisiones cargada:', this.listComisionDetail);
        }, (error) => {
            console.error('Error al obtener la lista de detalle de comisiones:', error);
        });
    }
    loadSales() {
        this._comissionsService.getAllSales().subscribe((data) => {
            this.listSales = data;
            console.log('Lista de ventas cargada:', this.listSales);
        }, (error) => {
            console.error('Error al obtener la lista de ventas:', error);
        });
    }
    salesTotal() {
        const Iddetail = this.formBasic.get('id_commission_detail')?.value;
        let idEmployee = this.formBasic.get('id_employee')?.value;
        idEmployee = Number(idEmployee);
        console.log('Iddetail:', Iddetail);
        console.log('idEmployee:', idEmployee);
        const selectedCommission = this.listComisionDetail.find((commission) => commission.id_commission_detail === parseInt(Iddetail, 10));
        this.month = selectedCommission.month_commission;
        console.log(this.month);
        this._comissionsService.getSalesByEmployeeAndMonth(idEmployee, this.month).subscribe((data) => {
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
            this.totalCommissions = this.totalSale * (this.commissionPercentage / 100);
            console.log('Total de ventas:', this.totalSale);
            console.log('Total de comisiones:', this.totalCommissions);
            // Actualizar el valor utilizando patchValue y NgZone
            this.ngZone.run(() => {
                this.formBasic.get('total_sales')?.patchValue(this.totalSale);
                this.formBasic.get('total_commission')?.patchValue(this.totalCommissions);
            });
            console.log('Total de ventas:', this.totalSale);
        }, (error) => {
            console.error('Error al obtener la lista de empleados:', error);
        });
    }
    findComsData(idComissionDetail, idEmployee) {
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
        }
        else {
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
            this.commissionPercentage = selectedCommission.commission_percentage;
            console.log(this.commissionPercentage);
            this.formBasic.get('commission_percentage')?.setValue(selectedCommission.commission_percentage);
        }
        else {
            this.formBasic.get('commission_percentage')?.setValue(0);
        }
    }
    buildProvidersForm(i = {}) {
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
    handleStateSelection(event) {
        this.new_comission.id_employee = event.target.value;
    }
    handleNameProviderSelection(event) {
        this.comission.id_commission_detail = event.target.value;
        // Busca el porcentaje correspondiente en la lista de comisiones
        const selectedCommission = this.listComisionDetail.find((commission) => commission.month_commission === this.comission.month_commission);
        if (selectedCommission) {
            this.comission.commission_percentage = selectedCommission.commission_percentage;
        }
        else {
            this.comission.commission_percentage = 0;
        }
    }
    handleNameContactSelection(event) {
        this.comission.total_commission = event.target.value;
    }
    handleNitSelection(event) {
        this.comission.total_sales = event.target.value;
    }
    createComission() {
        const currentRoute = this.router.url;
        console.log(currentRoute);
        if (currentRoute.includes('/registrar')) {
            console.log(this.new_comission);
            this._comissionsService.createComs(this.new_comission).subscribe((data) => {
                console.log(data);
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.toastr.success('Comisión creada con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
                    setTimeout(() => {
                        this.router.navigate(['/comisiones']);
                    }, 3000);
                }, 3000);
            }, (error) => {
                this.loading = false;
                this.toastr.error('Fallo al crear la comisión.', 'Error', { progressBar: true });
                console.error('Error al crear la comisión:', error);
            });
        }
        this.loading = true;
    }
    getComission() {
        if (this.viewMode === "print") {
            this.id = this.route.snapshot.params['id_commission'];
            console.log(this.id);
            this.loadingData = true;
            const comissionId = parseInt(this.id, 10); // Convierte this.id a un número
            this._comissionsService.getComsById(comissionId).subscribe((data) => {
                this.comission = data;
                console.log(this.comission);
                if (this.comission && this.comission.comissions) {
                    const idComissionDetail = this.comission.comissions.id_commission_detail;
                    const idEmployee = this.comission.comissions.id_employee;
                    this.totalComs = this.comission.comissions.total_commission;
                    this.totalSales = this.comission.comissions.total_sales;
                    if (this.listComisionDetail && this.listEmployees) {
                        this.findComsData(idComissionDetail, idEmployee);
                    }
                    else {
                        console.error('Error: Listas no definidas correctamente.');
                    }
                    console.log(idComissionDetail);
                    console.log(idEmployee);
                    this.loadingData = false;
                }
                else {
                    console.error('Error: Objeto comission o comission.comissions no definidos correctamente.');
                    this.loadingData = false;
                }
            }, (error) => {
                console.error('Error al obtener comisión:', error);
            });
        }
    }
    submit() {
        if (this.viewMode === 'new') {
            this.createComission(); // Lógica de creación
        }
    }
}
ComissionsDetailComponent.ɵfac = function ComissionsDetailComponent_Factory(t) { return new (t || ComissionsDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_shared_services_comission_service__WEBPACK_IMPORTED_MODULE_0__.ComissionsService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__.ToastrService)); };
ComissionsDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ComissionsDetailComponent, selectors: [["app-comissions-detail"]], decls: 45, vars: 29, consts: [[1, "breadcrumb"], [4, "ngIf"], [3, "routerLink"], [1, "row"], [1, "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title", "mb-3"], [3, "formGroup", "ngSubmit"], [1, "col-md-6", "form-group", "mb-3"], ["for", "id_employee"], ["for", "id_comission_detail"], ["for", "total_commission"], ["type", "text", "id", "total_commission", "formControlName", "total_commission", 1, "form-control", 3, "placeholder", "readonly", "ngClass"], ["for", "commission_percentage"], ["id", "commission_percentage", "formControlName", "commission_percentage", 1, "form-control", 3, "readonly", "placeholder", "ngClass"], ["for", "total_sales"], ["id", "total_sales", "formControlName", "total_sales", 1, "form-control", 3, "readonly", "ngClass", "placeholder"], [1, "d-flex", "justify-content-end"], [1, "btn", "btn-danger", "float-right", 3, "routerLink"], [2, "width", "10px"], ["btnClass", "btn-primary", 3, "loading", 4, "ngIf"], ["id", "id_employee", "formControlName", "id_employee", 1, "form-control", 3, "change"], ["value", "", "disabled", "", "selected", ""], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], ["type", "text", 1, "form-control", 3, "readonly", "ngClass", "value"], ["id", "id_comission_detail", "formControlName", "id_commission_detail", 1, "form-control", 3, "change"], ["btnClass", "btn-primary", 3, "loading"]], template: function ComissionsDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ComissionsDetailComponent_h1_1_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ComissionsDetailComponent_h1_2_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "ul")(4, "li")(5, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Comisiones");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, ComissionsDetailComponent_li_7_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, ComissionsDetailComponent_li_8_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 3)(10, "div", 4)(11, "div", 5)(12, "div", 6)(13, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Formulario de Comisiones");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "form", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function ComissionsDetailComponent_Template_form_ngSubmit_15_listener() { return ctx.submit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 3)(17, "div", 9)(18, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Empleado");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](20, ComissionsDetailComponent_div_20_Template, 5, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, ComissionsDetailComponent_div_21_Template, 2, 5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 9)(23, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "Mes comisi\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](25, ComissionsDetailComponent_div_25_Template, 5, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](26, ComissionsDetailComponent_div_26_Template, 3, 8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 9)(28, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, "Total comisi\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](30, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "div", 9)(32, "label", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "Porcentaje de comisi\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](34, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 9)(36, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "Total ventas");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](38, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "div", 4)(40, "div", 18)(41, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42, "Volver");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](43, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](44, ComissionsDetailComponent_btn_loading_44_Template, 2, 1, "btn-loading", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](21, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.formBasic);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", ctx.totalComs || "Total Comisi\u00F3n")("readonly", ctx.viewMode === "print")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](22, _c0, ctx.viewMode === "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("readonly", ctx.viewMode === "print")("placeholder", ctx.selectedPercentage || "Porcentaje")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](24, _c0, ctx.viewMode === "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("readonly", ctx.viewMode === "print")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](26, _c0, ctx.viewMode === "print"))("placeholder", ctx.totalSales || "Total ventas");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](28, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_1__.BtnLoadingComponent, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe], styles: [".placeholder-black[_ngcontent-%COMP%]::-moz-placeholder {\n  color: black;\n}\n\n.placeholder-black[_ngcontent-%COMP%]::placeholder {\n  color: black;\n}\n\n.gray-text[_ngcontent-%COMP%] {\n  color: rgb(200, 200, 200);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbWlzc2lvbi1kZXRhaWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0FBQ0o7O0FBRkE7RUFDSSxZQUFBO0FBQ0o7O0FBRUE7RUFDSSx5QkFBQTtBQUNKIiwiZmlsZSI6ImNvbWlzc2lvbi1kZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGxhY2Vob2xkZXItYmxhY2s6OnBsYWNlaG9sZGVyIHtcclxuICAgIGNvbG9yOiBibGFjaztcclxufVxyXG5cclxuLmdyYXktdGV4dCB7XHJcbiAgICBjb2xvcjogcmdiKDIwMCwgMjAwLCAyMDApO1xyXG59Il19 */"] });


/***/ }),

/***/ 53093:
/*!*****************************************************************************!*\
  !*** ./src/app/views/comissions/comission-list/comission-list.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComissionListComponent": () => (/* binding */ ComissionListComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_services_comission_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/comission.service */ 63431);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-pagination */ 75595);








function ComissionListComponent_option_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "option", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const month_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", month_r15.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](month_r15.label);
} }
function ComissionListComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Empleado ");
} }
function ComissionListComponent_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r17 = ctx.row;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r2.employees[row_r17.id_employee], " ");
} }
function ComissionListComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Total Comisi\u00F3n ");
} }
function ComissionListComponent_ng_template_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", row_r19.total_commission, " ");
} }
function ComissionListComponent_ng_template_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Total Ventas ");
} }
function ComissionListComponent_ng_template_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r21 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", row_r21.total_sales, " ");
} }
function ComissionListComponent_ng_template_41_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Mes Comisi\u00F3n ");
} }
function ComissionListComponent_ng_template_42_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r23 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", row_r23.month_commission, " ");
} }
function ComissionListComponent_ng_template_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Porcentaje Comisi\u00F3n ");
} }
function ComissionListComponent_ng_template_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r25 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", row_r25.commission_percentage, " ");
} }
function ComissionListComponent_ng_template_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Acciones ");
} }
const _c0 = function (a1) { return ["/comisiones/detalle", a1]; };
function ComissionListComponent_ng_template_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r27 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](1, _c0, row_r27.id_commission));
} }
function ComissionListComponent_ng_template_50_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 31)(1, "h4", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Cambiar Estado del Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ComissionListComponent_ng_template_50_Template_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r30); const modal_r28 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](modal_r28.dismiss("Cross click")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 35)(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "\u00BFEst\u00E1 seguro de que desea inhabilitar este proveedor?");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 36)(11, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ComissionListComponent_ng_template_50_Template_button_click_11_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r30); const modal_r28 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](modal_r28.dismiss("cancel")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ComissionListComponent_ng_template_50_Template_button_click_13_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r30); const modal_r28 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](modal_r28.close("Yes")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Aceptar");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} }
const _c1 = function () { return ["/comisiones/registrar"]; };
const _c2 = function () { return ["/detalleComs/registrar"]; };
class ComissionListComponent {
    constructor(_comissionsService) {
        this._comissionsService = _comissionsService;
        this.details = [];
        this.months = [
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
        this.selectedMonth = new Date().getMonth() + 1;
        this.listComissions = [];
        this.originalListComissions = [];
        this.employees = {};
        this.comissionDetails = {};
        this.openedModal = false;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.UntypedFormControl();
        this.paginationId = 'comissions-pagination';
        this.currentPage = 1;
        this.itemsPerPage = 6;
    }
    ngOnInit() {
        this._comissionsService.getAllComs().subscribe((res) => {
            this.listComissions = res;
            this._comissionsService.getAllEmployees().subscribe((employees) => {
                employees.forEach(employee => {
                    this.employees[employee.id_employee] = employee.name_employee;
                });
            });
            this._comissionsService.getAllComsDetail().subscribe((details) => {
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
                console.log(this.originalListComissions);
            });
        });
    }
    filterComissionsByMonth() {
        const currentYear = new Date().getFullYear();
        const selectedDate = `${currentYear}-${this.selectedMonth.toString().padStart(2, '0')}-01`;
        const selectedDetail = this.details.find(detail => detail.month_commission === selectedDate);
        if (selectedDetail) {
            this.listComissions = this.originalListComissions.filter(comission => comission.id_commission_detail === selectedDetail.id_commission_detail);
        }
        else {
            this.listComissions = [];
        }
    }
    filterByMonth() {
        this.filterComissionsByMonth();
    }
    updateListComissions() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        const totalPages = Math.ceil(this.listComissions.length / this.itemsPerPage);
        if (this.currentPage === totalPages) {
            const remainingRows = this.listComissions.length % this.itemsPerPage;
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows;
            }
        }
        const rowsToAdd = 6 - (endIndex % 6);
        endIndex += rowsToAdd;
        this.filteredComissions = this.listComissions.slice(startIndex, endIndex);
    }
    pageChanged(event) {
        this.currentPage = event.page;
        this.updateListComissions();
    }
    onPageChange(event) {
        this.currentPage = event.offset / this.itemsPerPage + 1;
        this.updateListComissions();
    }
}
ComissionListComponent.ɵfac = function ComissionListComponent_Factory(t) { return new (t || ComissionListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_shared_services_comission_service__WEBPACK_IMPORTED_MODULE_0__.ComissionsService)); };
ComissionListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ComissionListComponent, selectors: [["app-comission-list"]], decls: 52, vars: 18, consts: [[1, "breadcrumb"], ["href", ""], [1, "separator-breadcrumb", "border-top"], [1, "row", "mb-3"], [1, "col-md-12", "mb-3"], [1, "row"], [1, "col-md-6"], [1, "col-md-4"], [1, "btn", "btn-primary", "float-right", 3, "routerLink"], [1, "col-md-5"], [1, "col-md-3"], [1, "form-select", 3, "ngModel", "ngModelChange", "change"], [3, "value", 4, "ngFor", "ngForOf"], [1, "col-md-6", "d-flex", "justify-content-end"], ["_ngcontent-vet-c167", "", "id", "email", "placeholder", "Buscar Comisiones", "type", "text", "ng-reflect-form", "[object Object]", 1, "form-control", "ng-valid", "ng-touched", "ng-dirty", 2, "width", "50%"], [1, "col-md-12"], [1, "card", "o-hidden"], [1, "material", "fullscreen", 2, "height", "460px", 3, "columnMode", "headerHeight", "footerHeight", "rowHeight", "scrollbarV", "rows", "externalPaging", "count", "limit", "offset", "page"], ["name", "id_employee"], ["ngx-datatable-header-template", ""], ["ngx-datatable-cell-template", ""], ["name", "total_commission"], ["name", "total_sales"], ["name", "month_commission"], ["name", "commission_percentage"], [3, "width"], [3, "id", "pageChange"], ["changeStateModal", ""], [3, "value"], [1, "btn", "btn-dark", "m-1", "me-3", 3, "routerLink"], [1, "i-Eye"], [1, "modal-header"], ["id", "modal-title", 1, "Cambiar", "estado"], ["type", "button", "aria-label", "Close button", "aria-describedby", "modal-title", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-outline-secondary", "btn-rounded", 3, "click"], ["type", "button", "ngbAutofocus", "", 1, "btn", "btn-wide", "btn-danger", "btn-rounded", 3, "click"]], template: function ComissionListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "CosmeTic");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "ul")(4, "li")(5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Servicios");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Comisiones");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 3)(11, "div", 4)(12, "div", 5)(13, "div", 6)(14, "div", 5)(15, "div", 7)(16, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Crear nueva comisi\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 9)(19, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "Crear nuevo detalle de comisi\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div", 10)(22, "select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngModelChange", function ComissionListComponent_Template_select_ngModelChange_22_listener($event) { return ctx.selectedMonth = $event; })("change", function ComissionListComponent_Template_select_change_22_listener() { return ctx.filterByMonth(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, ComissionListComponent_option_23_Template, 2, 2, "option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](25, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "div", 15)(27, "div", 16)(28, "div", 15)(29, "div", 16)(30, "ngx-datatable", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("page", function ComissionListComponent_Template_ngx_datatable_page_30_listener($event) { return ctx.onPageChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "ngx-datatable-column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](32, ComissionListComponent_ng_template_32_Template, 1, 0, "ng-template", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](33, ComissionListComponent_ng_template_33_Template, 1, 1, "ng-template", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "ngx-datatable-column", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](35, ComissionListComponent_ng_template_35_Template, 1, 0, "ng-template", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](36, ComissionListComponent_ng_template_36_Template, 1, 1, "ng-template", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "ngx-datatable-column", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](38, ComissionListComponent_ng_template_38_Template, 1, 0, "ng-template", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](39, ComissionListComponent_ng_template_39_Template, 1, 1, "ng-template", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "ngx-datatable-column", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](41, ComissionListComponent_ng_template_41_Template, 1, 0, "ng-template", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](42, ComissionListComponent_ng_template_42_Template, 1, 1, "ng-template", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "ngx-datatable-column", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](44, ComissionListComponent_ng_template_44_Template, 1, 0, "ng-template", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](45, ComissionListComponent_ng_template_45_Template, 1, 1, "ng-template", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "ngx-datatable-column", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](47, ComissionListComponent_ng_template_47_Template, 1, 0, "ng-template", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](48, ComissionListComponent_ng_template_48_Template, 2, 3, "ng-template", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "pagination-template", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("pageChange", function ComissionListComponent_Template_pagination_template_pageChange_49_listener($event) { return ctx.pageChanged($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](50, ComissionListComponent_ng_template_50_Template, 15, 0, "ng-template", null, 27, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](16, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](17, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngModel", ctx.selectedMonth);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.months);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("columnMode", "force")("headerHeight", 50)("footerHeight", 50)("rowHeight", 60)("scrollbarV", true)("rows", ctx.listComissions)("externalPaging", true)("count", ctx.listComissions.length)("limit", ctx.itemsPerPage)("offset", (ctx.currentPage - 1) * ctx.itemsPerPage);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("width", 120);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx.paginationId);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DatatableComponent, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DataTableColumnDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DataTableColumnHeaderDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DataTableColumnCellDirective, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, ngx_pagination__WEBPACK_IMPORTED_MODULE_1__.PaginationControlsDirective], styles: [".datatable-pager[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.datatable-pager[_ngcontent-%COMP%]   .pager-previous[_ngcontent-%COMP%], .datatable-pager[_ngcontent-%COMP%]   .pager-next[_ngcontent-%COMP%] {\n  display: none; \n}\n\n.datatable-pager[_ngcontent-%COMP%]   .pager-current[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbWlzc2lvbi1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFDSjs7QUFFRTtFQUNFLGFBQUEsRUFBQSwyQ0FBQTtBQUNKOztBQUVFO0VBQ0UsY0FBQTtBQUNKIiwiZmlsZSI6ImNvbWlzc2lvbi1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRhdGF0YWJsZS1wYWdlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuICBcclxuICAuZGF0YXRhYmxlLXBhZ2VyIC5wYWdlci1wcmV2aW91cywgLmRhdGF0YWJsZS1wYWdlciAucGFnZXItbmV4dCB7XHJcbiAgICBkaXNwbGF5OiBub25lOyAvKiBPY3VsdGEgbG9zIGJvdG9uZXMgXCJwcmV2aW91c1wiIHkgXCJuZXh0XCIgKi9cclxuICB9XHJcbiAgXHJcbiAgLmRhdGF0YWJsZS1wYWdlciAucGFnZXItY3VycmVudCB7XHJcbiAgICBtYXJnaW46IDAgMTBweDtcclxuICB9Il19 */"] });


/***/ }),

/***/ 22992:
/*!**************************************************************!*\
  !*** ./src/app/views/comissions/comission-routing.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComissionRoutingModule": () => (/* binding */ ComissionRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _comission_detail_comission_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comission-detail/comission-detail.component */ 17416);
/* harmony import */ var _comission_list_comission_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comission-list/comission-list.component */ 53093);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);





const routes = [
    {
        path: '',
        component: _comission_list_comission_list_component__WEBPACK_IMPORTED_MODULE_1__.ComissionListComponent
    },
    {
        path: 'registrar',
        component: _comission_detail_comission_detail_component__WEBPACK_IMPORTED_MODULE_0__.ComissionsDetailComponent
    },
    {
        path: 'detalle/:id_commission',
        component: _comission_detail_comission_detail_component__WEBPACK_IMPORTED_MODULE_0__.ComissionsDetailComponent
    }
];
class ComissionRoutingModule {
}
ComissionRoutingModule.ɵfac = function ComissionRoutingModule_Factory(t) { return new (t || ComissionRoutingModule)(); };
ComissionRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ComissionRoutingModule });
ComissionRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ComissionRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 20896:
/*!******************************************************!*\
  !*** ./src/app/views/comissions/comission.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComissionModule": () => (/* binding */ ComissionModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/components/shared-components.module */ 50933);
/* harmony import */ var _comission_detail_comission_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comission-detail/comission-detail.component */ 17416);
/* harmony import */ var _comission_list_comission_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comission-list/comission-list.component */ 53093);
/* harmony import */ var _comission_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./comission-routing.module */ 22992);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ 75595);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);








// Importa NgxPaginationModule


class ComissionModule {
}
ComissionModule.ɵfac = function ComissionModule_Factory(t) { return new (t || ComissionModule)(); };
ComissionModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: ComissionModule });
ComissionModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__.NgbModule,
        _comission_routing_module__WEBPACK_IMPORTED_MODULE_3__.ComissionRoutingModule,
        ngx_pagination__WEBPACK_IMPORTED_MODULE_4__.NgxPaginationModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ComissionModule, { declarations: [_comission_detail_comission_detail_component__WEBPACK_IMPORTED_MODULE_1__.ComissionsDetailComponent, _comission_list_comission_list_component__WEBPACK_IMPORTED_MODULE_2__.ComissionListComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__.NgbModule,
        _comission_routing_module__WEBPACK_IMPORTED_MODULE_3__.ComissionRoutingModule,
        ngx_pagination__WEBPACK_IMPORTED_MODULE_4__.NgxPaginationModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_views_comissions_comission_module_ts.js.map