"use strict";
(self["webpackChunkgull"] = self["webpackChunkgull"] || []).push([["src_app_views_employees_employee_module_ts"],{

/***/ 67894:
/*!*****************************************************!*\
  !*** ./src/app/shared/services/employee.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeesService": () => (/* binding */ EmployeesService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 66587);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 47418);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 58987);




class EmployeesService {
    constructor(http) {
        this.http = http;
        this.url = 'https://api-cosmetic-w32d.onrender.com/api/employees';
    }
    getAllEmployees() {
        return this.http.get(this.url);
    }
    createEmployee(employee) {
        return this.http.post(this.url, employee).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.catchError)((error) => {
            console.error('Error en la solicitud:', error);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)('Ocurrió un error al crear el empleado. Por favor, inténtalo de nuevo.');
        }));
    }
    updateEmployee(id, updatedData) {
        return this.http.put(`${this.url}/${id}`, updatedData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.catchError)((error) => {
            console.error('Error en la solicitud:', error);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)('Ocurrió un error al actualizar el empleado. Por favor, inténtalo de nuevo.');
        }));
    }
    checkCedulaAvailability(cedula) {
        return this.http.get(`${this.url}-check-cedula?cedula=${cedula}`);
    }
    checkEmailAvailability(email) {
        return this.http.get(`${this.url}-check-email?email=${email}`);
    }
    getEmployeesById(id) {
        return this.http.get(`${this.url}/${id}`);
    }
    employeeChangeStatus(id) {
        return this.http.put(`${this.url}/changeState/${id}`, {});
    }
}
EmployeesService.ɵfac = function EmployeesService_Factory(t) { return new (t || EmployeesService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient)); };
EmployeesService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: EmployeesService, factory: EmployeesService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 44665:
/*!******************************************************************************!*\
  !*** ./src/app/views/employees/employee-detail/employee-detail.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeeDetailComponent": () => (/* binding */ EmployeeDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _models_employee_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/employee.model */ 60594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var src_app_shared_services_employee_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/services/employee.service */ 67894);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/components/btn-loading/btn-loading.component */ 38845);









function EmployeeDetailComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Registrar Empleado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Editar Empleado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_h1_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Ver Detalle de Empleado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_li_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Registrar Empleado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_li_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Editar Empleado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_li_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Ver Detalle de Empleado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo C\u00E9dula es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " La c\u00E9dula debe contener minimo 7 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo C\u00E9dula no puede superar los 10 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo C\u00E9dula debe contener solo n\u00FAmeros. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "La c\u00E9dula ya est\u00E1 en uso.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Nombre es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Nombre no puede tener simbolos y solo puede tener 1 numero. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Nombre no puede superar los 80 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Correo es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Correo debe ser un formato de correo electr\u00F3nico v\u00E1lido. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_49_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "El dominio del correo no es v\u00E1lido.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Correo no puede superar los 80 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "El correo electr\u00F3nico ya est\u00E1 en uso.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_58_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Direcci\u00F3n es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Direcci\u00F3n no puede superar los 80 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_66_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Tel\u00E9fono es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_67_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Tel\u00E9fono no puede superar los 80 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_68_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Tel\u00E9fono debe seguir un formato v\u00E1lido. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_69_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11)(1, "label", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Estado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_76_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Observaci\u00F3n es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_77_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Observaci\u00F3n no puede superar los 100 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_div_78_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11)(1, "label", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Fecha de creacion");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function EmployeeDetailComponent_btn_loading_82_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "btn-loading", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("loading", ctx_r28.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r28.viewMode == "new" ? "Registrar Empleado" : "Editar Empleado", " ");
} }
const _c0 = function () { return ["/employees"]; };
class EmployeeDetailComponent {
    constructor(formBuilder, route, router, fb, toastr, employeesService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.toastr = toastr;
        this.employeesService = employeesService;
        this.loading = false;
        this.viewMode = 'new';
        this.invoice = {};
    }
    ngOnInit() {
        this.id = this.route.snapshot.params['id_employee'];
        this.isNew = !this.id;
        this.setViewMode();
        this.inicializateForm(Number(this.id));
    }
    inicializateForm(id) {
        this.employeeForm = this.formBuilder.group({
            id_card_employee: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(7), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern('^[0-9]+$')]],
            name_employee: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80)], [this.validateNameSimbolAndNumber]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80)]],
            address: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80)]],
            phone: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern('^[0-9]{10}$')]],
            observation: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(100)]],
            state_employee: [],
            creation_date_employee: []
        });
        if (this.viewMode == 'print') {
            this.employeeForm.disable();
        }
        if (this.viewMode == 'edit') {
            this.cedula.disable();
        }
        if (this.viewMode != 'new') {
            this.getEmployeeByID(id);
        }
    }
    getEmployeeByID(id) {
        this.loading = true;
        this.employeesService.getEmployeesById(id).subscribe({
            next: (response) => {
                this.employeeData = new _models_employee_model__WEBPACK_IMPORTED_MODULE_0__.EmployeeFormModel(response);
                this.setDataEmployee();
            },
            error: (err) => {
                console.log('err', err);
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            },
        });
    }
    setDataEmployee() {
        if (this.employeeData) {
            this.cedula.setValue(this.employeeData.id_card_employee);
            this.employeeForm.setValue(this.employeeData);
        }
    }
    createEmployee() {
        if (this.employeeForm.valid) {
            const employeeData = this.employeeForm.value;
            this.loading = true;
            this.employeesService.createEmployee(employeeData).subscribe((response) => {
                this.loading = false;
                console.log("Éxito al crear empleado: ", response);
                this.submit();
            }, (error) => {
                this.loading = false;
                console.error("Error al crear empleado: ", this.toastr.error);
                const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el empleado.';
                this.toastr.error(errorMessage, 'Error');
            });
        }
        else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
        }
    }
    validateNameSimbolAndNumber(control) {
        const nameValue = control.value;
        const combinedPattern = /^[\wáéíóúñÑ´\s]+$/;
        return new Promise((resolve) => {
            setTimeout(() => {
                if (combinedPattern.test(nameValue)) {
                    const numberCount = (nameValue.match(/\d/g) || []).length;
                    if (numberCount <= 1) {
                        resolve(null); // Válido
                    }
                    else {
                        resolve({ invalidName: true }); // No válido
                    }
                }
                else {
                    resolve({ invalidName: true }); // No válido
                }
            }, 0);
        });
    }
    checkEmailAvailability() {
        if (this.email && this.email instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_4__.AbstractControl) {
            this.validateEmail(this.email).then((result) => {
                if (result) {
                    this.email.setErrors(result);
                }
            });
        }
    }
    validateEmail(control) {
        const email = control.value.toLowerCase();
        const validDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
        const domain = email.split('@')[1];
        if (!email) {
            return Promise.resolve(null); // Correo vacío es válido
        }
        if (validDomains.includes(domain)) {
            return new Promise((resolve) => {
                if (!control.value) {
                    resolve(null);
                }
                else {
                    this.employeesService.checkEmailAvailability(control.value).subscribe((isAvailable) => {
                        if (isAvailable) {
                            resolve(null); // El correo es válido y está disponible
                        }
                        else {
                            resolve({ emailTaken: true }); // El correo no está disponible
                        }
                    }, (error) => {
                        resolve({ emailTaken: true });
                    });
                }
            });
        }
        else {
            return Promise.resolve({ invalidDomain: true }); // No es un correo válido en el dominio permitido
        }
    }
    checkCedulaAvailability() {
        if (this.cedula && this.cedula instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_4__.AbstractControl) {
            this.validateCedulaAvailability(this.cedula).then((result) => {
                if (result) {
                    this.cedula.setErrors(result);
                }
            });
        }
    }
    validateCedulaAvailability(control) {
        return new Promise((resolve) => {
            if (!control.value) {
                resolve(null);
            }
            else {
                this.employeesService.checkCedulaAvailability(control.value).subscribe((isAvailable) => {
                    if (isAvailable) {
                        resolve(null);
                    }
                    else {
                        resolve({ cedulaTaken: true });
                    }
                }, (error) => {
                    resolve({ cedulaTaken: true });
                });
            }
        });
    }
    saveEmployeeChanges(id, updatedData) {
        this.employeesService.updateEmployee(id, updatedData).subscribe((response) => {
            this.loading = false;
            this.submit();
        }, (error) => {
            this.loading = false;
            console.error("Error al crear empleado: ", this.toastr.error);
            const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el empleado.';
            this.toastr.error(errorMessage, 'Error');
        });
    }
    submitEmployee() {
        if (this.viewMode == 'new') {
            this.createEmployee();
        }
        else if (this.viewMode == 'edit') {
            this.saveChanges();
        }
    }
    saveChanges() {
        console.log('editar');
        if (this.employeeForm.valid) {
            const id = Number(this.id); // Convierte el ID a número
            const updatedData = {
                id_card_employee: this.cedula.value,
                name_employee: this.employeeForm.get('name_employee').value,
                email: this.email.value,
                address: this.employeeForm.get('address').value,
                phone: this.employeeForm.get('phone').value,
                observation: this.employeeForm.get('observation').value,
            };
            this.saveEmployeeChanges(id, updatedData);
        }
        else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
        }
    }
    cancel() {
        this.router.navigateByUrl('/employees');
    }
    submit() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.toastr.success('Empleado registrado con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
                setTimeout(() => {
                    this.router.navigateByUrl('/employees');
                }, 3000);
            }, 3000);
        }
    }
    setViewMode() {
        const currentRoute = this.router.url;
        if (currentRoute.includes('/new')) {
            this.viewMode = 'new';
        }
        else if (currentRoute.includes('/edit/')) {
            this.viewMode = 'edit';
        }
        else if (currentRoute.includes('/print/')) {
            this.viewMode = 'print';
        }
    }
    print() {
        if (window) {
            window.print();
        }
    }
    get email() {
        return this.employeeForm.get('email');
    }
    get cedula() {
        return this.employeeForm.get('id_card_employee');
    }
}
EmployeeDetailComponent.ɵfac = function EmployeeDetailComponent_Factory(t) { return new (t || EmployeeDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_6__.ToastrService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_shared_services_employee_service__WEBPACK_IMPORTED_MODULE_1__.EmployeesService)); };
EmployeeDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: EmployeeDetailComponent, selectors: [["app-empleado-detail"]], decls: 83, vars: 32, consts: [[1, "breadcrumb"], [4, "ngIf"], [3, "routerLink"], [1, "separator-breadcrumb", "border-top"], [1, "form-container"], [1, "row"], [1, "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title", "mb-3"], [3, "formGroup", "ngSubmit"], [1, "col-md-6", "form-group", "mb-3"], ["for", "id_card_employee"], [1, "text-danger"], ["type", "text", "id", "id_card_employee", "placeholder", "C\u00E9dula de empleado", "formControlName", "id_card_employee", 1, "form-control", 3, "change"], ["class", "error-message", 4, "ngIf"], ["for", "name_employee"], ["type", "text", "id", "name_employee", "placeholder", "Nombre de empleado", "formControlName", "name_employee", "required", "", 1, "form-control"], ["for", "email"], ["type", "email", "id", "email", "placeholder", "Correo", "formControlName", "email", 1, "form-control", 3, "change"], ["for", "address"], ["id", "address", "placeholder", "Direcci\u00F3n", "formControlName", "address", "required", "", 1, "form-control"], ["for", "phone"], ["id", "phone", "placeholder", "Tel\u00E9fono", "formControlName", "phone", "required", "", 1, "form-control"], ["class", "col-md-6 form-group mb-3", 4, "ngIf"], ["for", "observation"], ["id", "observation", "placeholder", "Observaci\u00F3n", "formControlName", "observation", "required", "", 1, "form-control"], [1, "form-group", "text-right", 2, "text-align", "right"], ["type", "button", 1, "btn", "btn-danger", "ml-2", 3, "click"], ["btnClass", "btn btn-primary m-1 custom-button", 3, "loading", 4, "ngIf"], [1, "error-message"], ["for", "state_employee"], ["id", "state_employee", "placeholder", "state_employee", "formControlName", "state_employee", 1, "form-control"], ["for", "creation_date_employee"], ["id", "creation_date_employee", "placeholder", "Fecha de Creacion", "formControlName", "creation_date_employee", 1, "form-control"], ["btnClass", "btn btn-primary m-1 custom-button", 3, "loading"]], template: function EmployeeDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, EmployeeDetailComponent_h1_1_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, EmployeeDetailComponent_h1_2_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, EmployeeDetailComponent_h1_3_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ul")(5, "li")(6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Empleados");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, EmployeeDetailComponent_li_8_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, EmployeeDetailComponent_li_9_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, EmployeeDetailComponent_li_10_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 4)(13, "div", 5)(14, "div", 6)(15, "div", 7)(16, "div", 8)(17, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Formulario de Empleados");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function EmployeeDetailComponent_Template_form_ngSubmit_19_listener() { return ctx.submitEmployee(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 5)(21, "div", 11)(22, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "C\u00E9dula de empleado");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function EmployeeDetailComponent_Template_input_change_26_listener() { return ctx.checkCedulaAvailability(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](27, EmployeeDetailComponent_div_27_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](28, EmployeeDetailComponent_div_28_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](29, EmployeeDetailComponent_div_29_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](30, EmployeeDetailComponent_div_30_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, EmployeeDetailComponent_div_31_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 11)(33, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Nombre de empleado");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](37, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](38, EmployeeDetailComponent_div_38_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](39, EmployeeDetailComponent_div_39_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](40, EmployeeDetailComponent_div_40_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "div", 11)(42, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "Correo");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](45, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function EmployeeDetailComponent_Template_input_change_46_listener() { return ctx.checkEmailAvailability; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](47, EmployeeDetailComponent_div_47_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](48, EmployeeDetailComponent_div_48_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](49, EmployeeDetailComponent_div_49_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](50, EmployeeDetailComponent_div_50_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](51, EmployeeDetailComponent_div_51_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "div", 11)(53, "label", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, "Direcci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](56, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](57, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](58, EmployeeDetailComponent_div_58_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](59, EmployeeDetailComponent_div_59_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](60, "div", 11)(61, "label", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](62, "Tel\u00E9fono");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](64, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](65, "input", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](66, EmployeeDetailComponent_div_66_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](67, EmployeeDetailComponent_div_67_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](68, EmployeeDetailComponent_div_68_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](69, EmployeeDetailComponent_div_69_Template, 6, 0, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](70, "div", 11)(71, "label", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](72, "Observaci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](74, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](75, "textarea", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](76, EmployeeDetailComponent_div_76_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](77, EmployeeDetailComponent_div_77_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](78, EmployeeDetailComponent_div_78_Template, 6, 0, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "div", 27)(80, "button", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function EmployeeDetailComponent_Template_button_click_80_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](81, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](82, EmployeeDetailComponent_btn_loading_82_Template, 2, 2, "btn-loading", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](31, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.employeeForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("id_card_employee").touched && ctx.employeeForm.get("id_card_employee").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("id_card_employee").hasError("minlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("id_card_employee").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("id_card_employee").hasError("pattern"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("id_card_employee").hasError("cedulaTaken"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("name_employee").touched && ctx.employeeForm.get("name_employee").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("name_employee").hasError("invalidName"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("name_employee").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("email").touched && ctx.employeeForm.get("email").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("email").hasError("email"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("email").hasError("invalidDomain"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("email").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("email").hasError("emailTaken"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("address").touched && ctx.employeeForm.get("address").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("address").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("phone").touched && ctx.employeeForm.get("phone").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("phone").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("phone").hasError("pattern"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode == "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("observation").touched && ctx.employeeForm.get("observation").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.employeeForm.get("observation").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode == "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode !== "print");
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_2__.BtnLoadingComponent, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLinkWithHref], styles: [".error-message[_ngcontent-%COMP%] {\n  color: red;\n}\n\n.custom-button[_ngcontent-%COMP%] {\n  color: #663399; \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcGxveWVlLWRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFVBQUE7QUFDSjs7QUFFQTtFQUNJLGNBQUEsRUFBQSxtQ0FBQTtBQUNKIiwiZmlsZSI6ImVtcGxveWVlLWRldGFpbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lcnJvci1tZXNzYWdlIHtcclxuICAgIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcbi5jdXN0b20tYnV0dG9uIHtcclxuICAgIGNvbG9yOiAjNjYzMzk5OyAvKiBDb2xvciBwZXJzb25hbGl6YWRvIHF1ZSBkZXNlZXMgKi9cclxufSJdfQ== */"] });


/***/ }),

/***/ 32308:
/*!**************************************************************************!*\
  !*** ./src/app/views/employees/employee-list/employee-list.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeeListComponent": () => (/* binding */ EmployeeListComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 80823);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_services_employee_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/employee.service */ 67894);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 60124);









const _c0 = ["deleteConfirmModal"];
function EmployeeListComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " C\u00E9dula ");
} }
function EmployeeListComponent_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r13.id_card_employee, " ");
} }
function EmployeeListComponent_ng_template_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Nombre ");
} }
function EmployeeListComponent_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r15 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r15.name_employee, " ");
} }
function EmployeeListComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Correo ");
} }
function EmployeeListComponent_ng_template_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r17 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r17.email, " ");
} }
function EmployeeListComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Estado ");
} }
function EmployeeListComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r19.state_employee, " ");
} }
function EmployeeListComponent_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Acciones ");
} }
const _c1 = function (a1) { return ["/employees/print", a1]; };
const _c2 = function (a1) { return ["/employees/edit", a1]; };
function EmployeeListComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function EmployeeListComponent_ng_template_35_Template_label_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r23); const row_r21 = restoredCtx.row; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r22.openModal(row_r21.id_employee)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 26)(6, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r21 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c1, row_r21.id_employee));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c2, row_r21.id_employee));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", row_r21.state_employee === "Activo");
} }
function EmployeeListComponent_ng_template_36_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 28)(1, "h4", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Cambiar Estado Empleado");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function EmployeeListComponent_ng_template_36_Template_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.dismiss("Cross click")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 32)(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "\u00BFEst\u00E1 seguro de que desea inhabilitar este Empleado?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 33)(11, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function EmployeeListComponent_ng_template_36_Template_button_click_11_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.dismiss("cancel")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function EmployeeListComponent_ng_template_36_Template_button_click_13_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.close("Ok")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Aceptar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
} }
const _c3 = function () { return ["/employees/new"]; };
class EmployeeListComponent {
    constructor(_employeeService, modalService, toastr) {
        this._employeeService = _employeeService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.UntypedFormControl();
        this.pageSize = 10;
        this.currentPage = 1;
        this.modalAbierto = false;
    }
    ngOnInit() {
        this.getEmployees();
        this.searchControl.valueChanges
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(200))
            .subscribe(value => {
            this.filterData(value);
        });
    }
    getEmployees() {
        this._employeeService.getAllEmployees().subscribe(data => {
            this.listEmployees = data.sort((a, b) => a.id_employee - b.id_employee);
            this.filteredEmployees = [...this.listEmployees];
        }, error => {
            console.log(error);
        });
    }
    filterData(value) {
        if (value) {
            value = value.toLowerCase();
        }
        else {
            this.filteredEmployees = [...this.listEmployees];
            return;
        }
        this.filteredEmployees = this.listEmployees.filter(employee => {
            const cedulaMatch = employee.id_card_employee.toLowerCase().includes(value);
            const nombreMatch = employee.name_employee.toLowerCase().includes(value);
            const correoMatch = employee.email.toLowerCase().includes(value);
            const estadoMatch = employee.state_employee.toLowerCase().includes(value);
            return cedulaMatch || nombreMatch || correoMatch || estadoMatch;
        });
        this.currentPage = 1;
    }
    openModal(idEmployee) {
        if (!this.modalAbierto) {
            this.modalAbierto = true;
            this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then((result) => {
                if (result === 'Ok') {
                    this._employeeService.employeeChangeStatus(idEmployee).subscribe((data) => {
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
                    this.modalAbierto = false;
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                }
            }, (reason) => {
                this.modalAbierto = false;
                location.reload();
            });
        }
    }
}
EmployeeListComponent.ɵfac = function EmployeeListComponent_Factory(t) { return new (t || EmployeeListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_services_employee_service__WEBPACK_IMPORTED_MODULE_0__.EmployeesService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__.ToastrService)); };
EmployeeListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: EmployeeListComponent, selectors: [["app-employee-list"]], viewQuery: function EmployeeListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.deleteConfirmModal = _t.first);
    } }, decls: 38, vars: 24, consts: [[1, ""], [1, "breadcrumb"], ["href", "#"], [1, "separator-breadcrumb", "border-top"], [1, "row", "mb-3"], [1, "col-md-4"], [1, "form-group"], ["id", "search", "placeholder", "Buscar Empleados", "type", "text", 1, "form-control", "form-control-rounded", 3, "formControl"], [1, "col-md-12", "mb-3"], [1, "btn", "btn-primary", "float-right", 3, "routerLink"], [1, "col-md-12"], [1, "card", "o-hidden"], [1, "material", "fullscreen", 2, "height", "460px", 3, "columnMode", "headerHeight", "footerHeight", "rowHeight", "scrollbarV", "rows"], ["name", "id_card_employee", 3, "resizeable", "canAutoResize", "minWidth"], ["ngx-datatable-header-template", ""], ["ngx-datatable-cell-template", ""], ["name", "name_employee", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "email", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "state_employee", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "actions", 3, "resizeable", "canAutoResize", "minWidth"], ["deleteConfirmModal", ""], [1, "btn", "btn-dark", "m-1", 3, "routerLink"], [1, "i-Eye"], [1, "btn", "btn-info", "m-1", 3, "routerLink"], [1, "i-Pen-4"], [1, "switch", "switch-success", "me-3", 3, "click"], ["type", "checkbox", 3, "checked"], [1, "slider"], [1, "modal-header"], ["id", "modal-title", 1, "modal-title"], ["type", "button", "aria-label", "Close button", "aria-describedby", "modal-title", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-outline-secondary", "btn-rounded", 3, "click"], ["type", "button", "ngbAutofocus", "", 1, "btn", "btn-wide", "btn-danger", "btn-rounded", 3, "click"]], template: function EmployeeListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Listar Empleados");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ul")(5, "li")(6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Servicios");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Empleados");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 4)(12, "div", 5)(13, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 8)(16, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Crear nuevo Empleado");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 10)(19, "div", 11)(20, "ngx-datatable", 12)(21, "ngx-datatable-column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, EmployeeListComponent_ng_template_22_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, EmployeeListComponent_ng_template_23_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "ngx-datatable-column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, EmployeeListComponent_ng_template_25_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](26, EmployeeListComponent_ng_template_26_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "ngx-datatable-column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, EmployeeListComponent_ng_template_28_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, EmployeeListComponent_ng_template_29_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "ngx-datatable-column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, EmployeeListComponent_ng_template_31_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, EmployeeListComponent_ng_template_32_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "ngx-datatable-column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](34, EmployeeListComponent_ng_template_34_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, EmployeeListComponent_ng_template_35_Template, 7, 7, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, EmployeeListComponent_ng_template_36_Template, 15, 0, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.searchControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](23, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("columnMode", "force")("headerHeight", 50)("footerHeight", 50)("rowHeight", 60)("scrollbarV", true)("rows", ctx.filteredEmployees);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 200);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 180);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 50);
    } }, dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DatatableComponent, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DataTableColumnDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DataTableColumnHeaderDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DataTableColumnCellDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink], styles: ["@charset \"UTF-8\";\n.no-scroll-table[_ngcontent-%COMP%] {\n  max-height: 500px; \n  overflow-y: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtcGxveWVlLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCO0VBQ0ksaUJBQUEsRUFBQSxrREFBQTtFQUNBLGtCQUFBO0FBRUoiLCJmaWxlIjoiZW1wbG95ZWUtbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uby1zY3JvbGwtdGFibGUge1xyXG4gICAgbWF4LWhlaWdodDogNTAwcHg7IC8qIEFqdXN0YSBsYSBhbHR1cmEgbcOheGltYSBzZWfDum4gdHVzIG5lY2VzaWRhZGVzICovXHJcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbiAgfVxyXG4gICJdfQ== */"] });


/***/ }),

/***/ 13229:
/*!************************************************************!*\
  !*** ./src/app/views/employees/employee-routing.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeeRoutingModule": () => (/* binding */ EmployeeRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _employee_detail_employee_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./employee-detail/employee-detail.component */ 44665);
/* harmony import */ var _employee_list_employee_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./employee-list/employee-list.component */ 32308);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);





const routes = [
    {
        path: '',
        component: _employee_list_employee_list_component__WEBPACK_IMPORTED_MODULE_1__.EmployeeListComponent
    },
    {
        path: 'new',
        component: _employee_detail_employee_detail_component__WEBPACK_IMPORTED_MODULE_0__.EmployeeDetailComponent
    },
    {
        path: 'edit/:id_employee',
        component: _employee_detail_employee_detail_component__WEBPACK_IMPORTED_MODULE_0__.EmployeeDetailComponent
    },
    {
        path: 'print/:id_employee',
        component: _employee_detail_employee_detail_component__WEBPACK_IMPORTED_MODULE_0__.EmployeeDetailComponent
    }
];
class EmployeeRoutingModule {
}
EmployeeRoutingModule.ɵfac = function EmployeeRoutingModule_Factory(t) { return new (t || EmployeeRoutingModule)(); };
EmployeeRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: EmployeeRoutingModule });
EmployeeRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](EmployeeRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 24138:
/*!****************************************************!*\
  !*** ./src/app/views/employees/employee.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeeModule": () => (/* binding */ EmployeeModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/components/shared-components.module */ 50933);
/* harmony import */ var _employee_detail_employee_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./employee-detail/employee-detail.component */ 44665);
/* harmony import */ var _employee_list_employee_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./employee-list/employee-list.component */ 32308);
/* harmony import */ var _employee_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./employee-routing.module */ 13229);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);









class EmployeeModule {
}
EmployeeModule.ɵfac = function EmployeeModule_Factory(t) { return new (t || EmployeeModule)(); };
EmployeeModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: EmployeeModule });
EmployeeModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _employee_routing_module__WEBPACK_IMPORTED_MODULE_3__.EmployeeRoutingModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](EmployeeModule, { declarations: [_employee_detail_employee_detail_component__WEBPACK_IMPORTED_MODULE_1__.EmployeeDetailComponent, _employee_list_employee_list_component__WEBPACK_IMPORTED_MODULE_2__.EmployeeListComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _employee_routing_module__WEBPACK_IMPORTED_MODULE_3__.EmployeeRoutingModule] }); })();


/***/ }),

/***/ 60594:
/*!**********************************************************!*\
  !*** ./src/app/views/employees/models/employee.model.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EmployeeFormModel": () => (/* binding */ EmployeeFormModel)
/* harmony export */ });
class EmployeeFormModel {
    constructor(response) {
        this.id_card_employee = response.id_card_employee;
        this.name_employee = response.name_employee;
        this.email = response.email;
        this.address = response.address;
        this.phone = response.phone;
        this.state_employee = response.state_employee;
        this.observation = response.observation;
        this.creation_date_employee = response.creation_date_employee;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_app_views_employees_employee_module_ts.js.map