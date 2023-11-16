"use strict";
(self["webpackChunkgull"] = self["webpackChunkgull"] || []).push([["src_app_views_comissionsDetail_comissionDetail_module_ts"],{

/***/ 74972:
/*!*************************************************************!*\
  !*** ./src/app/shared/services/comission-detail.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComissionsDetailService": () => (/* binding */ ComissionsDetailService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 58987);


class ComissionsDetailService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'https://api-cosmetic-w32d.onrender.com/api/detailComs';
        this.url2 = 'https://api-cosmetic-w32d.onrender.com/api/commissions';
    }
    createDetailCom(detailData) {
        return this.http.post(`${this.url2}/detailComs`, detailData);
    }
    getAllDetails() {
        return this.http.get(this.baseUrl);
    }
    getDetailComsById(detailID) {
        return this.http.get(`${this.url2}/${this.baseUrl}/${detailID}`);
    }
}
ComissionsDetailService.ɵfac = function ComissionsDetailService_Factory(t) { return new (t || ComissionsDetailService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient)); };
ComissionsDetailService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ComissionsDetailService, factory: ComissionsDetailService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 41988:
/*!***************************************************************************************************!*\
  !*** ./src/app/views/comissionsDetail/comissionDetail-detail/comissionDetail-detail.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComissionsDetailDetailComponent": () => (/* binding */ ComissionsDetailDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_shared_services_comission_detail_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/comission-detail.service */ 74972);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/components/btn-loading/btn-loading.component */ 38845);








function ComissionsDetailDetailComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Detalle de la Comision");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ComissionsDetailDetailComponent_li_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Detalle de Comision");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ComissionsDetailDetailComponent_btn_loading_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "btn-loading", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Comisi\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("loading", ctx_r2.loading);
} }
const _c0 = function () { return ["/comisiones"]; };
const _c1 = function (a0) { return { "placeholder-black": a0 }; };
class ComissionsDetailDetailComponent {
    constructor(formBuilder, route, router, _comssionDetailService, toastr) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this._comssionDetailService = _comssionDetailService;
        this.toastr = toastr;
        this.viewMode = 'new';
        this.comissionDetail = {
            commission_percentage: 0,
        };
        this.new_comissionDetail = {
            commission_percentage: 0,
        };
        this.updatedFields = {};
        this.formBasic = this.formBuilder.group({});
    }
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isNew = !this.id;
        this.buildProvidersForm(this.comissionDetail);
        this.setViewMode();
        this.getComissionDetail();
        const date = new Date();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // getMonth() starts from 0 for January, so we add 1.
        const year = date.getFullYear();
        this.currentMonthYear = `${month}/${year}`;
        if (!this.isNew) {
            this.getComissionDetail();
        }
    }
    buildProvidersForm(i = {}) {
        this.formBasic = this.formBuilder.group({
            id: [i.id_commission_detail],
            month_commission: [i.month_commission],
            commission_percentage: [i.commission_percentage],
        });
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
    getComissionDetail() {
        this.id = this.route.snapshot.params['id_commission_detail'];
        console.log(this.id);
        const comissionDetailId = parseInt(this.id, 10); // Convierte this.id a un número
        this._comssionDetailService.getDetailComsById(comissionDetailId).subscribe((data) => {
            this.comissionDetail = data;
            console.log(this.comissionDetail);
        }, (error) => {
            console.error('Error al obtener el detalle de la comisión:', error);
        });
    }
    handlePerccentageSelection(event) {
        this.new_comissionDetail.commission_percentage = event.target.value;
    }
    createComissionDetail() {
        if (this.viewMode === 'new') {
            const currentRoute = this.router.url;
            console.log(currentRoute);
            if (currentRoute.includes('/registrar')) {
                console.log(this.new_comissionDetail);
                this._comssionDetailService.createDetailCom(this.new_comissionDetail).subscribe((data) => {
                    console.log(data);
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.toastr.success('Detalle comisión creado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
                        setTimeout(() => {
                            this.router.navigate(['/comisiones']);
                        }, 3000);
                    }, 3000);
                }, (error) => {
                    this.loading = false;
                    this.toastr.error('Fallo al crear el detalle comisión.', 'Error', { progressBar: true });
                    console.error('Error al crear el detalle comisión:', error);
                });
            }
        }
    }
    submit() {
        if (this.viewMode === 'new') {
            this.createComissionDetail(); // Lógica de creación
        }
    }
    navigateBack() {
        this.router.navigate(['/comisiones']);
    }
}
ComissionsDetailDetailComponent.ɵfac = function ComissionsDetailDetailComponent_Factory(t) { return new (t || ComissionsDetailDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_shared_services_comission_detail_service__WEBPACK_IMPORTED_MODULE_0__.ComissionsDetailService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__.ToastrService)); };
ComissionsDetailDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ComissionsDetailDetailComponent, selectors: [["app-comissionDetail-detail"]], decls: 49, vars: 11, consts: [[1, "breadcrumb"], [4, "ngIf"], [3, "routerLink"], [1, "row"], [1, "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title", "mb-3"], [3, "formGroup", "ngSubmit"], [1, "col-md-2", "form-group", "mb-3"], ["for", "commission_percentage"], ["id", "commission_percentage", 1, "form-control", 3, "change"], ["value", "1"], ["value", "2"], ["value", "3"], ["value", "4"], ["value", "5"], ["value", "6"], ["value", "7"], ["value", "8"], ["value", "9"], ["value", "10"], [1, "col-md-3", "form-group", "mb-3"], ["for", "month_commission"], ["type", "text", "id", "month_commission", 1, "form-control", 3, "value", "readonly", "ngClass"], [1, "d-flex", "justify-content-end"], [1, "btn", "btn-danger", "float-right", 3, "click"], [2, "width", "10px"], ["btnClass", "btn-primary", 3, "loading", 4, "ngIf"], ["btnClass", "btn-primary", 3, "loading"]], template: function ComissionsDetailDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ComissionsDetailDetailComponent_h1_1_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ul")(3, "li")(4, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Comisiones");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, ComissionsDetailDetailComponent_li_6_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 3)(8, "div", 4)(9, "div", 5)(10, "div", 6)(11, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Formulario de Detalle de la Comision");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "form", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function ComissionsDetailDetailComponent_Template_form_ngSubmit_13_listener() { return ctx.submit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 3)(15, "div", 9)(16, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "Porcentaje de comisi\u00F3n del mes");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "select", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ComissionsDetailDetailComponent_Template_select_change_18_listener($event) { return ctx.handlePerccentageSelection($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "option", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "option", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "option", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "5");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "option", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "6");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "option", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32, "7");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "option", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "8");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "option", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](36, "9");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "option", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "10");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "div", 22)(40, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](41, "Mes comisi\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](42, "input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "div", 4)(44, "div", 25)(45, "button", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ComissionsDetailDetailComponent_Template_button_click_45_listener() { return ctx.navigateBack(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](46, "Volver");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](47, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](48, ComissionsDetailDetailComponent_btn_loading_48_Template, 2, 1, "btn-loading", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](8, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.formBasic);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("value", ctx.currentMonthYear);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("readonly", ctx.viewMode === "print" || ctx.viewMode === "new")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](9, _c1, ctx.viewMode === "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_1__.BtnLoadingComponent, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb21pc3Npb25EZXRhaWwtZGV0YWlsLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 19836:
/*!**************************************************************************!*\
  !*** ./src/app/views/comissionsDetail/comissionDetail-routing.module.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComissionDetailRoutingModule": () => (/* binding */ ComissionDetailRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _comissionDetail_detail_comissionDetail_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comissionDetail-detail/comissionDetail-detail.component */ 41988);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);




// import { ComissionDetailListComponent } from './comissionDetail-list/comissionDetail-list.component';
const routes = [
    // {
    //     path: '',
    //     component: ComissionDetailListComponent
    // },
    {
        path: 'registrar',
        component: _comissionDetail_detail_comissionDetail_detail_component__WEBPACK_IMPORTED_MODULE_0__.ComissionsDetailDetailComponent
    },
    {
        path: 'detalle/:id_commission_detail',
        component: _comissionDetail_detail_comissionDetail_detail_component__WEBPACK_IMPORTED_MODULE_0__.ComissionsDetailDetailComponent
    }
];
class ComissionDetailRoutingModule {
}
ComissionDetailRoutingModule.ɵfac = function ComissionDetailRoutingModule_Factory(t) { return new (t || ComissionDetailRoutingModule)(); };
ComissionDetailRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ComissionDetailRoutingModule });
ComissionDetailRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ComissionDetailRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 80572:
/*!******************************************************************!*\
  !*** ./src/app/views/comissionsDetail/comissionDetail.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ComissionDetailModule": () => (/* binding */ ComissionDetailModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/components/shared-components.module */ 50933);
/* harmony import */ var _comissionDetail_detail_comissionDetail_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comissionDetail-detail/comissionDetail-detail.component */ 41988);
/* harmony import */ var _comissionDetail_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comissionDetail-routing.module */ 19836);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-pagination */ 75595);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);






// import { ProviderListComponent } from './comissionDetail-list/comissionDetail-list.component';

// Importa NgxPaginationModule


class ComissionDetailModule {
}
ComissionDetailModule.ɵfac = function ComissionDetailModule_Factory(t) { return new (t || ComissionDetailModule)(); };
ComissionDetailModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: ComissionDetailModule });
ComissionDetailModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _comissionDetail_routing_module__WEBPACK_IMPORTED_MODULE_2__.ComissionDetailRoutingModule,
        ngx_pagination__WEBPACK_IMPORTED_MODULE_3__.NgxPaginationModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ComissionDetailModule, { declarations: [_comissionDetail_detail_comissionDetail_detail_component__WEBPACK_IMPORTED_MODULE_1__.ComissionsDetailDetailComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _comissionDetail_routing_module__WEBPACK_IMPORTED_MODULE_2__.ComissionDetailRoutingModule,
        ngx_pagination__WEBPACK_IMPORTED_MODULE_3__.NgxPaginationModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_views_comissionsDetail_comissionDetail_module_ts.js.map