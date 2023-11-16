"use strict";
(self["webpackChunkgull"] = self["webpackChunkgull"] || []).push([["src_app_views_roles_roles_module_ts"],{

/***/ 21597:
/*!**************************************************!*\
  !*** ./src/app/shared/services/roles.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolesService": () => (/* binding */ RolesService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 58987);


class RolesService {
    constructor(http) {
        this.http = http;
        this.url = 'https://api-cosmetic-w32d.onrender.com/api/roles';
    }
    getAllRoles() {
        return this.http.get(this.url);
    }
    getRoleById(id) {
        return this.http.get(this.url + '/' + id);
    }
    createRole(roleData) {
        return this.http.post(this.url + '/', roleData);
    }
    editRole(id, roleData) {
        return this.http.put(this.url + '/update/' + id, roleData);
    }
    updateRoleStatus(id) {
        return this.http.put(this.url + '/updateStatus/' + id, {});
    }
}
RolesService.ɵfac = function RolesService_Factory(t) { return new (t || RolesService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient)); };
RolesService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: RolesService, factory: RolesService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 71226:
/*!********************************************************************!*\
  !*** ./src/app/views/roles/roles-detail/roles-detail.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolesDetailComponent": () => (/* binding */ RolesDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var src_app_shared_services_roles_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/roles.service */ 21597);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/components/btn-loading/btn-loading.component */ 38845);









function RolesDetailComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function RolesDetailComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Editar Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function RolesDetailComponent_h1_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Ver Detalle de Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function RolesDetailComponent_li_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Registrar Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function RolesDetailComponent_li_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Editar Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function RolesDetailComponent_li_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Ver Detalle de Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function RolesDetailComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 4)(1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} }
function RolesDetailComponent_div_12_input_12_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function RolesDetailComponent_div_12_input_12_Template_input_change_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r15.handleNameSelection($event)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx_r8.role == null ? null : ctx_r8.role.name_role)("placeholder", (ctx_r8.role == null ? null : ctx_r8.role.name_role) || "Ingrese el nombre del rol")("readonly", ctx_r8.viewMode === "print");
} }
function RolesDetailComponent_div_12_input_13_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("touch", function RolesDetailComponent_div_12_input_13_Template_input_touch_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r17.handleNameSelection($event)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", (ctx_r9.role == null ? null : ctx_r9.role.name_role) || "Ingrese el nombre del rol")("readonly", ctx_r9.viewMode === "print");
} }
function RolesDetailComponent_div_12_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26)(1, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r10.nameErrorMessage);
} }
function RolesDetailComponent_div_12_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "label", 28)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function RolesDetailComponent_div_12_div_20_Template_input_change_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r21); const modulo_r19 = restoredCtx.$implicit; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r20.handleModuleSelection(modulo_r19)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const modulo_r19 = ctx.$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](modulo_r19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r11.viewMode === "print")("checked", ctx_r11.role == null ? null : ctx_r11.role.modules_role.includes(modulo_r19));
} }
function RolesDetailComponent_div_12_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26)(1, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Debe agregar al menos un m\u00F3dulo.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
} }
function RolesDetailComponent_div_12_btn_loading_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "btn-loading", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Crear Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("loading", ctx_r13.loading);
} }
function RolesDetailComponent_div_12_btn_loading_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "btn-loading", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Editar Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("loading", ctx_r14.loading);
} }
const _c0 = function () { return ["Usuarios", "Categor\u00EDas de Productos", "Productos", "Proveedores", "Compras", "Empleados", "Clientes", "Pedidos", "Ventas", "Comisiones"]; };
const _c1 = function () { return ["/roles"]; };
function RolesDetailComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div")(1, "div", 7)(2, "div", 8)(3, "div", 9)(4, "div", 10)(5, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Formulario de Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "form", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function RolesDetailComponent_div_12_Template_form_ngSubmit_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r22.saveData()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 7)(9, "div", 13)(10, "label", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Nombre del Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, RolesDetailComponent_div_12_input_12_Template, 1, 3, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, RolesDetailComponent_div_12_input_13_Template, 1, 2, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, RolesDetailComponent_div_12_div_14_Template, 3, 1, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 8)(16, "div", 9)(17, "div", 10)(18, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "M\u00F3dulos");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](20, RolesDetailComponent_div_12_div_20_Template, 6, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, RolesDetailComponent_div_12_div_21_Template, 3, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 8)(23, "div", 20)(24, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, " Volver ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](26, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](27, RolesDetailComponent_div_12_btn_loading_27_Template, 2, 1, "btn-loading", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](28, RolesDetailComponent_div_12_btn_loading_28_Template, 2, 1, "btn-loading", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()()()();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx_r7.formBasic);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r7.viewMode === "edit" || ctx_r7.viewMode === "new");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r7.viewMode === "print");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r7.showErrorMessageName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](9, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r7.showErrorMessageModules);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](10, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r7.viewMode === "new");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r7.viewMode === "edit");
} }
class RolesDetailComponent {
    constructor(formBuilder, route, router, fb, _rolesService, toastr) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this._rolesService = _rolesService;
        this.toastr = toastr;
        this.showLoadingScreen = false;
        this.viewMode = "new";
        this.nameErrorMessage = "";
        this.roles = {};
        this.showErrorMessageModules = false;
        this.showErrorMessageName = false;
        this.role = {
            name_role: "",
            state_role: "Activo",
            modules_role: [],
        };
        this.selected_modules = [];
        this.new_role = {
            name_role: "",
            state_role: "Activo",
            modules_role: [],
        };
        this.formBasic = this.formBuilder.group({});
    }
    ngOnInit() {
        this.id = this.route.snapshot.params["id_role"];
        this.isNew = !this.id;
        this.buildRolesForm(this.roles);
        this.setViewMode();
        this.getRole();
    }
    buildRolesForm(i = {}) {
        this.rolesForm = this.fb.group({
            id: [i.id],
            nombreRol: [i.nombre_rol],
            modulosRol: [i.nombre_rol],
        });
    }
    setViewMode() {
        const currentRoute = this.router.url;
        if (currentRoute.includes("/new")) {
            this.viewMode = "new";
        }
        else if (currentRoute.includes("/edit/")) {
            this.viewMode = "edit";
        }
        else if (currentRoute.includes("/detail/")) {
            this.viewMode = "print";
        }
    }
    getRole() {
        this.showLoadingScreen = true;
        const currentRoute = this.router.url;
        if (currentRoute.includes("/edit/") || currentRoute.includes("/detail/")) {
            this.id = this.route.snapshot.params["id_role"];
            console.log(this.id);
            this._rolesService.getRoleById(this.id).subscribe((data) => {
                this.role = data;
                this.selected_modules = this.role.modules_role;
                this.new_role.name_role = this.role.name_role;
                console.log(this.selected_modules);
                console.log(this.role);
                this.showLoadingScreen = false;
            }, (error) => {
                console.error("Error al obtener rol:", error);
                this.showLoadingScreen = false;
            });
        }
    }
    handleModuleSelection(module) {
        if (this.selected_modules.includes(module)) {
            this.selected_modules = this.selected_modules.filter((item) => item !== module);
            this.new_role.modules_role = this.selected_modules;
        }
        else {
            this.selected_modules.push(module);
        }
        const moduleCount = this.selected_modules.length;
        console.log(moduleCount);
        this.showErrorMessageModules = moduleCount < 1;
        if (moduleCount < 1) {
            console.log(this.showErrorMessageModules);
        }
    }
    handleNameSelection(event) {
        this.showErrorMessageName = false; // Reiniciar el estado de error
        const inputValue = event.target.value;
        // Validar la cantidad de caracteres
        if (inputValue.length < 5) {
            this.showErrorMessageName = true;
            this.nameErrorMessage = "El nombre del rol debe tener al menos 5 caracteres.";
            return;
        }
        // Validar que no haya espacios
        if (/\s/.test(inputValue)) {
            this.showErrorMessageName = true;
            this.nameErrorMessage = "El nombre del rol no puede contener espacios.";
            return;
        }
        // Validar que no haya números
        if (/\d/.test(inputValue)) {
            this.showErrorMessageName = true;
            this.nameErrorMessage = "El nombre del rol no puede contener números.";
            return;
        }
        // Validar que no haya símbolos
        if (/[^a-zA-Z]/.test(inputValue)) {
            this.showErrorMessageName = true;
            this.nameErrorMessage = "El nombre del rol no puede contener símbolos.";
            return;
        }
        // Si todas las validaciones pasan, actualizar el valor en tu objeto
        this.new_role.name_role = inputValue;
        console.log(this.new_role.name_role);
    }
    saveData() {
        if (this.selected_modules.length == 0 ||
            this.showErrorMessageModules == true ||
            this.showErrorMessageName == true) {
            if (this.showErrorMessageName == true) {
                this.toastr.error("Nombre de rol incorrecto.", "Error", {
                    progressBar: true,
                });
            }
            else if (this.selected_modules.length == 0 ||
                this.showErrorMessageModules == true) {
                this.toastr.error("Seleccione como mínimo un permiso.", "Error", {
                    progressBar: true,
                });
            }
        }
        else {
            if (this.viewMode == "new") {
                this.createRole();
            }
            else if (this.viewMode == "edit") {
                this.editRole();
            }
        }
    }
    createRole() {
        const currentRoute = this.router.url;
        this.new_role.modules_role = this.selected_modules;
        console.log(currentRoute);
        if (currentRoute.includes("/new")) {
            console.log(this.new_role);
            this._rolesService.createRole(this.new_role).subscribe((data) => {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.toastr.success("Rol creado con éxito.", "Proceso Completado", {
                        progressBar: true,
                        timeOut: 3000,
                    });
                    setTimeout(() => {
                        this.router.navigate(["/roles"]);
                    }, 3000);
                }, 3000);
            }, (error) => {
                this.loading = false;
                this.toastr.error("Fallo al crear el rol.", "Error", {
                    progressBar: true,
                });
                console.error("Error al crear el rol:", error);
            });
        }
        this.loading = true;
    }
    editRole() {
        const currentRoute = this.router.url;
        console.log(currentRoute);
        if (currentRoute.includes("/edit")) {
            if (this.id && this.new_role) {
                this.new_role.modules_role = this.selected_modules;
                console.log(this.selected_modules);
                console.log(this.new_role);
                this._rolesService.editRole(this.id, this.new_role).subscribe((data) => {
                    this.loading = false;
                    // Asegúrate de que la respuesta del servicio contiene los datos esperados
                    console.log("Respuesta del servicio editRole:", data);
                    this.toastr.success("Rol actualizado con éxito.", "Proceso Completado", {
                        progressBar: true,
                        timeOut: 3000,
                    });
                    setTimeout(() => {
                        this.router.navigate(["/roles"]);
                    }, 3000);
                }, (error) => {
                    this.loading = false;
                    this.toastr.error("Fallo al actualizar el rol.", "Error", {
                        progressBar: true,
                    });
                    console.error("Error al actualizar el rol:", error);
                });
            }
            else {
                console.error("ID o new_role no definidos correctamente.");
            }
        }
        this.loading = true;
    }
}
RolesDetailComponent.ɵfac = function RolesDetailComponent_Factory(t) { return new (t || RolesDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_shared_services_roles_service__WEBPACK_IMPORTED_MODULE_0__.RolesService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__.ToastrService)); };
RolesDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: RolesDetailComponent, selectors: [["app-roles-detail"]], decls: 13, vars: 10, consts: [[1, "breadcrumb"], [4, "ngIf"], [3, "routerLink"], ["class", "loading-screen", 4, "ngIf"], [1, "loading-screen"], [1, "loading-content"], [1, "spinner", "spinner-primary", "me-3"], [1, "row"], [1, "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title", "mb-3"], [3, "formGroup", "ngSubmit"], [1, "col-md-6", "form-group", "mb-3"], ["for", "nombre_rol"], ["type", "text", "class", "form-control", "id", "nombre_rol", 3, "value", "placeholder", "readonly", "change", 4, "ngIf"], ["type", "text", "class", "form-control", "id", "nombre_rol", 3, "value", "readonly", "touch", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "card-title"], [4, "ngFor", "ngForOf"], [1, "d-flex", "justify-content-end"], [1, "btn", "btn-danger", "float-right", 3, "routerLink"], [2, "width", "10px"], ["btnClass", "btn-primary", 3, "loading", 4, "ngIf"], ["type", "text", "id", "nombre_rol", 1, "form-control", 3, "value", "placeholder", "readonly", "change"], ["type", "text", "id", "nombre_rol", 1, "form-control", 3, "value", "readonly", "touch"], [1, "error-message"], [1, "text-danger"], [1, "checkbox", "checkbox-primary", "me-3"], ["type", "checkbox", 3, "disabled", "checked", "change"], [1, "checkmark"], ["btnClass", "btn-primary", 3, "loading"]], template: function RolesDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, RolesDetailComponent_h1_1_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, RolesDetailComponent_h1_2_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, RolesDetailComponent_h1_3_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "ul")(5, "li")(6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "Roles");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, RolesDetailComponent_li_8_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, RolesDetailComponent_li_9_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, RolesDetailComponent_li_10_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, RolesDetailComponent_div_11_Template, 3, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, RolesDetailComponent_div_12_Template, 29, 11, "div", 1);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](9, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showLoadingScreen == true && (ctx.viewMode == "edit" || ctx.viewMode == "print"));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showLoadingScreen == false || ctx.viewMode == "new");
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_1__.BtnLoadingComponent, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHref], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyb2xlcy1kZXRhaWwuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 15522:
/*!****************************************************************!*\
  !*** ./src/app/views/roles/roles-list/roles-list.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolesListComponent": () => (/* binding */ RolesListComponent)
/* harmony export */ });
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_services_roles_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/roles.service */ 21597);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 60124);











const _c0 = ["deleteConfirmModal"];
function RolesListComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 5)(1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
} }
function RolesListComponent_div_10_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Nombre del Rol ");
} }
function RolesListComponent_div_10_ng_template_15_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const row_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r11.name_role, " ");
} }
function RolesListComponent_div_10_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, RolesListComponent_div_10_ng_template_15_ng_container_0_Template, 2, 1, "ng-container", 3);
} if (rf & 2) {
    const row_r11 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r11 && row_r11.id_role);
} }
function RolesListComponent_div_10_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Estado del Rol ");
} }
function RolesListComponent_div_10_ng_template_18_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const row_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r16.state_role, " ");
} }
function RolesListComponent_div_10_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, RolesListComponent_div_10_ng_template_18_ng_container_0_Template, 2, 1, "ng-container", 3);
} if (rf & 2) {
    const row_r16 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r16 && row_r16.id_role);
} }
function RolesListComponent_div_10_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Acciones ");
} }
const _c1 = function (a1) { return ["/roles/edit", a1]; };
function RolesListComponent_div_10_ng_template_21_ng_container_0_button_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c1, row_r20.id_role));
} }
function RolesListComponent_div_10_ng_template_21_ng_container_0_label_4_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RolesListComponent_div_10_ng_template_21_ng_container_0_label_4_Template_label_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r27); const row_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).row; const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r25.openModal(row_r20.id_role, row_r20.state_role)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "input", 29)(2, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", row_r20.state_role === "Activo");
} }
const _c2 = function (a1) { return ["/roles/detail", a1]; };
function RolesListComponent_div_10_ng_template_21_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "i", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, RolesListComponent_div_10_ng_template_21_ng_container_0_button_3_Template, 2, 3, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, RolesListComponent_div_10_ng_template_21_ng_container_0_label_4_Template, 3, 1, "label", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const row_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c2, row_r20.id_role));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r20.name_role !== "Administrador" || row_r20.name_role == "Admin");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r20.name_role !== "Administrador" || row_r20.name_role == "Admin");
} }
function RolesListComponent_div_10_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, RolesListComponent_div_10_ng_template_21_ng_container_0_Template, 5, 5, "ng-container", 3);
} if (rf & 2) {
    const row_r20 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r20 && row_r20.id_role);
} }
const _c3 = function () { return ["/roles/new"]; };
function RolesListComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "div", 8)(2, "div", 9)(3, "div", 10)(4, "div", 11)(5, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Crear nuevo Rol ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 10)(8, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 14)(11, "div", 15)(12, "ngx-datatable", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("page", function RolesListComponent_div_10_Template_ngx_datatable_page_12_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r31); const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r30.onPageChange($event)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "ngx-datatable-column", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, RolesListComponent_div_10_ng_template_14_Template, 1, 0, "ng-template", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, RolesListComponent_div_10_ng_template_15_Template, 1, 1, "ng-template", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "ngx-datatable-column", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, RolesListComponent_div_10_ng_template_17_Template, 1, 0, "ng-template", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, RolesListComponent_div_10_ng_template_18_Template, 1, 1, "ng-template", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "ngx-datatable-column", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, RolesListComponent_div_10_ng_template_20_Template, 1, 0, "ng-template", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, RolesListComponent_div_10_ng_template_21_Template, 1, 1, "ng-template", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](21, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx_r1.searchControl);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("columnMode", "force")("headerHeight", 50)("footerHeight", 50)("rowHeight", 60)("scrollbarV", true)("rows", ctx_r1.listRoles)("externalPaging", true)("count", ctx_r1.listRoles.length)("limit", ctx_r1.itemsPerPage)("offset", (ctx_r1.currentPage - 1) * ctx_r1.itemsPerPage);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 450);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 450);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 450);
} }
function RolesListComponent_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 31)(1, "h4", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Cambiar Estado del Rol");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RolesListComponent_ng_template_11_Template_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r34); const modal_r32 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r32.dismiss("Cross click")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 35)(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 36)(11, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RolesListComponent_ng_template_11_Template_button_click_11_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r34); const modal_r32 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r32.dismiss("cancel")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, " Cancelar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function RolesListComponent_ng_template_11_Template_button_click_13_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r34); const modal_r32 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r32.close("Ok")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, " Aceptar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.stateMessage);
} }
class RolesListComponent {
    constructor(_rolesService, modalService, toastr, el) {
        this._rolesService = _rolesService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.el = el;
        this.showLoadingScreen = false;
        this.listRoles = [];
        this.modalAbierto = false;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.UntypedFormControl();
        this.filteredRoles = [];
        this.currentPage = 1; // Propiedad para rastrear la página actual
        this.itemsPerPage = 6; // El número de filas por página
        this.activeLayer = false;
    }
    ngOnInit() {
        this.getRoles();
    }
    getRoles() {
        this.showLoadingScreen = true;
        this._rolesService.getAllRoles().subscribe((data) => {
            this.listRoles = data;
            this.originalRowCount = this.listRoles.length;
            setTimeout(() => {
                const pageCountElement = this.el.nativeElement.querySelector(".page-count");
                if (pageCountElement) {
                    const innerText = pageCountElement.innerText;
                    pageCountElement.innerText = this.originalRowCount + " registros.";
                    console.log("Inner text de .page-count:", innerText);
                }
            });
            this.sortListRolesByState(); // Llama a la nueva función de ordenamiento
            this.adjustListRoles();
            this.showLoadingScreen = false;
        }, (error) => {
            console.error("Error al obtener roles:", error);
            this.showLoadingScreen = false;
        });
    }
    adjustListRoles() {
        const totalRows = this.listRoles.length;
        const remainingRows = 6 - (totalRows % 6);
        for (let i = 0; i < remainingRows; i++) {
            this.listRoles.push({});
        }
        this.loadData();
    }
    sortListRolesByState() {
        this.listRoles.sort((a, b) => {
            // Compara los estados
            const stateOrder = this.getStateOrder(a.state_role) - this.getStateOrder(b.state_role);
            // Si los estados son diferentes, ordena según el estado
            if (stateOrder !== 0) {
                return stateOrder;
            }
            // Si los estados son iguales, ordena por id_role
            return a.id_role - b.id_role;
        });
    }
    // Función auxiliar para asignar un valor numérico a cada estado
    getStateOrder(state) {
        // Asigna un valor numérico mayor a "Activo" y menor a "Inactivo"
        return state === "Activo" ? 1 : state === "Inactivo" ? 2 : 0;
    }
    loadData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        const totalPages = Math.ceil(this.listRoles.length / this.itemsPerPage);
        if (this.currentPage === totalPages) {
            const remainingRows = this.listRoles.length % this.itemsPerPage;
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows;
            }
        }
        // Ajusta endIndex para que sea el próximo número divisible por 6
        const rowsToAdd = 6 - (endIndex % 6);
        endIndex += rowsToAdd;
        this.filteredRoles = this.listRoles.slice(startIndex, endIndex);
        console.log("load data charged");
    }
    onPageChange(event) {
        console.log("onPageChange event:", event);
        this.currentPage = event.offset + 1;
        this.loadData();
    }
    openModal(idRole, stateRole) {
        console.log("Open modal");
        if (stateRole == "Activo") {
            this.stateMessage = "¿Está seguro de que desea desactivar éste rol?";
        }
        else if (stateRole == "Inactivo") {
            this.stateMessage = "¿Está seguro de que desea activar éste rol?";
        }
        this._rolesService.getRoleById(idRole).subscribe((data) => {
            console.log(this.modalAbierto);
            if (!this.modalAbierto) {
                this.modalAbierto = true;
                this.modalService
                    .open(this.deleteConfirmModal, { centered: true })
                    .result.then((result) => {
                    if (result === "Ok") {
                        this.activeLayer = !this.activeLayer;
                        this._rolesService.updateRoleStatus(idRole).subscribe((data) => {
                            this.modalAbierto = false;
                            this.loading = false;
                            this.toastr.success("Cambio de estado realizado con éxito.", "Proceso Completado", {
                                progressBar: true,
                                timeOut: 1000,
                            });
                            setTimeout(() => {
                                this.getRoles();
                                this.updateSwitchState(idRole);
                                this.activeLayer = !this.activeLayer;
                            }, 1000);
                        }, (error) => {
                            this.updateSwitchState(idRole);
                            this.loading = false;
                            this.toastr.error("Fallo al realizar el cambio de estado.", "Error", {
                                progressBar: true,
                                timeOut: 2000,
                            });
                            console.error("Error al cambiar de estado:", error);
                        });
                    }
                    else if (result === "Cancel") {
                        this.modalAbierto = false;
                        this.getRoles();
                        this.updateSwitchState(idRole);
                    }
                }, (reason) => {
                    this.modalAbierto = false;
                    this.getRoles();
                    this.updateSwitchState(idRole);
                });
            }
        }, (error) => {
            console.error("Error al obtener el rol:", error);
            this.updateSwitchState(idRole);
        });
    }
    updateSwitchState(idRole) {
        const role = this.listRoles.find((role) => role.id_role === idRole);
        if (role) {
            role.state_role = role.state_role === "Activo" ? "Inactivo" : "Activo";
        }
    }
}
RolesListComponent.ɵfac = function RolesListComponent_Factory(t) { return new (t || RolesListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_services_roles_service__WEBPACK_IMPORTED_MODULE_0__.RolesService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__.ToastrService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef)); };
RolesListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: RolesListComponent, selectors: [["app-roles-list"]], viewQuery: function RolesListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DatatableComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.table = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.deleteConfirmModal = _t.first);
    } }, decls: 13, vars: 2, consts: [[1, "breadcrumb"], [1, "separator-breadcrumb", "border-top"], ["class", "loading-screen", 4, "ngIf"], [4, "ngIf"], ["deleteConfirmModal", ""], [1, "loading-screen"], [1, "loading-content"], [1, "spinner", "spinner-primary", "me-3"], [1, "row", "mb-3"], [1, "col-md-12", "mb-3", "d-flex", "justify-content-between", "align-items-center"], [1, "col-md-4"], [1, "form-group"], [1, "btn", "btn-primary", 3, "routerLink"], ["id", "role", "placeholder", "Buscar Rol", "type", "role", 1, "form-control", 3, "formControl"], [1, "col-md-12"], [1, "card", "o-hidden"], [1, "material", "fullscreen", 2, "height", "460px", 3, "columnMode", "headerHeight", "footerHeight", "rowHeight", "scrollbarV", "rows", "externalPaging", "count", "limit", "offset", "page"], ["name", "name_role", 3, "resizeable", "canAutoResize", "minWidth"], ["ngx-datatable-header-template", ""], ["ngx-datatable-cell-template", ""], ["name", "state_role", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "actions", 3, "resizeable", "canAutoResize", "minWidth"], [1, "btn", "btn-dark", "m-1", 3, "routerLink"], [1, "i-Eye"], ["class", "btn btn-info m-1", 3, "routerLink", 4, "ngIf"], ["class", "switch switch-success me-3", 3, "click", 4, "ngIf"], [1, "btn", "btn-info", "m-1", 3, "routerLink"], [1, "i-Pen-4"], [1, "switch", "switch-success", "me-3", 3, "click"], ["type", "checkbox", 3, "checked"], [1, "slider"], [1, "modal-header"], ["id", "modal-title", 1, "modal-title"], ["type", "button", "aria-label", "Close button", "aria-describedby", "modal-title", 1, "btn", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-outline-secondary", "btn", 3, "click"], ["type", "button", "ngbAutofocus", "", 1, "btn", "btn-wide", "btn-danger", "btn", 3, "click"]], template: function RolesListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Roles");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul")(4, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Configuraciones");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Roles");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, RolesListComponent_div_9_Template, 3, 0, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, RolesListComponent_div_10_Template, 22, 22, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, RolesListComponent_ng_template_11_Template, 15, 1, "ng-template", null, 4, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showLoadingScreen);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showLoadingScreen == false);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DatatableComponent, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DataTableColumnDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DataTableColumnHeaderDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DataTableColumnCellDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyb2xlcy1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 47236:
/*!*****************************************************!*\
  !*** ./src/app/views/roles/roles-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolesRoutingModule": () => (/* binding */ RolesRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _roles_list_roles_list_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roles-list/roles-list.component */ 15522);
/* harmony import */ var _roles_detail_roles_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roles-detail/roles-detail.component */ 71226);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);





const routes = [
    {
        path: '',
        component: _roles_list_roles_list_component__WEBPACK_IMPORTED_MODULE_0__.RolesListComponent
    },
    {
        path: 'new',
        component: _roles_detail_roles_detail_component__WEBPACK_IMPORTED_MODULE_1__.RolesDetailComponent
    },
    {
        path: 'edit/:id_role',
        component: _roles_detail_roles_detail_component__WEBPACK_IMPORTED_MODULE_1__.RolesDetailComponent
    },
    {
        path: 'detail/:id_role',
        component: _roles_detail_roles_detail_component__WEBPACK_IMPORTED_MODULE_1__.RolesDetailComponent
    }
];
class RolesRoutingModule {
}
RolesRoutingModule.ɵfac = function RolesRoutingModule_Factory(t) { return new (t || RolesRoutingModule)(); };
RolesRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: RolesRoutingModule });
RolesRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](RolesRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 57445:
/*!*********************************************!*\
  !*** ./src/app/views/roles/roles.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolesModule": () => (/* binding */ RolesModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _roles_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./roles-routing.module */ 47236);
/* harmony import */ var _roles_list_roles_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roles-list/roles-list.component */ 15522);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/components/shared-components.module */ 50933);
/* harmony import */ var _roles_detail_roles_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./roles-detail/roles-detail.component */ 71226);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);









class RolesModule {
}
RolesModule.ɵfac = function RolesModule_Factory(t) { return new (t || RolesModule)(); };
RolesModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: RolesModule });
RolesModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_2__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _roles_routing_module__WEBPACK_IMPORTED_MODULE_0__.RolesRoutingModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](RolesModule, { declarations: [_roles_list_roles_list_component__WEBPACK_IMPORTED_MODULE_1__.RolesListComponent, _roles_detail_roles_detail_component__WEBPACK_IMPORTED_MODULE_3__.RolesDetailComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_2__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _roles_routing_module__WEBPACK_IMPORTED_MODULE_0__.RolesRoutingModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_views_roles_roles_module_ts.js.map