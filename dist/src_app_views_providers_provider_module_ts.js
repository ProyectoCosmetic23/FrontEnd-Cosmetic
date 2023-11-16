"use strict";
(self["webpackChunkgull"] = self["webpackChunkgull"] || []).push([["src_app_views_providers_provider_module_ts"],{

/***/ 55588:
/*!*****************************************************!*\
  !*** ./src/app/shared/services/provider.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProvidersService": () => (/* binding */ ProvidersService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 58987);


class ProvidersService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'https://api-cosmetic-w32d.onrender.com/api/providers';
    }
    createProvider(providerData) {
        return this.http.post(this.baseUrl, providerData);
    }
    getAllProviders() {
        return this.http.get(this.baseUrl);
    }
    getProviderById(providerId) {
        return this.http.get(`${this.baseUrl}/${providerId}`);
    }
    updateProviderStatus(providerId) {
        return this.http.put(`${this.baseUrl}/state/${providerId}`, null);
    }
    updateProvider(providerId, updatedProviderData) {
        return this.http.put(`${this.baseUrl}/${providerId}`, updatedProviderData);
    }
}
ProvidersService.ɵfac = function ProvidersService_Factory(t) { return new (t || ProvidersService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient)); };
ProvidersService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ProvidersService, factory: ProvidersService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 63238:
/*!******************************************************************************!*\
  !*** ./src/app/views/providers/provider-detail/provider-detail.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProvidersDetailComponent": () => (/* binding */ ProvidersDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_shared_services_provider_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/provider.service */ 55588);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/components/btn-loading/btn-loading.component */ 38845);








function ProvidersDetailComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ProvidersDetailComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Editar Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ProvidersDetailComponent_h1_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Ver Detalle de Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ProvidersDetailComponent_li_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ProvidersDetailComponent_li_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Editar Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function ProvidersDetailComponent_li_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Ver Detalle de Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
const _c0 = function (a0) { return { "gray-text": a0 }; };
function ProvidersDetailComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 9)(1, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Fecha de creaci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](4, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", ctx_r6.viewMode === "print" ? "Fecha de creaci\u00F3n" : "")("readonly", ctx_r6.viewMode === "print" || ctx_r6.viewMode === "edit")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](7, _c0, ctx_r6.viewMode === "edit"))("value", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](4, 4, ctx_r6.provider == null ? null : ctx_r6.provider.creation_date_provider, "yyyy-MM-dd"));
} }
function ProvidersDetailComponent_div_44_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "select", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ProvidersDetailComponent_div_44_ng_container_3_Template_select_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r13.handleStateSelection($event)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "option", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Activo");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "option", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Inactivo");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} }
const _c1 = function (a0) { return { "placeholder-black": a0 }; };
function ProvidersDetailComponent_div_44_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "input", 38);
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", (ctx_r12.provider == null ? null : ctx_r12.provider.state_provider) || "Estado del proveedor")("readonly", ctx_r12.viewMode === "print")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c1, ctx_r12.viewMode === "print"));
} }
function ProvidersDetailComponent_div_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 9)(1, "label", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Estado del proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ProvidersDetailComponent_div_44_ng_container_3_Template, 6, 0, "ng-container", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ProvidersDetailComponent_div_44_ng_template_4_Template, 1, 5, "ng-template", null, 34, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r7.viewMode === "edit")("ngIfElse", _r11);
} }
function ProvidersDetailComponent_btn_loading_54_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "btn-loading", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("loading", ctx_r8.loading);
} }
function ProvidersDetailComponent_btn_loading_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "btn-loading", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Editar Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("loading", ctx_r9.loading);
} }
const _c2 = function () { return ["/proveedores"]; };
class ProvidersDetailComponent {
    constructor(formBuilder, route, router, _providersService, toastr) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this._providersService = _providersService;
        this.toastr = toastr;
        this.viewMode = 'new';
        this.provider = {
            name_provider: '',
            state_provider: 'Activo',
            nit_cedula: '',
            email_provider: '',
            address_provider: '',
            phone_provider: '',
            observation_provider: '',
            name_contact: '',
            creation_date_provider: new Date(),
        };
        this.new_provider = {
            name_provider: '',
            state_provider: 'Activo',
            nit_cedula: '',
            email_provider: '',
            address_provider: '',
            phone_provider: '',
            observation_provider: '',
            name_contact: '',
            creation_date_provider: new Date(),
        };
        this.updatedFields = {};
        this.formBasic = this.formBuilder.group({});
    }
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isNew = !this.id;
        this.buildProvidersForm(this.provider);
        this.setViewMode();
        this.getProvider();
        if (!this.isNew) {
            this.getProvider();
        }
    }
    buildProvidersForm(i = {}) {
        this.formBasic = this.formBuilder.group({
            id: [i.id_provider],
            name_provider: [i.name_provider],
            nit_cedula: [i.nit_cedula],
            email_provider: [i.email_provider],
            address_provider: [i.address_provider],
            phone_provider: [i.phone_provider],
            state_provider: [i.state_provider],
            observation_provider: [i.observation_provider],
            name_contact: [i.name_contact],
            creation_date_provider: [i.creation_date_provider],
        });
    }
    setViewMode() {
        const currentRoute = this.router.url;
        if (currentRoute.includes('/registrar')) {
            this.viewMode = 'new';
        }
        else if (currentRoute.includes('/editar/')) {
            this.viewMode = 'edit';
        }
        else if (currentRoute.includes('/detalle/')) {
            this.viewMode = 'print';
        }
        console.log('viewMode:', this.viewMode);
    }
    getProvider() {
        this.id = this.route.snapshot.params['id_provider'];
        console.log(this.id);
        const providerId = parseInt(this.id, 10); // Convierte this.id a un número
        this._providersService.getProviderById(providerId).subscribe((data) => {
            this.provider = data;
            console.log(this.provider);
        }, (error) => {
            console.error('Error al obtener proveedor:', error);
        });
    }
    handleStateSelection(event) {
        this.new_provider.state_provider = event.target.value;
    }
    handleNameProviderSelection(event) {
        this.new_provider.name_provider = event.target.value;
        this.updatedFields.name_provider = event.target.value;
    }
    handleNameContactSelection(event) {
        this.new_provider.name_contact = event.target.value;
        this.updatedFields.name_contact = event.target.value;
    }
    handleNitSelection(event) {
        this.new_provider.nit_cedula = event.target.value;
    }
    handleMailSelection(event) {
        this.new_provider.email_provider = event.target.value;
        this.updatedFields.email_provider = event.target.value;
    }
    handleAddressSelection(event) {
        this.new_provider.address_provider = event.target.value;
        this.updatedFields.address_provider = event.target.value;
    }
    handleObservationSelection(event) {
        this.new_provider.observation_provider = event.target.value;
        this.updatedFields.observation_provider = event.target.value;
    }
    handlePhoneSelection(event) {
        this.new_provider.phone_provider = event.target.value;
        this.updatedFields.phone_provider = event.target.value;
    }
    createProvider() {
        const currentRoute = this.router.url;
        console.log(currentRoute);
        if (currentRoute.includes('/registrar')) {
            console.log(this.new_provider);
            this._providersService.createProvider(this.new_provider).subscribe((data) => {
                console.log(data);
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.toastr.success('Proveedor creado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
                    setTimeout(() => {
                        this.router.navigate(['/proveedores']);
                    }, 3000);
                }, 3000);
            }, (error) => {
                this.loading = false;
                this.toastr.error('Fallo al crear el proveedor.', 'Error', { progressBar: true });
                console.error('Error al crear el proveedor:', error);
            });
        }
        this.loading = true;
    }
    updateProvider() {
        const currentRoute = this.router.url;
        if (currentRoute.includes('/editar')) {
            this._providersService.updateProvider(this.id, this.updatedFields).subscribe((data) => {
                console.log(data);
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.toastr.success('Proveedor actualizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 3000 });
                    setTimeout(() => {
                        this.router.navigate(['/proveedores']);
                    }, 3000);
                }, 3000);
            }, (error) => {
                this.loading = false;
                this.toastr.error('Fallo al actualizar el proveedor.', 'Error', { progressBar: true });
                console.error('Error al actualizar el proveedor:', error);
            });
        }
    }
    submit() {
        if (this.viewMode === 'new') {
            this.createProvider(); // Lógica de creación
        }
        else if (this.viewMode === 'edit') {
            this.updateProvider(); // Lógica de edición
        }
    }
}
ProvidersDetailComponent.ɵfac = function ProvidersDetailComponent_Factory(t) { return new (t || ProvidersDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_shared_services_provider_service__WEBPACK_IMPORTED_MODULE_0__.ProvidersService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__.ToastrService)); };
ProvidersDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ProvidersDetailComponent, selectors: [["app-providers-detail"]], decls: 56, vars: 50, consts: [[1, "breadcrumb"], [4, "ngIf"], [3, "routerLink"], [1, "row"], [1, "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title", "mb-3"], [3, "formGroup", "ngSubmit"], [1, "col-md-6", "form-group", "mb-3"], ["for", "nit_cedula"], ["type", "number", "id", "nit_cedula", 1, "form-control", 3, "placeholder", "readonly", "ngClass", "change"], ["for", "name_provider"], ["type", "text", "id", "name_provider", 1, "form-control", 3, "placeholder", "readonly", "ngClass", "change"], ["for", "email_provider"], ["type", "email", "id", "email_provider", 1, "form-control", 3, "placeholder", "readonly", "ngClass", "change"], ["for", "address_provider"], ["id", "address_provider", 1, "form-control", 3, "placeholder", "readonly", "ngClass", "change"], ["for", "phone_provider"], ["id", "phone_provider", 1, "form-control", 3, "placeholder", "readonly", "ngClass", "change"], ["class", "col-md-6 form-group mb-3", 4, "ngIf"], ["for", "name_contact"], ["type", "text", "id", "name_contact", 1, "form-control", 3, "placeholder", "readonly", "ngClass", "change"], [1, "col-md-12", "form-group", "mb-3"], ["for", "observation_provider"], ["id", "observation_provider", "rows", "6", 1, "form-control", 2, "resize", "none", 3, "placeholder", "readonly", "ngClass", "change"], [1, "d-flex", "justify-content-end"], [1, "btn", "btn-danger", "float-right", 3, "routerLink"], [2, "width", "10px"], ["btnClass", "btn-primary", 3, "loading", 4, "ngIf"], ["for", "creation_date_provider"], ["type", "date", "id", "creation_date_provider", 1, "form-control", 3, "placeholder", "readonly", "ngClass", "value"], ["for", "state_provider"], [4, "ngIf", "ngIfElse"], ["viewModeDisplay", ""], ["id", "state_provider", 1, "form-control", 3, "change"], ["value", "Activo"], ["value", "Inactivo"], ["type", "text", "id", "state_provider", 1, "form-control", 3, "placeholder", "readonly", "ngClass"], ["btnClass", "btn-primary", 3, "loading"]], template: function ProvidersDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ProvidersDetailComponent_h1_1_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ProvidersDetailComponent_h1_2_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ProvidersDetailComponent_h1_3_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "ul")(5, "li")(6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Proveedores");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, ProvidersDetailComponent_li_8_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, ProvidersDetailComponent_li_9_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, ProvidersDetailComponent_li_10_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 3)(12, "div", 4)(13, "div", 5)(14, "div", 6)(15, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Formulario de Proveedor");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "form", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function ProvidersDetailComponent_Template_form_ngSubmit_17_listener() { return ctx.submit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 3)(19, "div", 9)(20, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "C\u00E9dula o NIT del proveedor");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ProvidersDetailComponent_Template_input_change_22_listener($event) { return ctx.handleNitSelection($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 9)(24, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Nombre del proveedor");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ProvidersDetailComponent_Template_input_change_26_listener($event) { return ctx.handleNameProviderSelection($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 9)(28, "label", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, "Correo del proveedor");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ProvidersDetailComponent_Template_input_change_30_listener($event) { return ctx.handleMailSelection($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "div", 9)(32, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "Direcci\u00F3n del proveedor");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ProvidersDetailComponent_Template_input_change_34_listener($event) { return ctx.handleAddressSelection($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "div", 9)(36, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "Tel\u00E9fono del proveedor");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ProvidersDetailComponent_Template_input_change_38_listener($event) { return ctx.handlePhoneSelection($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](39, ProvidersDetailComponent_div_39_Template, 5, 9, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "div", 9)(41, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42, "Nombre del contacto");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ProvidersDetailComponent_Template_input_change_43_listener($event) { return ctx.handleNameContactSelection($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](44, ProvidersDetailComponent_div_44_Template, 6, 2, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](45, "div", 23)(46, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](47, "Observaci\u00F3n del proveedor");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "textarea", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function ProvidersDetailComponent_Template_textarea_change_48_listener($event) { return ctx.handleObservationSelection($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](49, "div", 4)(50, "div", 26)(51, "button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52, "Volver");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](53, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](54, ProvidersDetailComponent_btn_loading_54_Template, 2, 1, "btn-loading", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](55, ProvidersDetailComponent_btn_loading_55_Template, 2, 1, "btn-loading", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](34, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.formBasic);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", (ctx.provider == null ? null : ctx.provider.nit_cedula) || "Ingrese la c\u00E9dula o NIT")("readonly", ctx.viewMode === "print" || ctx.viewMode === "edit")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](35, _c1, ctx.viewMode === "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", (ctx.provider == null ? null : ctx.provider.name_provider) || "Nombre del proveedor")("readonly", ctx.viewMode === "print")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](37, _c1, ctx.viewMode === "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", (ctx.provider == null ? null : ctx.provider.email_provider) || "Correo del proveedor")("readonly", ctx.viewMode === "print")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](39, _c1, ctx.viewMode === "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", (ctx.provider == null ? null : ctx.provider.address_provider) || "Direcci\u00F3n del proveedor")("readonly", ctx.viewMode === "print")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](41, _c1, ctx.viewMode === "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", (ctx.provider == null ? null : ctx.provider.phone_provider) || "Tel\u00E9fono del proveedor")("readonly", ctx.viewMode === "print")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](43, _c1, ctx.viewMode === "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode !== "new" && ctx.viewMode !== "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", (ctx.provider == null ? null : ctx.provider.name_contact) || "Nombre del contacto")("readonly", ctx.viewMode === "print")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](45, _c1, ctx.viewMode === "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode !== "new" && ctx.viewMode !== "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("placeholder", (ctx.provider == null ? null : ctx.provider.observation_provider) || "Observaci\u00F3n del proveedor")("readonly", ctx.viewMode === "print")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](47, _c1, ctx.viewMode === "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](49, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_1__.BtnLoadingComponent, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe], styles: [".placeholder-black[_ngcontent-%COMP%]::-moz-placeholder {\n  color: black;\n}\n\n.placeholder-black[_ngcontent-%COMP%]::placeholder {\n  color: black;\n}\n\n.gray-text[_ngcontent-%COMP%] {\n  color: rgb(200, 200, 200);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3ZpZGVyLWRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7QUFDSjs7QUFGQTtFQUNJLFlBQUE7QUFDSjs7QUFFQTtFQUNJLHlCQUFBO0FBQ0oiLCJmaWxlIjoicHJvdmlkZXItZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBsYWNlaG9sZGVyLWJsYWNrOjpwbGFjZWhvbGRlciB7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi5ncmF5LXRleHQge1xyXG4gICAgY29sb3I6IHJnYigyMDAsIDIwMCwgMjAwKTtcclxufSJdfQ== */"] });


/***/ }),

/***/ 74196:
/*!**************************************************************************!*\
  !*** ./src/app/views/providers/provider-list/provider-list.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProviderListComponent": () => (/* binding */ ProviderListComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 80823);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_services_provider_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/provider.service */ 55588);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-pagination */ 75595);









const _c0 = ["changeStateModal"];
function ProviderListComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Nombre proveedor ");
} }
function ProviderListComponent_ng_template_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", row_r13.name_provider, " ");
} }
function ProviderListComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Tel\u00E9fono ");
} }
function ProviderListComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r15 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", row_r15.phone_provider, " ");
} }
function ProviderListComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Nombre contacto ");
} }
function ProviderListComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r17 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", row_r17.name_contact, " ");
} }
function ProviderListComponent_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Estado ");
} }
function ProviderListComponent_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", row_r19.state_provider, " ");
} }
function ProviderListComponent_ng_template_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0, " Acciones ");
} }
const _c1 = function (a1) { return ["/proveedores/detalle", a1]; };
const _c2 = function (a1) { return ["/proveedores/editar", a1]; };
function ProviderListComponent_ng_template_37_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "label", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ProviderListComponent_ng_template_37_Template_label_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23); const row_r21 = restoredCtx.row; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r22.openModal(row_r21.id_provider)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "input", 27)(6, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r21 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c1, row_r21.id_provider));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c2, row_r21.id_provider));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("checked", row_r21.state_provider === "Activo" || row_r21.state_provider === "Active");
} }
function ProviderListComponent_ng_template_39_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 29)(1, "h4", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Cambiar Estado del Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ProviderListComponent_ng_template_39_Template_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](modal_r24.dismiss("Cross click")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 33)(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "\u00BFEst\u00E1 seguro de que desea inhabilitar este proveedor?");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 34)(11, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ProviderListComponent_ng_template_39_Template_button_click_11_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](modal_r24.dismiss("cancel")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ProviderListComponent_ng_template_39_Template_button_click_13_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](modal_r24.close("Yes")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Aceptar");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} }
const _c3 = function () { return ["/proveedores/registrar"]; };
class ProviderListComponent {
    constructor(_providersService, modalService, toastr) {
        this._providersService = _providersService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.listProviders = [];
        this.originalListProviders = [];
        this.openedModal = false;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.UntypedFormControl();
        this.paginationId = 'providers-pagination';
        this.currentPage = 1;
        this.itemsPerPage = 6;
    }
    onPageChange(event) {
        this.currentPage = event.offset / this.itemsPerPage + 1;
        this.updateListProviders();
    }
    ngOnInit() {
        this._providersService.getAllProviders()
            .subscribe((res) => {
            this.listProviders = [...res];
            this.filteredProviders = res;
            this.originalListProviders = [...res];
        });
        this.searchControl.valueChanges
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.debounceTime)(200))
            .subscribe(value => {
            this.filerData(value);
        });
    }
    updateListProviders() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        const totalPages = Math.ceil(this.listProviders.length / this.itemsPerPage);
        if (this.currentPage === totalPages) {
            const remainingRows = this.listProviders.length % this.itemsPerPage;
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows;
            }
        }
        const rowsToAdd = 6 - (endIndex % 6);
        endIndex += rowsToAdd;
        this.filteredProviders = this.listProviders.slice(startIndex, endIndex);
    }
    pageChanged(event) {
        this.currentPage = event.page;
        this.updateListProviders();
    }
    filerData(val) {
        if (val) {
            val = val.toLowerCase();
        }
        else {
            return this.filteredProviders = [...this.providers];
        }
        const columns = Object.keys(this.providers[0]);
        if (!columns.length) {
            return;
        }
        const rows = this.providers.filter(function (d) {
            for (let i = 0; i <= columns.length; i++) {
                const column = columns[i];
                if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                    return true;
                }
            }
        });
        this.filteredProviders = rows;
    }
    sortListProvidersById() {
        this.listProviders.sort((a, b) => a.id_provider - b.id_provider);
    }
    getProviders() {
        this._providersService.getAllProviders().subscribe((data) => {
            this.listProviders = data;
            this.sortListProvidersById();
            location.reload();
        }, (error) => {
            console.error('Error al obtener los proveedores:', error);
        });
    }
    openModal(idProvider) {
        this._providersService.getProviderById(idProvider).subscribe;
        if (!this.openedModal) {
            this.openedModal = true;
            this.modalService.open(this.changeStateModal, { centered: true }).result.then((result) => {
                if (result === 'Yes') {
                    this._providersService.updateProviderStatus(idProvider).subscribe((data) => {
                        this.loading = false;
                        this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                        console.log(data);
                        setTimeout(() => {
                            location.reload();
                        }, 2000);
                    }, (error) => {
                        this.loading = false;
                        this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', { progressBar: true, timeOut: 2000 });
                        console.error('Error al cambiar de estado:', error);
                    });
                }
                else if (result === 'Cancel') {
                    this.openedModal = false;
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                }
            }, (reason) => {
                this.openedModal = false;
                location.reload();
            });
        }
    }
}
ProviderListComponent.ɵfac = function ProviderListComponent_Factory(t) { return new (t || ProviderListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_shared_services_provider_service__WEBPACK_IMPORTED_MODULE_0__.ProvidersService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_5__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_6__.ToastrService)); };
ProviderListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ProviderListComponent, selectors: [["app-provider-list"]], viewQuery: function ProviderListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.changeStateModal = _t.first);
    } }, decls: 41, vars: 14, consts: [[1, "breadcrumb"], ["href", ""], [1, "separator-breadcrumb", "border-top"], [1, "row", "mb-3"], [1, "col-md-12", "mb-3"], [1, "row"], [1, "col-md-6"], [1, "btn", "btn-primary", "float-right", 3, "routerLink"], [1, "col-md-6", "d-flex", "justify-content-end"], ["_ngcontent-vet-c167", "", "id", "email", "placeholder", "Buscar Proveedires", "type", "text", "ng-reflect-form", "[object Object]", 1, "form-control", "ng-valid", "ng-touched", "ng-dirty", 2, "width", "50%"], [1, "col-md-12"], [1, "card", "o-hidden"], [1, "material", "fullscreen", 2, "height", "460px", 3, "columnMode", "headerHeight", "footerHeight", "rowHeight", "scrollbarV", "rows", "externalPaging", "count", "limit", "offset", "page"], ["name", "name_provider"], ["ngx-datatable-header-template", ""], ["ngx-datatable-cell-template", ""], ["name", "phone_provider"], ["name", "name_contact"], ["name", "state_provider"], [3, "width"], [3, "id", "pageChange"], ["changeStateModal", ""], [1, "btn", "btn-dark", "m-1", "me-3", 3, "routerLink"], [1, "i-Eye"], [1, "btn", "btn-info", "m-1", "me-3", 3, "routerLink"], [1, "i-Pen-4"], [1, "switch", "switch-success", "me-3", 3, "click"], ["type", "checkbox", 3, "checked"], [1, "slider"], [1, "modal-header"], ["id", "modal-title", 1, "Cambiar", "estado"], ["type", "button", "aria-label", "Close button", "aria-describedby", "modal-title", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-outline-secondary", "btn-rounded", 3, "click"], ["type", "button", "ngbAutofocus", "", 1, "btn", "btn-wide", "btn-danger", "btn-rounded", 3, "click"]], template: function ProviderListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "CosmeTic");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "ul")(4, "li")(5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Compras");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "Proveedores");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 3)(11, "div", 4)(12, "div", 5)(13, "div", 6)(14, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "Crear nuevo proveedor");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 10)(19, "div", 11)(20, "div", 10)(21, "div", 11)(22, "ngx-datatable", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("page", function ProviderListComponent_Template_ngx_datatable_page_22_listener($event) { return ctx.onPageChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "ngx-datatable-column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](24, ProviderListComponent_ng_template_24_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](25, ProviderListComponent_ng_template_25_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "ngx-datatable-column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](27, ProviderListComponent_ng_template_27_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](28, ProviderListComponent_ng_template_28_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "ngx-datatable-column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](30, ProviderListComponent_ng_template_30_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](31, ProviderListComponent_ng_template_31_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "ngx-datatable-column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](33, ProviderListComponent_ng_template_33_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](34, ProviderListComponent_ng_template_34_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](35, "ngx-datatable-column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](36, ProviderListComponent_ng_template_36_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](37, ProviderListComponent_ng_template_37_Template, 7, 7, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "pagination-template", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("pageChange", function ProviderListComponent_Template_pagination_template_pageChange_38_listener($event) { return ctx.pageChanged($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](39, ProviderListComponent_ng_template_39_Template, 15, 0, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](13, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("columnMode", "force")("headerHeight", 50)("footerHeight", 50)("rowHeight", 60)("scrollbarV", true)("rows", ctx.listProviders)("externalPaging", true)("count", ctx.listProviders.length)("limit", ctx.itemsPerPage)("offset", (ctx.currentPage - 1) * ctx.itemsPerPage);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("width", 120);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx.paginationId);
    } }, dependencies: [_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.DatatableComponent, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.DataTableColumnDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.DataTableColumnHeaderDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.DataTableColumnCellDirective, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, ngx_pagination__WEBPACK_IMPORTED_MODULE_1__.PaginationControlsDirective], styles: [".datatable-pager[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.datatable-pager[_ngcontent-%COMP%]   .pager-previous[_ngcontent-%COMP%], .datatable-pager[_ngcontent-%COMP%]   .pager-next[_ngcontent-%COMP%] {\n  display: none; \n}\n\n.datatable-pager[_ngcontent-%COMP%]   .pager-current[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb3ZpZGVyLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVFO0VBQ0UsYUFBQSxFQUFBLDJDQUFBO0FBQ0o7O0FBRUU7RUFDRSxjQUFBO0FBQ0oiLCJmaWxlIjoicHJvdmlkZXItbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kYXRhdGFibGUtcGFnZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB9XHJcbiAgXHJcbiAgLmRhdGF0YWJsZS1wYWdlciAucGFnZXItcHJldmlvdXMsIC5kYXRhdGFibGUtcGFnZXIgLnBhZ2VyLW5leHQge1xyXG4gICAgZGlzcGxheTogbm9uZTsgLyogT2N1bHRhIGxvcyBib3RvbmVzIFwicHJldmlvdXNcIiB5IFwibmV4dFwiICovXHJcbiAgfVxyXG4gIFxyXG4gIC5kYXRhdGFibGUtcGFnZXIgLnBhZ2VyLWN1cnJlbnQge1xyXG4gICAgbWFyZ2luOiAwIDEwcHg7XHJcbiAgfSJdfQ== */"] });


/***/ }),

/***/ 4808:
/*!************************************************************!*\
  !*** ./src/app/views/providers/provider-routing.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProviderRoutingModule": () => (/* binding */ ProviderRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _provider_detail_provider_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./provider-detail/provider-detail.component */ 63238);
/* harmony import */ var _provider_list_provider_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./provider-list/provider-list.component */ 74196);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);





const routes = [
    {
        path: '',
        component: _provider_list_provider_list_component__WEBPACK_IMPORTED_MODULE_1__.ProviderListComponent
    },
    {
        path: 'registrar',
        component: _provider_detail_provider_detail_component__WEBPACK_IMPORTED_MODULE_0__.ProvidersDetailComponent
    },
    {
        path: 'editar/:id_provider',
        component: _provider_detail_provider_detail_component__WEBPACK_IMPORTED_MODULE_0__.ProvidersDetailComponent
    },
    {
        path: 'detalle/:id_provider',
        component: _provider_detail_provider_detail_component__WEBPACK_IMPORTED_MODULE_0__.ProvidersDetailComponent
    }
];
class ProviderRoutingModule {
}
ProviderRoutingModule.ɵfac = function ProviderRoutingModule_Factory(t) { return new (t || ProviderRoutingModule)(); };
ProviderRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ProviderRoutingModule });
ProviderRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ProviderRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 13183:
/*!****************************************************!*\
  !*** ./src/app/views/providers/provider.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProviderModule": () => (/* binding */ ProviderModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/components/shared-components.module */ 50933);
/* harmony import */ var _provider_detail_provider_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./provider-detail/provider-detail.component */ 63238);
/* harmony import */ var _provider_list_provider_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./provider-list/provider-list.component */ 74196);
/* harmony import */ var _provider_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./provider-routing.module */ 4808);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-pagination */ 75595);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 22560);








// Importa NgxPaginationModule


class ProviderModule {
}
ProviderModule.ɵfac = function ProviderModule_Factory(t) { return new (t || ProviderModule)(); };
ProviderModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: ProviderModule });
ProviderModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__.NgbModule,
        _provider_routing_module__WEBPACK_IMPORTED_MODULE_3__.ProviderRoutingModule,
        ngx_pagination__WEBPACK_IMPORTED_MODULE_4__.NgxPaginationModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ProviderModule, { declarations: [_provider_detail_provider_detail_component__WEBPACK_IMPORTED_MODULE_1__.ProvidersDetailComponent, _provider_list_provider_list_component__WEBPACK_IMPORTED_MODULE_2__.ProviderListComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_8__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__.NgbModule,
        _provider_routing_module__WEBPACK_IMPORTED_MODULE_3__.ProviderRoutingModule,
        ngx_pagination__WEBPACK_IMPORTED_MODULE_4__.NgxPaginationModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_views_providers_provider_module_ts.js.map