"use strict";
(self["webpackChunkgull"] = self["webpackChunkgull"] || []).push([["src_app_views_clients_client_module_ts"],{

/***/ 97641:
/*!***************************************************!*\
  !*** ./src/app/shared/services/client.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientsService": () => (/* binding */ ClientsService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 66587);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 47418);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 58987);




class ClientsService {
    constructor(http) {
        this.http = http;
        this.url = 'https://api-cosmetic-w32d.onrender.com/api/clients';
    }
    getAllClients() {
        return this.http.get(this.url);
    }
    createClient(client) {
        return this.http.post(this.url, client).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.catchError)((error) => {
            console.error('Error en la solicitud:', error);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)('Ocurrió un error al crear el cliente. Por favor, inténtalo de nuevo.');
        }));
    }
    updateClient(id, updatedData) {
        return this.http.put(`${this.url}/${id}`, updatedData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.catchError)((error) => {
            console.error('Error en la solicitud:', error);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)('Ocurrió un error al actualizar el cliente. Por favor, inténtalo de nuevo.');
        }));
    }
    checkCedulaAvailability(nit_or_id_client) {
        return this.http.get(`${this.url}-check-cedula?cedula=${nit_or_id_client}`);
    }
    checkEmailAvailability(email_client) {
        return this.http.get(`${this.url}-check-email?email=${email_client}`);
    }
    getClientsById(id) {
        return this.http.get(`${this.url}/${id}`);
    }
    clientChangeStatus(id) {
        return this.http.put(`${this.url}/change-status/${id}`, {});
    }
}
ClientsService.ɵfac = function ClientsService_Factory(t) { return new (t || ClientsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient)); };
ClientsService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ClientsService, factory: ClientsService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 21141:
/*!************************************************************************!*\
  !*** ./src/app/views/clients/client-detail/client-detail.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientDetailComponent": () => (/* binding */ ClientDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _models_client_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/client.model */ 25729);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var src_app_shared_services_client_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/services/client.service */ 97641);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/components/btn-loading/btn-loading.component */ 38845);









function ClientDetailComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Registrar cliente");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Editar cliente");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_h1_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Ver detalle de cliente");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_li_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Registrar cliente");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_li_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Editar cliente");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_li_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Ver detalle de cliente");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo c\u00E9dula o nit es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " La c\u00E9dula debe contener minimo 7 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo c\u00E9dula no puede superar los 10 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo c\u00E9dula debe contener solo n\u00FAmeros. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "La c\u00E9dula ya est\u00E1 en uso.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo nombre es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo nombre no puede tener simbolos y solo puede tener 1 n\u00FAmero. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo nombre no puede superar los 80 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo correo es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_54_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo correo debe ser un formato de correo electr\u00F3nico v\u00E1lido. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_55_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "El dominio del correo no es v\u00E1lido.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_56_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo correo no puede superar los 80 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_57_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "El correo electr\u00F3nico ya est\u00E1 en uso.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_64_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo direcci\u00F3n es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_65_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo direcci\u00F3n no puede superar los 80 car\u00E1cteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_72_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo tel\u00E9fono es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_73_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo tel\u00E9fono no puede superar los 80 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_74_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo tel\u00E9fono debe seguir un formato v\u00E1lido. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_div_75_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11)(1, "label", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Estado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ClientDetailComponent_btn_loading_79_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "btn-loading", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("loading", ctx_r25.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r25.viewMode == "new" ? "Registrar cliente" : "Editar cliente", " ");
} }
const _c0 = function () { return ["/clients"]; };
class ClientDetailComponent {
    constructor(formBuilder, route, router, fb, toastr, clientsService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.toastr = toastr;
        this.clientsService = clientsService;
        this.loading = false;
        this.viewMode = 'new';
        this.invoice = {};
    }
    ngOnInit() {
        this.id = this.route.snapshot.params['id_client'];
        this.isNew = !this.id;
        this.setViewMode();
        this.inicializateForm(Number(this.id));
    }
    inicializateForm(id) {
        this.clientForm = this.formBuilder.group({
            nit_or_id_client: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(7), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern('^[0-9]+$')]],
            name_client: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80)], [this.validateNameSimbolAndNumber]],
            last_name_client: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80)], [this.validateNameSimbolAndNumber]],
            email_client: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80)]],
            address_client: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80)]],
            phone_client: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern('^[0-9]{10}$')]],
            state_client: []
        });
        if (this.viewMode == 'print') {
            this.clientForm.disable();
        }
        if (this.viewMode == 'edit') {
            this.nit_or_id_client.disable();
        }
        if (this.viewMode != 'new') {
            this.getClientByID(id);
        }
    }
    getClientByID(id) {
        this.loading = true;
        this.clientsService.getClientsById(id).subscribe({
            next: (response) => {
                this.clientData = new _models_client_model__WEBPACK_IMPORTED_MODULE_0__.ClientFormModel(response);
                this.setDataClient();
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
    // private setDataClient(): void {
    //     if (this.clientData) {
    //         this.clientForm.setValue(this.clientData)
    //         console.log(this.clientForm)
    //     }
    // }
    setDataClient() {
        if (this.clientData) {
            this.nit_or_id_client.setValue(this.clientData.nit_or_id_client);
            this.clientForm.setValue(this.clientData);
        }
    }
    createClient() {
        if (this.clientForm.valid) {
            const clientData = this.clientForm.value;
            this.loading = true;
            this.clientsService.createClient(clientData).subscribe((response) => {
                this.loading = false;
                console.log("Éxito al crear cliente: ", response);
                this.submit();
            }, (error) => {
                this.loading = false;
                console.error("Error al crear cliente: ", this.toastr.error);
                const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el cliente.';
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
        if (this.email_client && this.email_client instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_4__.AbstractControl) {
            this.validateEmail(this.email_client).then((result) => {
                if (result) {
                    this.email_client.setErrors(result);
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
                    this.clientsService.checkEmailAvailability(control.value).subscribe((isAvailable) => {
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
        if (this.nit_or_id_client && this.nit_or_id_client instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_4__.AbstractControl) {
            this.validateCedulaAvailability(this.nit_or_id_client).then((result) => {
                if (result) {
                    this.nit_or_id_client.setErrors(result);
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
                this.clientsService.checkCedulaAvailability(control.value).subscribe((isAvailable) => {
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
    saveClientsChanges(id, updatedData) {
        this.clientsService.updateClient(id, updatedData).subscribe((response) => {
            this.loading = false;
            this.submit();
        }, (error) => {
            this.loading = false;
            console.error("Error al crear cliente: ", this.toastr.error);
            const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el cliente.';
            this.toastr.error(errorMessage, 'Error');
        });
    }
    submitClient() {
        if (this.viewMode == 'new') {
            this.createClient();
        }
        else if (this.viewMode == 'edit') {
            this.saveChanges();
        }
    }
    saveChanges() {
        console.log('editar');
        if (this.clientForm.valid) {
            const id = Number(this.id); // Convierte el ID a número
            const updatedData = {
                nit_or_id_client: this.nit_or_id_client.value,
                name_client: this.clientForm.get('name_client').value,
                email_client: this.email_client.value,
                address_client: this.clientForm.get('address_client').value,
                phone_client: this.clientForm.get('phone_client').value,
            };
            this.saveClientsChanges(id, updatedData);
        }
        else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
        }
    }
    cancel() {
        this.router.navigateByUrl('/clients');
    }
    submit() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.toastr.success('Cliente registrado con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
                setTimeout(() => {
                    this.router.navigateByUrl('/clients');
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
    get nit_or_id_client() {
        return this.clientForm.get('nit_or_id_client');
    }
    get nombre() {
        return this.clientForm.get('name_client');
    }
    get email_client() {
        return this.clientForm.get('email_client');
    }
    get last_name_client() {
        return this.clientForm.get('last_name_client');
    }
    get phone_client() {
        return this.clientForm.get('phone_client');
    }
    get address_client() {
        return this.clientForm.get('address_client');
    }
    get state_client() {
        return this.clientForm.get('state_client');
    }
}
ClientDetailComponent.ɵfac = function ClientDetailComponent_Factory(t) { return new (t || ClientDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_6__.ToastrService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_shared_services_client_service__WEBPACK_IMPORTED_MODULE_1__.ClientsService)); };
ClientDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ClientDetailComponent, selectors: [["app-cliente-detail"]], decls: 80, vars: 29, consts: [[1, "breadcrumb"], [4, "ngIf"], [3, "routerLink"], [1, "separator-breadcrumb", "border-top"], [1, "form-container"], [1, "row"], [1, "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title", "mb-3"], [3, "formGroup", "ngSubmit"], [1, "col-md-6", "form-group", "mb-3"], ["for", "nit_or_id_client"], [1, "text-danger"], ["type", "text", "id", "nit_or_id_client", "formControlName", "nit_or_id_client", 1, "form-control", 3, "change"], ["class", "error-message", 4, "ngIf"], ["for", "name_client"], ["type", "text", "id", "name_client", "formControlName", "name_client", "required", "", 1, "form-control"], ["for", "last_name_client"], ["type", "text", "id", "last_name_client", "formControlName", "last_name_client", "required", "", 1, "form-control"], ["for", "email_client"], ["type", "email", "id", "email_client", "formControlName", "email_client", 1, "form-control", 3, "change"], ["for", "address_client"], ["id", "address_client", "formControlName", "address_client", "required", "", 1, "form-control"], ["for", "phone_client"], ["id", "phone_client", "formControlName", "phone_client", "required", "", 1, "form-control"], ["class", "col-md-6 form-group mb-3", 4, "ngIf"], [1, "form-group", "text-right", 2, "text-align", "right"], ["type", "button", 1, "btn", "btn-danger", "ml-2", 3, "click"], ["btnClass", "btn btn-primary m-1 custom-button", 3, "loading", 4, "ngIf"], [1, "error-message"], ["for", "state_client"], ["id", "state_client", "placeholder", "state_client", "formControlName", "state_client", 1, "form-control"], ["btnClass", "btn btn-primary m-1 custom-button", 3, "loading"]], template: function ClientDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ClientDetailComponent_h1_1_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, ClientDetailComponent_h1_2_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, ClientDetailComponent_h1_3_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ul")(5, "li")(6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Clientes");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, ClientDetailComponent_li_8_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, ClientDetailComponent_li_9_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, ClientDetailComponent_li_10_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 4)(13, "div", 5)(14, "div", 6)(15, "div", 7)(16, "div", 8)(17, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Formulario de clientes");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function ClientDetailComponent_Template_form_ngSubmit_19_listener() { return ctx.submitClient(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 5)(21, "div", 11)(22, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "C\u00E9dula o nit ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](26, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function ClientDetailComponent_Template_input_change_26_listener() { return ctx.checkCedulaAvailability(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](27, ClientDetailComponent_div_27_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](28, ClientDetailComponent_div_28_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](29, ClientDetailComponent_div_29_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](30, ClientDetailComponent_div_30_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, ClientDetailComponent_div_31_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 11)(33, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Nombre");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](35, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](37, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](38, ClientDetailComponent_div_38_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](39, ClientDetailComponent_div_39_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](40, ClientDetailComponent_div_40_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "div", 11)(42, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "Apellidos cliente");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](45, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](46, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](47, "div", 11)(48, "label", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](49, "Correo");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](50, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](51, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](52, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function ClientDetailComponent_Template_input_change_52_listener() { return ctx.checkEmailAvailability; });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](53, ClientDetailComponent_div_53_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](54, ClientDetailComponent_div_54_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](55, ClientDetailComponent_div_55_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](56, ClientDetailComponent_div_56_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](57, ClientDetailComponent_div_57_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](58, "div", 11)(59, "label", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60, "Direcci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](62, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](63, "input", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](64, ClientDetailComponent_div_64_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](65, ClientDetailComponent_div_65_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](66, "div", 11)(67, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](68, "Tel\u00E9fono");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](70, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](71, "input", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](72, ClientDetailComponent_div_72_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](73, ClientDetailComponent_div_73_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](74, ClientDetailComponent_div_74_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](75, ClientDetailComponent_div_75_Template, 6, 0, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](76, "div", 27)(77, "button", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ClientDetailComponent_Template_button_click_77_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](78, "Cancelar");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](79, ClientDetailComponent_btn_loading_79_Template, 2, 2, "btn-loading", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](28, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.clientForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("nit_or_id_client").touched && ctx.clientForm.get(" nit_or_id_client").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("nit_or_id_client").hasError("minlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("nit_or_id_client").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("nit_or_id_client").hasError("pattern"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("nit_or_id_client").hasError("cedulaTaken"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("name_client").touched && ctx.clientForm.get("name_client").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("name_client").hasError("invalidName"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("name_client").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("email_client").touched && ctx.clientForm.get("email_client").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("email_client").hasError("email"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("email_client").hasError("invalidDomain"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("email_client").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("email_client").hasError("emailTaken"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("address_client").touched && ctx.clientForm.get("address_client").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("address_client").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("phone_client").touched && ctx.clientForm.get("phone_client").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("phone_client").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.clientForm.get("phone_client").hasError("pattern"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode == "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode !== "print");
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_2__.BtnLoadingComponent, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLinkWithHref], styles: [".error-message[_ngcontent-%COMP%] {\n  color: red;\n}\n\n.custom-button[_ngcontent-%COMP%] {\n  color: #663399; \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC1kZXRhaWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxVQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBLEVBQUEsbUNBQUE7QUFDRiIsImZpbGUiOiJjbGllbnQtZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVycm9yLW1lc3NhZ2Uge1xyXG4gIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcbi5jdXN0b20tYnV0dG9uIHtcclxuICBjb2xvcjogIzY2MzM5OTsgLyogQ29sb3IgcGVyc29uYWxpemFkbyBxdWUgZGVzZWVzICovXHJcbn1cclxuIl19 */"] });


/***/ }),

/***/ 66375:
/*!********************************************************************!*\
  !*** ./src/app/views/clients/client-list/client-list-component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientListComponent": () => (/* binding */ ClientListComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 80823);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_services_client_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/client.service */ 97641);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 60124);









const _c0 = ["deleteConfirmModal"];
function ClientListComponent_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " C\u00E9dula o nit ");
} }
function ClientListComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r13.nit_or_id_client, " ");
} }
function ClientListComponent_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Nombres ");
} }
function ClientListComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r15 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", row_r15.name_client, " ", row_r15.last_name_client, " ");
} }
function ClientListComponent_ng_template_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Correo ");
} }
function ClientListComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r17 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r17.email_client, " ");
} }
function ClientListComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Estado ");
} }
function ClientListComponent_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r19.state_client, " ");
} }
function ClientListComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Acciones ");
} }
const _c1 = function (a1) { return ["/clients/print", a1]; };
const _c2 = function (a1) { return ["/clients/edit", a1]; };
function ClientListComponent_ng_template_36_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ClientListComponent_ng_template_36_Template_label_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r23); const row_r21 = restoredCtx.row; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r22.openModal(row_r21.id_client)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 27)(6, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r21 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c1, row_r21.id_client));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c2, row_r21.id_client));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", row_r21.state_client === "Activo");
} }
function ClientListComponent_ng_template_37_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 29)(1, "h4", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Cambiar estado cliente");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 31)(4, "p")(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\u00BFEst\u00E1 seguro de cambiar el estado del cliente?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 32)(8, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ClientListComponent_ng_template_37_Template_button_click_8_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.dismiss("cancel")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ClientListComponent_ng_template_37_Template_button_click_10_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.close("Ok")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11, "Aceptar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
} }
const _c3 = function () { return ["/clients/new"]; };
class ClientListComponent {
    constructor(_clientService, modalService, toastr) {
        this._clientService = _clientService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.UntypedFormControl();
        this.pageSize = 10;
        this.currentPage = 1;
        this.modalAbierto = false;
    }
    ngOnInit() {
        this.getClients();
        this.searchControl.valueChanges
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(200))
            .subscribe(value => {
            this.filterData(value);
        });
    }
    getClients() {
        this._clientService.getAllClients().subscribe(data => {
            this.listClients = data.sort((a, b) => a.id_client - b.id_client);
            this.filteredClients = [...this.listClients];
        }, error => {
            console.log(error);
        });
    }
    filterData(value) {
        if (value) {
            value = value.toLowerCase();
        }
        else {
            this.filteredClients = [...this.listClients];
            return;
        }
        this.filteredClients = this.listClients.filter(client => {
            const cedulaMatch = client.nit_or_id_client.toLowerCase().includes(value);
            const nombreMatch = client.name_client.toLowerCase().includes(value);
            const correoMatch = client.email_client.toLowerCase().includes(value);
            const estadoMatch = client.state_client.toLowerCase().includes(value);
            return cedulaMatch || nombreMatch || correoMatch || estadoMatch;
        });
        this.currentPage = 1;
    }
    openModal(idClient) {
        if (!this.modalAbierto) {
            this.modalAbierto = true;
            this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then((result) => {
                if (result === 'Ok') {
                    this._clientService.clientChangeStatus(idClient).subscribe((data) => {
                        this.loading = false;
                        // this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                        // console.log(data);
                        setTimeout(() => {
                            location.reload();
                        });
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
ClientListComponent.ɵfac = function ClientListComponent_Factory(t) { return new (t || ClientListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_services_client_service__WEBPACK_IMPORTED_MODULE_0__.ClientsService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__.ToastrService)); };
ClientListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ClientListComponent, selectors: [["app-client-list"]], viewQuery: function ClientListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.deleteConfirmModal = _t.first);
    } }, decls: 39, vars: 24, consts: [[1, ""], [1, "breadcrumb"], ["href", "#"], [1, "separator-breadcrumb", "border-top"], [1, "col-md-12", "mb-3"], [1, "row"], [1, "col-md-6"], [1, "btn", "btn-primary", "float-right", 3, "routerLink"], [1, "col-md-6", "d-flex", "justify-content-end"], ["_ngcontent-vet-c167", "", "id", "search", "placeholder", "Buscar cliente", "type", "text", 1, "form-control", "ng-valid", "ng-touched", "ng-dirty", 2, "width", "50%", 3, "formControl"], [1, "row", "mb-3"], [1, "col-md-12"], [1, "card", "o-hidden"], [1, "material", "fullscreen", 2, "height", "460px", 3, "columnMode", "headerHeight", "footerHeight", "rowHeight", "scrollbarV", "rows"], ["name", "nit_or_id_client", 3, "resizeable", "canAutoResize", "minWidth"], ["ngx-datatable-header-template", ""], ["ngx-datatable-cell-template", ""], ["name", "name_client", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "email_client", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "state_client", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "actions", 3, "resizeable", "canAutoResize", "minWidth"], ["deleteConfirmModal", ""], [1, "btn", "btn-dark", "m-1", 3, "routerLink"], [1, "i-Eye"], [1, "btn", "btn-info", "m-1", 3, "routerLink"], [1, "i-Pen-4"], [1, "switch", "switch-success", "me-3", 3, "click"], ["type", "checkbox", 3, "checked"], [1, "slider"], [1, "modal-header"], ["id", "modal-title", 1, "modal-title"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-danger", "ml-2", 3, "click"], ["type", "button", "ngbAutofocus", "", 1, "btn", "btn-primary", "-m1", "custom-button", 3, "click"]], template: function ClientListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Clientes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ul")(5, "li")(6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Ventas");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Clientes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 4)(12, "div", 5)(13, "div", 6)(14, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Crear nuevo Cliente");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 10)(19, "div", 11)(20, "div", 12)(21, "ngx-datatable", 13)(22, "ngx-datatable-column", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, ClientListComponent_ng_template_23_Template, 1, 0, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, ClientListComponent_ng_template_24_Template, 1, 1, "ng-template", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "ngx-datatable-column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](26, ClientListComponent_ng_template_26_Template, 1, 0, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, ClientListComponent_ng_template_27_Template, 1, 2, "ng-template", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "ngx-datatable-column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, ClientListComponent_ng_template_29_Template, 1, 0, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](30, ClientListComponent_ng_template_30_Template, 1, 1, "ng-template", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "ngx-datatable-column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, ClientListComponent_ng_template_32_Template, 1, 0, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](33, ClientListComponent_ng_template_33_Template, 1, 1, "ng-template", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "ngx-datatable-column", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, ClientListComponent_ng_template_35_Template, 1, 0, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, ClientListComponent_ng_template_36_Template, 7, 7, "ng-template", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](37, ClientListComponent_ng_template_37_Template, 12, 0, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](23, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.searchControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("columnMode", "force")("headerHeight", 50)("footerHeight", 50)("rowHeight", 60)("scrollbarV", true)("rows", ctx.filteredClients);
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
    } }, dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DatatableComponent, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DataTableColumnDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DataTableColumnHeaderDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DataTableColumnCellDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink], styles: ["@charset \"UTF-8\";\n.no-scroll-table[_ngcontent-%COMP%] {\n  max-height: 500px; \n  overflow-y: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC1saXN0LWNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjtFQUNFLGlCQUFBLEVBQUEsa0RBQUE7RUFDQSxrQkFBQTtBQUVGIiwiZmlsZSI6ImNsaWVudC1saXN0LWNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5vLXNjcm9sbC10YWJsZSB7XHJcbiAgbWF4LWhlaWdodDogNTAwcHg7IC8qIEFqdXN0YSBsYSBhbHR1cmEgbcOheGltYSBzZWfDum4gdHVzIG5lY2VzaWRhZGVzICovXHJcbiAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 30502:
/*!********************************************************!*\
  !*** ./src/app/views/clients/client-routing.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientRoutingModule": () => (/* binding */ ClientRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _client_detail_client_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-detail/client-detail.component */ 21141);
/* harmony import */ var _client_list_client_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client-list/client-list-component */ 66375);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);





const routes = [
    {
        path: '',
        component: _client_list_client_list_component__WEBPACK_IMPORTED_MODULE_1__.ClientListComponent
    },
    {
        path: 'new',
        component: _client_detail_client_detail_component__WEBPACK_IMPORTED_MODULE_0__.ClientDetailComponent
    },
    {
        path: 'edit/:id_client',
        component: _client_detail_client_detail_component__WEBPACK_IMPORTED_MODULE_0__.ClientDetailComponent
    },
    {
        path: 'print/:id_client',
        component: _client_detail_client_detail_component__WEBPACK_IMPORTED_MODULE_0__.ClientDetailComponent
    }
];
class ClientRoutingModule {
}
ClientRoutingModule.ɵfac = function ClientRoutingModule_Factory(t) { return new (t || ClientRoutingModule)(); };
ClientRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ClientRoutingModule });
ClientRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ClientRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 53508:
/*!************************************************!*\
  !*** ./src/app/views/clients/client.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientModule": () => (/* binding */ ClientModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/components/shared-components.module */ 50933);
/* harmony import */ var _client_detail_client_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./client-detail/client-detail.component */ 21141);
/* harmony import */ var _client_list_client_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./client-list/client-list-component */ 66375);
/* harmony import */ var _client_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./client-routing.module */ 30502);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);









class ClientModule {
}
ClientModule.ɵfac = function ClientModule_Factory(t) { return new (t || ClientModule)(); };
ClientModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: ClientModule });
ClientModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _client_routing_module__WEBPACK_IMPORTED_MODULE_3__.ClientRoutingModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ClientModule, { declarations: [_client_detail_client_detail_component__WEBPACK_IMPORTED_MODULE_1__.ClientDetailComponent, _client_list_client_list_component__WEBPACK_IMPORTED_MODULE_2__.ClientListComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _client_routing_module__WEBPACK_IMPORTED_MODULE_3__.ClientRoutingModule] }); })();


/***/ }),

/***/ 25729:
/*!******************************************************!*\
  !*** ./src/app/views/clients/models/client.model.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientFormModel": () => (/* binding */ ClientFormModel)
/* harmony export */ });
class ClientFormModel {
    constructor(response) {
        this.nit_or_id_client = response.nit_or_id_client;
        this.name_client = response.name_client;
        this.last_name_client = response.last_name_client;
        this.email_client = response.email_client;
        this.phone_client = response.phone_client;
        this.address_client = response.address_client;
        this.state_client = response.state_client;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_app_views_clients_client_module_ts.js.map