"use strict";
(self["webpackChunkgull"] = self["webpackChunkgull"] || []).push([["src_app_views_categorias_category_module_ts"],{

/***/ 57408:
/*!*****************************************************!*\
  !*** ./src/app/shared/services/category.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoriesService": () => (/* binding */ CategoriesService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 66587);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 47418);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 58987);




class CategoriesService {
    constructor(http) {
        this.http = http;
        //Url de la api
        this.url = 'https://api-cosmetic-w32d.onrender.com/api/categories';
    }
    // Trae toas las categories
    getAllCategory() {
        return this.http.get(this.url);
    }
    //Ruta para verificar si ya esxite una categoria
    getValidateCategoryExist(name_category) {
        return this.http.get(`${this.url}-validate-categoryexist?name_category=${name_category}`);
    }
    //Ruta para crear una categoria
    createCategory(categoriaData) {
        return this.http.post(this.url, categoriaData);
    }
    getCategoryById(id) {
        if (isNaN(id) || id <= 0) {
            // Aquí puedes manejar el caso en el que 'id' no sea un número válido o sea negativo.
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.throwError)('ID de categoría no válido');
        }
        return this.http.get(`${this.url}/${id}`);
    }
    CategoryChangeStatus(id) {
        return this.http.put(this.url + '/change-status' + id, {});
    }
    categoryPut(id) {
        return this.http.put(this.url + '/' + id, {});
    }
    updateCategory(id, updatedData) {
        return this.http.put(`${this.url}/${id}`, updatedData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.catchError)((error) => {
            console.error('Error en la solicitud:', error);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.throwError)('Ocurrió un error al actualizar la categoría. Por favor, inténtalo de nuevo.');
        }));
    }
}
CategoriesService.ɵfac = function CategoriesService_Factory(t) { return new (t || CategoriesService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient)); };
CategoriesService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: CategoriesService, factory: CategoriesService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 86574:
/*!*******************************************************************************!*\
  !*** ./src/app/views/categorias/category-detail/category-detail.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoryDetailComponent": () => (/* binding */ CategoryDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_shared_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/utils */ 22134);
/* harmony import */ var _models_category_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/category.model */ 58123);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var src_app_shared_services_category_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/category.service */ 57408);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/components/btn-loading/btn-loading.component */ 38845);










function CategoryDetailComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Registrar Categor\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Editar Categor\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_h1_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Ver Detalle de Categor\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_li_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Registrar Categor\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_li_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Editar Categor\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_li_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Ver Detalle de Categor\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_div_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " El campo Nombre es obligatorio. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_div_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " El campo Nombre no puede tener tener numeros ni simbolos. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " El campo Nombre no puede superar los 80 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_div_29_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "El nombre de categor\u00EDa ya existe.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, CategoryDetailComponent_div_29_div_1_Template, 2, 0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r9.categoryExists);
} }
function CategoryDetailComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 11)(1, "label", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Estado");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "input", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_div_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " El campo Observaci\u00F3n no puede superar los 100 caracteres. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function CategoryDetailComponent_btn_loading_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "btn-loading", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("loading", ctx_r12.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r12.viewMode == "new" ? "Registrar Categor\u00EDa" : "Editar Categor\u00EDa", " ");
} }
const _c0 = function () { return ["/categories"]; };
class CategoryDetailComponent {
    constructor(formBuilder, route, router, toastr, categoriesService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.categoriesService = categoriesService;
        this.viewMode = 'new';
        this.categories = {};
    }
    ngOnInit() {
        this.id = this.route.snapshot.params['id_category'];
        console.log(this.id);
        this.isNew = !this.id;
        this.setViewMode();
        this.inicializateForm(Number(this.id));
    }
    inicializateForm(id) {
        this.categoryForm = this.formBuilder.group({
            id_category: [''],
            name_category: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.maxLength(80), _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.pattern('^[a-zA-ZáéíóúñÑ ]+$'),], (control) => this.validateCategoryExist(control)],
            observation_category: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.maxLength(100)]],
            state_category: [],
            creation_date_category: []
        });
        if (this.viewMode == 'print') {
            this.categoryForm.disable();
        }
        if (this.viewMode == 'edit') {
            this.stateCategory.disable();
            this.dateCategory.disable();
        }
        if (this.viewMode != 'new') {
            this.getCategoryById(id);
        }
    }
    getCategoryById(id) {
        this.loading = true;
        this.categoriesService.getCategoryById(id).subscribe({
            next: (response) => {
                this.categoryData = new _models_category_model__WEBPACK_IMPORTED_MODULE_1__.CategoryFormMode(response);
                this.setDataCategory();
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
    setDataCategory() {
        if (this.categoryData) {
            this.idCategory.setValue(this.categoryData.id_category);
            this.categoryForm.setValue(this.categoryData);
            this.dateCategory.setValue(src_app_shared_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.ngbDateToDate(this.categoryForm.value.creation_date_category));
        }
    }
    createCategory() {
        if (this.categoryForm.valid) {
            const categoryData = this.categoryForm.value;
            this.loading = true;
            this.categoriesService.createCategory(categoryData).subscribe((response) => {
                this.loading = false;
                console.log("Éxito al crear caetgoría: ", response);
                this.submit();
            }, (error) => {
                this.loading = false;
                console.error("Error al crear caetgoría: ", this.toastr.error);
                const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el caetgoría.';
                this.toastr.error(errorMessage, 'Error');
            });
        }
        else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
        }
    }
    validateCategoryExist(control) {
        return new Promise((resolve) => {
            if (!control.value) {
                resolve(true);
            }
            else {
                this.categoriesService.getValidateCategoryExist(control.value).subscribe((isAvailable) => {
                    this.categoryExists = isAvailable;
                    resolve(this.categoryExists ? { categoryTaken: true } : null);
                }, (error) => {
                    this.categoryExists = true;
                    resolve({ categoryTaken: true });
                });
            }
        });
    }
    saveCategoryChanges(id, updatedData) {
        this.categoriesService.updateCategory(id, updatedData).subscribe((response) => {
            this.loading = false;
            this.submit();
        }, (error) => {
            this.loading = false;
            console.error("Error al crear caetgoría: ", this.toastr.error);
            const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el caetgoría.';
            this.toastr.error(errorMessage, 'Error');
        });
    }
    submitCategory() {
        if (this.viewMode == 'new') {
            this.createCategory();
        }
        else if (this.viewMode == 'edit') {
            this.saveChanges();
        }
    }
    saveChanges() {
        console.log('editar');
        if (this.categoryForm.valid) {
            const id = Number(this.id); // Convierte el ID a número
            const updatedData = {
                id_category: this.idCategory.value,
                name_category: this.categoryForm.get('name_category').value,
                observation_category: this.categoryForm.get('observation_category').value,
            };
            this.saveCategoryChanges(id, updatedData);
        }
        else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
        }
    }
    cancel() {
        this.router.navigateByUrl('/categories');
    }
    submit() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.toastr.success('Categoría registrada con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
                setTimeout(() => {
                    this.router.navigateByUrl('/categories');
                }, 3000);
            }, 3000);
        }
    }
    setViewMode() {
        const currentRoute = this.router.url;
        if (currentRoute.includes('/new')) {
            this.viewMode = 'new'; // Corrige la ortografía de 'new-category'
        }
        else if (currentRoute.includes('/edit/')) {
            this.viewMode = 'edit'; // Corrige la ortografía de 'edit-category'
        }
        else if (currentRoute.includes('/detail/')) {
            this.viewMode = 'print';
        }
    }
    print() {
        if (window) {
            window.print();
        }
    }
    get idCategory() {
        return this.categoryForm.get('id_category');
    }
    get stateCategory() {
        return this.categoryForm.get('state_category');
    }
    get dateCategory() {
        return this.categoryForm.get('creation_date_category');
    }
}
CategoryDetailComponent.ɵfac = function CategoryDetailComponent_Factory(t) { return new (t || CategoryDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_7__.ToastrService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_shared_services_category_service__WEBPACK_IMPORTED_MODULE_2__.CategoriesService)); };
CategoryDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: CategoryDetailComponent, selectors: [["app-category-print"]], decls: 40, vars: 16, consts: [[1, "breadcrumb"], [4, "ngIf"], [3, "routerLink"], [1, "separator-breadcrumb", "border-top"], [1, "form-container"], [1, "row"], [1, "col-md-8"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title", "mb-3"], [3, "formGroup", "ngSubmit"], [1, "col-md-6", "form-group", "mb-3"], ["for", "name_category"], [1, "text-danger"], ["type", "text", "id", "name_category", "placeholder", "Nombre de empleado", "formControlName", "name_category", "required", "", 1, "form-control"], ["class", "error-message", 4, "ngIf"], ["class", "col-md-6 form-group mb-3", 4, "ngIf"], ["for", "observation"], ["id", "observation_category", "placeholder", "Observaci\u00F3n", "formControlName", "observation_category", 1, "form-control"], [1, "form-group", "text-right", 2, "text-align", "right"], ["type", "button", 1, "btn", "btn-danger", "ml-2", 3, "click"], ["btnClass", "btn btn-primary m-1 custom-button", 3, "loading", 4, "ngIf"], [1, "error-message"], ["for", "state_category"], ["id", "state_category", "placeholder", "Fecha de Creacion", "formControlName", "state_category", 1, "form-control"], ["btnClass", "btn btn-primary m-1 custom-button", 3, "loading"]], template: function CategoryDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, CategoryDetailComponent_h1_1_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, CategoryDetailComponent_h1_2_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, CategoryDetailComponent_h1_3_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ul")(5, "li")(6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Categor\u00EDas");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, CategoryDetailComponent_li_8_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, CategoryDetailComponent_li_9_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, CategoryDetailComponent_li_10_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 4)(13, "div", 5)(14, "div", 6)(15, "div", 7)(16, "div", 8)(17, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, "Formulario de Categor\u00EDas");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngSubmit", function CategoryDetailComponent_Template_form_ngSubmit_19_listener() { return ctx.submitCategory(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "div", 11)(21, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22, "Nombre de Categor\u00EDa");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](25, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](26, CategoryDetailComponent_div_26_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](27, CategoryDetailComponent_div_27_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](28, CategoryDetailComponent_div_28_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, CategoryDetailComponent_div_29_Template, 2, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](30, CategoryDetailComponent_div_30_Template, 6, 0, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "div", 11)(32, "label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](33, "Observaci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](34, "textarea", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](35, CategoryDetailComponent_div_35_Template, 2, 0, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](36, "div", 19)(37, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function CategoryDetailComponent_Template_button_click_37_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](38, "Cancelar");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](39, CategoryDetailComponent_btn_loading_39_Template, 2, 2, "btn-loading", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](15, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.categoryForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.categoryForm.get("name_category").touched && ctx.categoryForm.get("name_category").hasError("required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.categoryForm.get("name_category").hasError("pattern"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.categoryForm.get("name_category").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode == "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.categoryForm.get("observation_category").hasError("maxlength"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.viewMode !== "print");
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_3__.BtnLoadingComponent, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLinkWithHref], styles: [".error-message[_ngcontent-%COMP%] {\n  color: red;\n}\n\n.form-container[_ngcontent-%COMP%] {\n  border: 1px solid hwb(0 100% 0%)/0.551, 0%, 80%;\n  padding: 20px;\n  background-color: transparent; \n  border-radius: 5px;\n}\n\n.required[_ngcontent-%COMP%] {\n  color: red;\n}\n\n.form-group.text-right[_ngcontent-%COMP%]   .btn.btn-danger[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  color: white; \n  font-size: 14px;\n}\n\n.ngx-datatable.scroll-vertical.datatable-body[_ngcontent-%COMP%] {\n  overflow: hidden;\n  overflow-y: hidden !important;\n}\n\n\n\n.form-control[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LWRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQUE7QUFDRjs7QUFFQTtFQUNFLCtDQUFBO0VBQ0EsYUFBQTtFQUNBLDZCQUFBLEVBQUEsNEJBQUE7RUFDQSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsVUFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBLEVBQUEsb0JBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLDZCQUFBO0FBQ0Y7O0FBRUEsbURBQUE7O0FBQ0E7RUFDRSw2QkFBQTtBQUNGIiwiZmlsZSI6ImNhdGVnb3J5LWRldGFpbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lcnJvci1tZXNzYWdlIHtcclxuICBjb2xvcjogcmVkO1xyXG59XHJcblxyXG4uZm9ybS1jb250YWluZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkIGh3YigwIDEwMCUgMCUpIC8gMC41NTEwLCAwJSwgODAlO1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IC8qIENhbWJpYWRvIGEgdHJhbnNwYXJlbnRlICovXHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG59XHJcblxyXG4ucmVxdWlyZWQge1xyXG4gIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcbi5mb3JtLWdyb3VwLnRleHQtcmlnaHQgLmJ0bi5idG4tZGFuZ2VyIHtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgY29sb3I6IHdoaXRlOyAvKiBUZXh0byBlbiBibGFuY28gKi9cclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5uZ3gtZGF0YXRhYmxlLnNjcm9sbC12ZXJ0aWNhbC5kYXRhdGFibGUtYm9keSB7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBvdmVyZmxvdy15OiBoaWRkZW4gIWltcG9ydGFudDtcclxufVxyXG5cclxuLyogRXN0aWxvIHBhcmEgcXVpdGFyIGVsIGZvbmRvIGdyaXMgZGUgbG9zIGlucHV0cyAqL1xyXG4uZm9ybS1jb250cm9sIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ 79891:
/*!***************************************************************************!*\
  !*** ./src/app/views/categorias/category-list/category-list.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoryListComponent": () => (/* binding */ CategoryListComponent)
/* harmony export */ });
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_services_category_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/category.service */ 57408);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 60124);










const _c0 = ["deleteConfirmModal"];
function CategoryListComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Nombre ");
} }
function CategoryListComponent_ng_template_25_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    const rowIndex_r10 = ctx_r12.rowIndex;
    const row_r9 = ctx_r12.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", rowIndex_r10 + 1, ". ", row_r9.name_category, " ");
} }
function CategoryListComponent_ng_template_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, CategoryListComponent_ng_template_25_ng_container_0_Template, 2, 2, "ng-container", 18);
} if (rf & 2) {
    const row_r9 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r9 && row_r9.id_category);
} }
function CategoryListComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Estado ");
} }
function CategoryListComponent_ng_template_28_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const row_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r14.state_category, " ");
} }
function CategoryListComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, CategoryListComponent_ng_template_28_ng_container_0_Template, 2, 1, "ng-container", 18);
} if (rf & 2) {
    const row_r14 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r14 && row_r14.id_category);
} }
function CategoryListComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Acciones ");
} }
const _c1 = function (a1) { return ["/categories/detail", a1]; };
const _c2 = function (a1) { return ["/categories/edit", a1]; };
const _c3 = function (a0, a1) { return { "switch-success me-3": a0, "switch-danger me-3": a1 }; };
function CategoryListComponent_ng_template_31_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "i", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "label", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryListComponent_ng_template_31_ng_container_0_Template_label_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r22); const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().row; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r20.openModal(row_r18.id_category)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 24)(7, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](4, _c1, row_r18.id_category));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c2, row_r18.id_category));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", row_r18.state_category === "Activo")("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](8, _c3, row_r18.state_category === "Activo", row_r18.state_category === "Inactivo"));
} }
function CategoryListComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, CategoryListComponent_ng_template_31_ng_container_0_Template, 8, 11, "ng-container", 18);
} if (rf & 2) {
    const row_r18 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r18 && row_r18.id_category);
} }
function CategoryListComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26)(1, "h4", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Cambiar Estado de la Categor\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryListComponent_ng_template_32_Template_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.dismiss("Cross click")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 30)(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "\u00BFEst\u00E1 seguro de que desea cambiar el estado de esta categor\u00EDa?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 31)(11, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryListComponent_ng_template_32_Template_button_click_11_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.dismiss("cancel")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryListComponent_ng_template_32_Template_button_click_13_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.close("Ok")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Aceptar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
} }
const _c4 = function () { return ["/purchases"]; };
const _c5 = function () { return ["/categories"]; };
const _c6 = function () { return ["/categories/new"]; };
class CategoryListComponent {
    constructor(_categoriesService, modalService, toastr) {
        this._categoriesService = _categoriesService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.listCategories = [];
        this.modalAbierto = false;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.UntypedFormControl();
        this.filteredCategories = [];
        this.currentPage = 1; // Propiedad para rastrear la página actual
        this.itemsPerPage = 6; // El número de filas por página
    }
    ngOnInit() {
        this.getCategories();
    }
    getCategories() {
        this._categoriesService.getAllCategory().subscribe((data) => {
            this.listCategories = data;
            console.log(this.listCategories);
            this.sortListCategoriesById();
            this.adjustListCategories();
        }, (error) => {
            console.error('Error al obtener Categorías:', error);
        });
    }
    // Luego, puedes actualizar el valor visual de count según tus necesidades
    actualizarCountLabel() {
        this.countLabel = this.listCategories.length;
    }
    adjustListCategories() {
        const totalRows = this.listCategories.length;
        const remainingRows = 6 - (totalRows % 6);
        for (let i = 0; i < remainingRows; i++) {
            this.listCategories.push({}); // Agrega filas vacías
        }
        this.loadData();
    }
    sortListCategoriesById() {
        this.listCategories.sort((a, b) => {
            if (a.id_categoríae < b.id_categoríae) {
                return -1;
            }
            if (a.id_categoríae > b.id_categoríae) {
                return 1;
            }
            return 0;
        });
    }
    loadData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        const totalPages = Math.ceil(this.listCategories.length / this.itemsPerPage);
        if (this.currentPage === totalPages) {
            const remainingRows = this.listCategories.length % this.itemsPerPage;
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows;
            }
        }
        // Ajusta endIndex para que sea el próximo número divisible por 6
        const rowsToAdd = 6 - (endIndex % 6);
        endIndex += rowsToAdd;
        this.filteredCategories = this.listCategories.slice(startIndex, endIndex);
        console.log('load data charged');
    }
    onPageChange(event) {
        console.log('onPageChange event:', event);
        this.currentPage = event.offset + 1;
        this.loadData();
    }
    openModal(idRole) {
        this._categoriesService.getCategoryById(idRole).subscribe((data) => {
            if (!this.modalAbierto) {
                this.modalAbierto = true;
                this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then((result) => {
                    if (result === 'Ok') {
                        this._categoriesService.CategoryChangeStatus(idRole).subscribe((data) => {
                            this.loading = false;
                            this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', {
                                progressBar: true,
                                timeOut: 2000
                            });
                            setTimeout(() => {
                                location.reload();
                            }, 2000);
                        }, (error) => {
                            this.loading = false;
                            this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', {
                                progressBar: true,
                                timeOut: 2000
                            });
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
        }, (error) => {
            console.error('Error al obtener el categoría:', error);
        });
    }
}
CategoryListComponent.ɵfac = function CategoryListComponent_Factory(t) { return new (t || CategoryListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_services_category_service__WEBPACK_IMPORTED_MODULE_0__.CategoriesService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_4__.ToastrService)); };
CategoryListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CategoryListComponent, selectors: [["app-category-list"]], viewQuery: function CategoryListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DatatableComponent, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.table = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.deleteConfirmModal = _t.first);
    } }, decls: 34, vars: 26, consts: [[1, "breadcrumb"], [3, "routerLink"], [1, "separator-breadcrumb", "border-top"], [1, "row", "mb-3"], [1, "col-md-12", "mb-3", "d-flex", "justify-content-between", "align-items-center"], [1, "col-md-4"], [1, "form-group"], [1, "btn", "btn-primary", 3, "routerLink"], ["id", "category", "placeholder", "Buscar Categor\u00EDa", "type", "category", 1, "form-control", 3, "formControl"], [1, "col-md-12"], [1, "card", "o-hidden"], [1, "material", "fullscreen", 2, "height", "460px", 3, "columnMode", "headerHeight", "footerHeight", "rowHeight", "scrollbarV", "rows", "externalPaging", "count", "limit", "offset", "page"], ["name", "name_category", 3, "resizeable", "canAutoResize", "minWidth"], ["ngx-datatable-header-template", ""], ["ngx-datatable-cell-template", ""], ["name", "state_category", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "actions", 3, "resizeable", "canAutoResize", "minWidth"], ["deleteConfirmModal", ""], [4, "ngIf"], [1, "btn", "btn-dark", "m-1", 3, "routerLink"], [1, "i-Eye"], [1, "btn", "btn-info", "m-1", 3, "routerLink"], [1, "i-Pen-4"], [1, "switch", "switch-success", "me-3", 3, "click"], ["type", "checkbox", 3, "checked", "ngClass"], [1, "slider"], [1, "modal-header"], ["id", "modal-title", 1, "modal-title"], ["type", "button", "aria-label", "Close button", "aria-describedby", "modal-title", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-outline-secondary", "btn-rounded", 3, "click"], ["type", "button", "ngbAutofocus", "", 1, "btn", "btn-wide", "btn-danger", "btn-rounded", 3, "click"]], template: function CategoryListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Categor\u00EDas de Productos");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul")(4, "li")(5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Compras");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "li")(8, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Categor\u00EDas");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 3)(12, "div", 4)(13, "div", 5)(14, "div", 6)(15, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Crear Categor\u00EDa");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 5)(18, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 9)(21, "div", 10)(22, "ngx-datatable", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("page", function CategoryListComponent_Template_ngx_datatable_page_22_listener($event) { return ctx.onPageChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "ngx-datatable-column", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, CategoryListComponent_ng_template_24_Template, 1, 0, "ng-template", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, CategoryListComponent_ng_template_25_Template, 1, 1, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "ngx-datatable-column", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, CategoryListComponent_ng_template_27_Template, 1, 0, "ng-template", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, CategoryListComponent_ng_template_28_Template, 1, 1, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "ngx-datatable-column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](30, CategoryListComponent_ng_template_30_Template, 1, 0, "ng-template", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, CategoryListComponent_ng_template_31_Template, 1, 1, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, CategoryListComponent_ng_template_32_Template, 15, 0, "ng-template", null, 17, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](23, _c4));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](24, _c5));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](25, _c6));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.searchControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("columnMode", "force")("headerHeight", 50)("footerHeight", 50)("rowHeight", 60)("scrollbarV", true)("rows", ctx.listCategories)("externalPaging", true)("count", ctx.listCategories.length)("limit", ctx.itemsPerPage)("offset", (ctx.currentPage - 1) * ctx.itemsPerPage);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 450);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 350);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 350);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DatatableComponent, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DataTableColumnDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DataTableColumnHeaderDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__.DataTableColumnCellDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLinkWithHref], styles: ["@charset \"UTF-8\";\n.datatable-scroll[_ngcontent-%COMP%] {\n  overflow: hidden !important; \n}\n.datatable.scroll-vertical[_ngcontent-%COMP%]   .datatable-body[_ngcontent-%COMP%] {\n  overflow-x: hidden;\n}\n.datatable.scroll-horz[_ngcontent-%COMP%]   .datatable-body[_ngcontent-%COMP%] {\n  overflow-y: hidden;\n}\n@media print {\n  .print-view[_ngcontent-%COMP%] {\n    background-color: #fff;\n    padding: 20px;\n  }\n  .print-title[_ngcontent-%COMP%] {\n    font-size: 24px;\n    margin-bottom: 20px;\n  }\n  .print-field[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n}\n.btn-separator[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n.button-spacing[_ngcontent-%COMP%] {\n  margin-right: 10px; \n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 10px; \n}\n.red-switch[_ngcontent-%COMP%] {\n  background-color: red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCO0VBQ0UsMkJBQUEsRUFBQSxzQ0FBQTtBQUVGO0FBRUE7RUFDSSxrQkFBQTtBQUNKO0FBRUE7RUFDSSxrQkFBQTtBQUNKO0FBRUE7RUFDSTtJQUNFLHNCQUFBO0lBQ0EsYUFBQTtFQUNKO0VBRUU7SUFDRSxlQUFBO0lBQ0EsbUJBQUE7RUFBSjtFQUdFO0lBQ0UsbUJBQUE7RUFESjtBQUNGO0FBTUE7RUFDSSxrQkFBQTtBQUpKO0FBT0U7RUFDRSxrQkFBQSxFQUFBLDZDQUFBO0FBSko7QUFPRTtFQUNFLG1CQUFBLEVBQUEsNkNBQUE7QUFKSjtBQVNFO0VBQ0UscUJBQUE7QUFOSiIsImZpbGUiOiJjYXRlZ29yeS1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRhdGF0YWJsZS1zY3JvbGwge1xyXG4gIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDsgLyogT2N1bHRhIGxhIGJhcnJhIGRlIGRlc3BsYXphbWllbnRvICovXHJcbn1cclxuXHJcblxyXG4uZGF0YXRhYmxlLnNjcm9sbC12ZXJ0aWNhbCAuZGF0YXRhYmxlLWJvZHkge1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG59XHJcblxyXG4uZGF0YXRhYmxlLnNjcm9sbC1ob3J6IC5kYXRhdGFibGUtYm9keSB7XHJcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XHJcbn1cclxuXHJcbkBtZWRpYSBwcmludCB7XHJcbiAgICAucHJpbnQtdmlldyB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAucHJpbnQtdGl0bGUge1xyXG4gICAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAucHJpbnQtZmllbGQge1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAyMHB4OyBcclxuICAgIH1cclxuICB9XHJcbiAgXHJcblxyXG5cclxuLmJ0bi1zZXBhcmF0b3Ige1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gIH1cclxuXHJcbiAgLmJ1dHRvbi1zcGFjaW5nIHtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDsgLyogQWp1c3RhIGVsIHZhbG9yIHNlZ8O6biBlbCBlc3BhY2lvIGRlc2VhZG8gKi9cclxuICB9XHJcbiAgXHJcbiAgLmZvcm0tZ3JvdXAge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDsgLyogQWp1c3RhIGVsIHZhbG9yIHNlZ8O6biBlbCBlc3BhY2lvIGRlc2VhZG8gKi9cclxuICB9XHJcbiAgXHJcbiAgLy9wYXJhIGVsIHN3aXNjdCByb2pvIGN1YW5kbyBlbCBlc3RhZG8gZXMgaW5hY3Rpdm9cclxuXHJcbiAgLnJlZC1zd2l0Y2gge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xyXG4gIH1cclxuXHJcbiJdfQ== */"] });


/***/ }),

/***/ 74543:
/*!*************************************************************!*\
  !*** ./src/app/views/categorias/category-routing.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoryRoutingModule": () => (/* binding */ CategoryRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _category_detail_category_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./category-detail/category-detail.component */ 86574);
/* harmony import */ var _category_list_category_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./category-list/category-list.component */ 79891);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);





const routes = [
    {
        path: '',
        component: _category_list_category_list_component__WEBPACK_IMPORTED_MODULE_1__.CategoryListComponent
    },
    {
        path: 'new',
        component: _category_detail_category_detail_component__WEBPACK_IMPORTED_MODULE_0__.CategoryDetailComponent
    },
    {
        path: 'edit/:id_category',
        component: _category_detail_category_detail_component__WEBPACK_IMPORTED_MODULE_0__.CategoryDetailComponent
    },
    {
        path: 'detail/:id_category',
        component: _category_detail_category_detail_component__WEBPACK_IMPORTED_MODULE_0__.CategoryDetailComponent
    }
];
class CategoryRoutingModule {
}
CategoryRoutingModule.ɵfac = function CategoryRoutingModule_Factory(t) { return new (t || CategoryRoutingModule)(); };
CategoryRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: CategoryRoutingModule });
CategoryRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CategoryRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 45260:
/*!*****************************************************!*\
  !*** ./src/app/views/categorias/category.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoryModule": () => (/* binding */ CategoryModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/components/shared-components.module */ 50933);
/* harmony import */ var _category_detail_category_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./category-detail/category-detail.component */ 86574);
/* harmony import */ var _category_list_category_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category-list/category-list.component */ 79891);
/* harmony import */ var _category_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category-routing.module */ 74543);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);

 // Importa solo ReactiveFormsModule







class CategoryModule {
}
CategoryModule.ɵfac = function CategoryModule_Factory(t) { return new (t || CategoryModule)(); };
CategoryModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: CategoryModule });
CategoryModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.DatePipe], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _category_routing_module__WEBPACK_IMPORTED_MODULE_3__.CategoryRoutingModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CategoryModule, { declarations: [_category_detail_category_detail_component__WEBPACK_IMPORTED_MODULE_1__.CategoryDetailComponent, _category_list_category_list_component__WEBPACK_IMPORTED_MODULE_2__.CategoryListComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _category_routing_module__WEBPACK_IMPORTED_MODULE_3__.CategoryRoutingModule] }); })();


/***/ }),

/***/ 58123:
/*!***********************************************************!*\
  !*** ./src/app/views/categorias/models/category.model.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CategoryFormMode": () => (/* binding */ CategoryFormMode)
/* harmony export */ });
class CategoryFormMode {
    constructor(response) {
        this.name_category = response.name_category;
        this.creation_date_category = new Date(response.creation_date_category);
        this.state_category = response.state_category;
        this.id_category = response.id_category;
        this.observation_category = response.observation_category;
    }
}


/***/ })

}]);
//# sourceMappingURL=src_app_views_categorias_category_module_ts.js.map