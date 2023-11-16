"use strict";
(self["webpackChunkgull"] = self["webpackChunkgull"] || []).push([["src_app_views_products_product_module_ts"],{

/***/ 90773:
/*!****************************************************!*\
  !*** ./src/app/shared/services/product.service.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductService": () => (/* binding */ ProductService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 66587);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 47418);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 58987);




class ProductService {
    constructor(http) {
        this.http = http;
        this.url = 'https://api-cosmetic-w32d.onrender.com/api/productcs';
    }
    getAllProducts() {
        return this.http.get(this.url);
    }
    createProduct(product) {
        return this.http.post(this.url, product).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.catchError)((error) => {
            console.error('Error en la solicitud:', error);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)('Ocurrió un error al crear el producto. Por favor, inténtalo de nuevo.');
        }));
    }
    updateProduct(id, updatedData) {
        return this.http.put(`${this.url}/${id}`, updatedData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.catchError)((error) => {
            console.error('Error en la solicitud:', error);
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.throwError)('Ocurrió un error al actualizar el producto. Por favor, inténtalo de nuevo.');
        }));
    }
    getProductsById(id) {
        return this.http.get(`${this.url}/${id}`);
    }
    productChangeStatus(id) {
        return this.http.put(`${this.url}/changeState/${id}`, {});
    }
    getProducts() {
        return this.http.get('api/products');
    }
}
ProductService.ɵfac = function ProductService_Factory(t) { return new (t || ProductService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient)); };
ProductService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ProductService, factory: ProductService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 18754:
/*!********************************************************!*\
  !*** ./src/app/views/products/models/product.model.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductFormModel": () => (/* binding */ ProductFormModel)
/* harmony export */ });
class ProductFormModel {
    constructor(response) {
        this.id_product = response.id_product;
        this.id_category = response.id_category;
        this.name_product = response.name_product;
        this.quantity = response.quantity;
        this.max_stock = response.max_stock;
        this.min_stock = response.min_stock;
        this.cost_price = response.cost_price;
        this.selling_price = response.selling_price;
        this.selling_price = response.selling_price;
        this.profit = response.profit;
        this.state_product = response.state_product;
        this.observation = response.observation;
        this.creation_date_product = new Date(response.creation_date_product);
    }
}


/***/ }),

/***/ 75812:
/*!***************************************************************************!*\
  !*** ./src/app/views/products/product-detail/product-detail.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductDetailComponent": () => (/* binding */ ProductDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _models_product_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/product.model */ 18754);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var src_app_shared_services_product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/services/product.service */ 90773);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/components/btn-loading/btn-loading.component */ 38845);









function ProductDetailComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Registrar Producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ProductDetailComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Editar Producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ProductDetailComponent_h1_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Ver Detalle de Producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ProductDetailComponent_li_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Registrar Producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ProductDetailComponent_li_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Editar Producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ProductDetailComponent_li_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Ver Detalle de Producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ProductDetailComponent_div_63_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11)(1, "label", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Estado");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ProductDetailComponent_div_70_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 11)(1, "label", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Fecha de creacion");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](5, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function ProductDetailComponent_btn_loading_74_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "btn-loading", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("loading", ctx_r8.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r8.viewMode == "new" ? "Registrar Producto" : "Editar Producto", " ");
} }
const _c0 = function () { return ["/products"]; };
class ProductDetailComponent {
    constructor(formBuilder, route, router, fb, toastr, productsService, datePipe) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.toastr = toastr;
        this.productsService = productsService;
        this.datePipe = datePipe;
        this.loading = false;
        this.viewMode = 'new';
        this.invoice = {};
    }
    ngOnInit() {
        this.id = this.route.snapshot.params['id_product'];
        this.isNew = !this.id;
        this.setViewMode();
        this.inicializateForm(Number(this.id));
    }
    inicializateForm(id) {
        this.productForm = this.formBuilder.group({
            id_product: [],
            id_category: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(10), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(7), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern('^[0-9]+$')]],
            name_product: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80)], [this.validateNameSimbolAndNumber]],
            quantity: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80)]],
            cost_price: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80)]],
            selling_price: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80), _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern('^[0-9]{10}$')]],
            max_stock: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(100)]],
            min_stock: [],
            profit: [],
            observation: [],
            state_product: [],
            creation_date_product: []
        });
        if (this.viewMode == 'print') {
            this.productForm.disable();
        }
        if (this.viewMode == 'edit') {
            this.idProduct.disable();
        }
        if (this.viewMode != 'new') {
            this.getProductByID(id);
        }
    }
    getProductByID(id) {
        this.loading = true;
        this.productsService.getProductsById(id).subscribe({
            next: (response) => {
                this.productData = new _models_product_model__WEBPACK_IMPORTED_MODULE_0__.ProductFormModel(response);
                this.setDataProduct();
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
    setDataProduct() {
        if (this.productData) {
            this.idProduct.setValue(this.productData.id_product);
            this.productForm.setValue(this.productData);
            this.dateProduct.setValue(this.datePipe.transform(this.productData.creation_date_product, 'yyyy-MM-dd'));
            ;
        }
    }
    createProduct() {
        if (this.productForm.valid) {
            const productData = this.productForm.value;
            this.loading = true;
            this.productsService.createProduct(productData).subscribe((response) => {
                this.loading = false;
                console.log("Éxito al crear el producto: ", response);
                this.submit();
            }, (error) => {
                this.loading = false;
                console.error("Error al crear producto: ", this.toastr.error);
                const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el producto.';
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
    saveProductChanges(id, updatedData) {
        this.productsService.updateProduct(id, updatedData).subscribe((response) => {
            this.loading = false;
            this.submit();
        }, (error) => {
            this.loading = false;
            console.error("Error al crear producto: ", this.toastr.error);
            const errorMessage = error.error ? error.error : 'Ocurrió un error al crear el producto.';
            this.toastr.error(errorMessage, 'Error');
        });
    }
    submitProduct() {
        if (this.viewMode == 'new') {
            this.createProduct();
        }
        else if (this.viewMode == 'edit') {
            this.saveChanges();
        }
    }
    saveChanges() {
        console.log('editar');
        if (this.productForm.valid) {
            const id = Number(this.id); // Convierte el ID a número
            const updatedData = {
                id_product: this.idProduct.value,
                id_category: this.productForm.get('id_category').value,
                name_product: this.productForm.get('name_product').value,
                cost_price: this.productForm.get('cost_price').value,
                selling_price: this.productForm.get('selling_price').value,
                max_stock: this.productForm.get('max_stock').value,
                min_stock: this.productForm.get('min_stock').value,
                observation: this.productForm.get('observation').value
            };
            this.saveProductChanges(id, updatedData);
        }
        else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
        }
    }
    cancel() {
        this.router.navigateByUrl('/products');
    }
    submit() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.toastr.success('Producto registrado con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
                setTimeout(() => {
                    this.router.navigateByUrl('/products');
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
    get idProduct() {
        return this.productForm.get('id_product');
    }
    get dateProduct() {
        return this.productForm.get('creation_date_product');
    }
}
ProductDetailComponent.ɵfac = function ProductDetailComponent_Factory(t) { return new (t || ProductDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.UntypedFormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_6__.ToastrService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_shared_services_product_service__WEBPACK_IMPORTED_MODULE_1__.ProductService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe)); };
ProductDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ProductDetailComponent, selectors: [["app-product-detail"]], decls: 75, vars: 12, consts: [[1, "breadcrumb"], [4, "ngIf"], [3, "routerLink"], [1, "separator-breadcrumb", "border-top"], [1, "form-container"], [1, "row"], [1, "col-md-12"], [1, "card", "mb-4"], [1, "card-body"], [1, "card-title", "mb-3"], [3, "formGroup", "ngSubmit"], [1, "col-md-6", "form-group", "mb-3"], ["for", "id_category"], [1, "text-danger"], ["type", "text", "id", "id_category", "placeholder", "Categoria", "formControlName", "id_category", 1, "form-control"], ["for", "name_product"], ["type", "text", "id", "name_product", "placeholder", "Nombre de producto", "formControlName", "name_product", "required", "", 1, "form-control"], ["for", "quantity"], ["type", "text", "id", "quantity", "placeholder", "Cantidad", "formControlName", "quantity", 1, "form-control"], ["for", "max_stock"], ["id", "max_stock", "placeholder", "Stock Maximo", "formControlName", "max_stock", "required", "", 1, "form-control"], ["for", "min_stock"], ["id", "min_stock", "placeholder", "Stock Minimo", "formControlName", "min_stock", "required", "", 1, "form-control"], ["for", "cost_price"], ["id", "cost_price", "placeholder", "Precio Costo", "formControlName", "cost_price", "required", "", 1, "form-control"], ["for", "selling_price"], ["id", "selling_price", "placeholder", "Precio Venta", "formControlName", "selling_price", "required", "", 1, "form-control"], ["class", "col-md-6 form-group mb-3", 4, "ngIf"], ["for", "observation"], ["id", "observation", "placeholder", "Observaci\u00F3n", "formControlName", "observation", "required", "", 1, "form-control"], [1, "form-group", "text-right", 2, "text-align", "right"], ["type", "button", 1, "btn", "btn-danger", "ml-2", 3, "click"], ["btnClass", "btn btn-primary m-1 custom-button", 3, "loading", 4, "ngIf"], ["for", "state_product"], ["id", "state_product", "placeholder", "Estado", "formControlName", "state_product", 1, "form-control"], ["for", "creation_date_product"], ["id", "creation_date_product", "placeholder", "Fecha de Creacion", "formControlName", "creation_date_product", 1, "form-control"], ["btnClass", "btn btn-primary m-1 custom-button", 3, "loading"]], template: function ProductDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ProductDetailComponent_h1_1_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, ProductDetailComponent_h1_2_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, ProductDetailComponent_h1_3_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ul")(5, "li")(6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Compras");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, ProductDetailComponent_li_8_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, ProductDetailComponent_li_9_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, ProductDetailComponent_li_10_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 4)(13, "div", 5)(14, "div", 6)(15, "div", 7)(16, "div", 8)(17, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Formulario de Productos");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "form", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function ProductDetailComponent_Template_form_ngSubmit_19_listener() { return ctx.submitProduct(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 5)(21, "div", 11)(22, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Categoria");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](26, "input", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 11)(28, "label", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](29, "Nombre de producto");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](30, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](32, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](33, "div", 11)(34, "label", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35, "Cantidad");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](38, "input", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "div", 11)(40, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, "Stock Maximo");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](44, "input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 11)(46, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "Stock Minimo");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](49, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](50, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "div", 11)(52, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](53, "Precio Costo");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](54, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](55, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](56, "input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "div", 11)(58, "label", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](59, "Precio Venta");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](60, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](61, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](62, "input", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](63, ProductDetailComponent_div_63_Template, 6, 0, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](64, "div", 11)(65, "label", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, "Observaci\u00F3n");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](67, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](68, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](69, "textarea", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](70, ProductDetailComponent_div_70_Template, 6, 0, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](71, "div", 30)(72, "button", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ProductDetailComponent_Template_button_click_72_listener() { return ctx.cancel(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](73, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](74, ProductDetailComponent_btn_loading_74_Template, 2, 2, "btn-loading", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](11, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "new");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "edit");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.productForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](44);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode == "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode == "print");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode !== "print");
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_2__.BtnLoadingComponent, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLinkWithHref], styles: [".error-message[_ngcontent-%COMP%] {\n  color: red;\n}\n\n.custom-button[_ngcontent-%COMP%] {\n  color: #663399; \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2R1Y3QtZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksVUFBQTtBQUNKOztBQUVBO0VBQ0ksY0FBQSxFQUFBLG1DQUFBO0FBQ0oiLCJmaWxlIjoicHJvZHVjdC1kZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZXJyb3ItbWVzc2FnZSB7XHJcbiAgICBjb2xvcjogcmVkO1xyXG59XHJcblxyXG4uY3VzdG9tLWJ1dHRvbiB7XHJcbiAgICBjb2xvcjogIzY2MzM5OTsgLyogQ29sb3IgcGVyc29uYWxpemFkbyBxdWUgZGVzZWVzICovXHJcbn0iXX0= */"] });


/***/ }),

/***/ 11248:
/*!***********************************************************************!*\
  !*** ./src/app/views/products/product-list/product-list.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductListComponent": () => (/* binding */ ProductListComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 80823);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_services_product_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/product.service */ 90773);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 60124);









const _c0 = ["deleteConfirmModal"];
function ProductListComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Categoria ");
} }
function ProductListComponent_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r13 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r13.id_category, " ");
} }
function ProductListComponent_ng_template_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Nombre ");
} }
function ProductListComponent_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r15 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r15.name_product, " ");
} }
function ProductListComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Precio de costo ");
} }
function ProductListComponent_ng_template_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r17 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r17.cost_price, " ");
} }
function ProductListComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Estado ");
} }
function ProductListComponent_ng_template_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r19 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r19.state_product, " ");
} }
function ProductListComponent_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Acciones ");
} }
const _c1 = function (a1) { return ["/products/print", a1]; };
const _c2 = function (a1) { return ["/products/edit", a1]; };
function ProductListComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "i", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "label", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProductListComponent_ng_template_35_Template_label_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r23); const row_r21 = restoredCtx.row; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r22.openModal(row_r21.id_product)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 26)(6, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r21 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c1, row_r21.id_product));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](5, _c2, row_r21.id_product));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", row_r21.products === "Activo");
} }
function ProductListComponent_ng_template_36_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 28)(1, "h4", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Cambiar Estado Producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProductListComponent_ng_template_36_Template_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.dismiss("Cross click")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 32)(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "\u00BFEst\u00E1 seguro de que desea inhabilitar este Producto?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 33)(11, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProductListComponent_ng_template_36_Template_button_click_11_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.dismiss("cancel")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ProductListComponent_ng_template_36_Template_button_click_13_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const modal_r24 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r24.close("Ok")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Aceptar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
} }
const _c3 = function () { return ["/products/new"]; };
class ProductListComponent {
    constructor(_productService, modalService, toastr) {
        this._productService = _productService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.UntypedFormControl();
        this.pageSize = 10;
        this.currentPage = 1;
        this.modalAbierto = false;
    }
    ngOnInit() {
        this.getProducts();
        this.searchControl.valueChanges
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(200))
            .subscribe(value => {
            this.filterData(value);
        });
    }
    getProducts() {
        this._productService.getAllProducts().subscribe(data => {
            this.listProducts = data.sort((a, b) => a.id_product - b.id_product);
            this.filteredProducts = [...this.listProducts];
        }, error => {
            console.log(error);
        });
    }
    filterData(value) {
        if (value) {
            value = value.toLowerCase();
        }
        else {
            this.filteredProducts = [...this.listProducts];
            return;
        }
        this.filteredProducts = this.listProducts.filter(productc => {
            const nombreMatch = productc.name_product.toLowerCase().includes(value);
            const cost_priceMatch = productc.cost_price.toLowerCase().includes(value);
            const estadoMatch = productc.state_product.toLowerCase().includes(value);
            return nombreMatch || cost_priceMatch || estadoMatch;
        });
        this.currentPage = 1;
    }
    openModal(idProduct) {
        if (!this.modalAbierto) {
            this.modalAbierto = true;
            this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then((result) => {
                if (result === 'Ok') {
                    this._productService.productChangeStatus(idProduct).subscribe((data) => {
                        this.loading = false;
                        this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                        console.log(data);
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
ProductListComponent.ɵfac = function ProductListComponent_Factory(t) { return new (t || ProductListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_services_product_service__WEBPACK_IMPORTED_MODULE_0__.ProductService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__.ToastrService)); };
ProductListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ProductListComponent, selectors: [["app-product-list"]], viewQuery: function ProductListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.deleteConfirmModal = _t.first);
    } }, decls: 38, vars: 24, consts: [[1, ""], [1, "breadcrumb"], ["href", "#"], [1, "separator-breadcrumb", "border-top"], [1, "row", "mb-3"], [1, "col-md-4"], [1, "form-group"], ["id", "search", "placeholder", "Buscar Productos", "type", "text", 1, "form-control", "form-control-rounded", 3, "formControl"], [1, "col-md-12", "mb-3"], [1, "btn", "btn-primary", "float-right", 3, "routerLink"], [1, "col-md-12"], [1, "card", "o-hidden"], [1, "material", "fullscreen", 2, "height", "460px", 3, "columnMode", "headerHeight", "footerHeight", "rowHeight", "scrollbarV", "rows"], ["name", "id_category", 3, "resizeable", "canAutoResize", "minWidth"], ["ngx-datatable-header-template", ""], ["ngx-datatable-cell-template", ""], ["name", "name_product", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "cost_price", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "state_product", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "actions", 3, "resizeable", "canAutoResize", "minWidth"], ["deleteConfirmModal", ""], [1, "btn", "btn-dark", "m-1", 3, "routerLink"], [1, "i-Eye"], [1, "btn", "btn-info", "m-1", 3, "routerLink"], [1, "i-Pen-4"], [1, "switch", "switch-success", "me-3", 3, "click"], ["type", "checkbox", 3, "checked"], [1, "slider"], [1, "modal-header"], ["id", "modal-title", 1, "modal-title"], ["type", "button", "aria-label", "Close button", "aria-describedby", "modal-title", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-outline-secondary", "btn-rounded", 3, "click"], ["type", "button", "ngbAutofocus", "", 1, "btn", "btn-wide", "btn-danger", "btn-rounded", 3, "click"]], template: function ProductListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Listar Productos");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "ul")(5, "li")(6, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Compras");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Productos");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 4)(12, "div", 5)(13, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 8)(16, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Crear nuevo Producto");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "div", 10)(19, "div", 11)(20, "ngx-datatable", 12)(21, "ngx-datatable-column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, ProductListComponent_ng_template_22_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, ProductListComponent_ng_template_23_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "ngx-datatable-column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, ProductListComponent_ng_template_25_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](26, ProductListComponent_ng_template_26_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "ngx-datatable-column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, ProductListComponent_ng_template_28_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, ProductListComponent_ng_template_29_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "ngx-datatable-column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, ProductListComponent_ng_template_31_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](32, ProductListComponent_ng_template_32_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "ngx-datatable-column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](34, ProductListComponent_ng_template_34_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, ProductListComponent_ng_template_35_Template, 7, 7, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, ProductListComponent_ng_template_36_Template, 15, 0, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.searchControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](23, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("columnMode", "force")("headerHeight", 50)("footerHeight", 50)("rowHeight", 60)("scrollbarV", true)("rows", ctx.filteredProducts);
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
    } }, dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DatatableComponent, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DataTableColumnDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DataTableColumnHeaderDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.DataTableColumnCellDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink], styles: ["@charset \"UTF-8\";\n.no-scroll-table[_ngcontent-%COMP%] {\n  max-height: 500px; \n  overflow-y: hidden;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2R1Y3QtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFBaEI7RUFDSSxpQkFBQSxFQUFBLGtEQUFBO0VBQ0Esa0JBQUE7QUFFSiIsImZpbGUiOiJwcm9kdWN0LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubm8tc2Nyb2xsLXRhYmxlIHtcclxuICAgIG1heC1oZWlnaHQ6IDUwMHB4OyAvKiBBanVzdGEgbGEgYWx0dXJhIG3DoXhpbWEgc2Vnw7puIHR1cyBuZWNlc2lkYWRlcyAqL1xyXG4gICAgb3ZlcmZsb3cteTogaGlkZGVuO1xyXG4gIH1cclxuICAiXX0= */"] });


/***/ }),

/***/ 46497:
/*!**********************************************************!*\
  !*** ./src/app/views/products/product-routing.module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductRoutingModule": () => (/* binding */ ProductRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _product_detail_product_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product-detail/product-detail.component */ 75812);
/* harmony import */ var _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-list/product-list.component */ 11248);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);





const routes = [
    {
        path: '',
        component: _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_1__.ProductListComponent
    },
    {
        path: 'new',
        component: _product_detail_product_detail_component__WEBPACK_IMPORTED_MODULE_0__.ProductDetailComponent
    },
    {
        path: 'edit/:id_product',
        component: _product_detail_product_detail_component__WEBPACK_IMPORTED_MODULE_0__.ProductDetailComponent
    },
    {
        path: 'print/:id_product',
        component: _product_detail_product_detail_component__WEBPACK_IMPORTED_MODULE_0__.ProductDetailComponent
    }
];
class ProductRoutingModule {
}
ProductRoutingModule.ɵfac = function ProductRoutingModule_Factory(t) { return new (t || ProductRoutingModule)(); };
ProductRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ProductRoutingModule });
ProductRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ProductRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 38377:
/*!**************************************************!*\
  !*** ./src/app/views/products/product.module.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProductModule": () => (/* binding */ ProductModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/components/shared-components.module */ 50933);
/* harmony import */ var _product_detail_product_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-detail/product-detail.component */ 75812);
/* harmony import */ var _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-list/product-list.component */ 11248);
/* harmony import */ var _product_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-routing.module */ 46497);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);









class ProductModule {
}
ProductModule.ɵfac = function ProductModule_Factory(t) { return new (t || ProductModule)(); };
ProductModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: ProductModule });
ProductModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.DatePipe], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _product_routing_module__WEBPACK_IMPORTED_MODULE_3__.ProductRoutingModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ProductModule, { declarations: [_product_detail_product_detail_component__WEBPACK_IMPORTED_MODULE_1__.ProductDetailComponent, _product_list_product_list_component__WEBPACK_IMPORTED_MODULE_2__.ProductListComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _product_routing_module__WEBPACK_IMPORTED_MODULE_3__.ProductRoutingModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_views_products_product_module_ts.js.map