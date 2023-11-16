"use strict";
(self["webpackChunkgull"] = self["webpackChunkgull"] || []).push([["src_app_views_purchases_purchase_module_ts"],{

/***/ 9991:
/*!*****************************************************!*\
  !*** ./src/app/shared/services/purchase.service.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PurchasesService": () => (/* binding */ PurchasesService)
/* harmony export */ });
/* harmony import */ var src_app_shared_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/utils */ 22134);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 58987);



class PurchasesService {
    constructor(http) {
        this.http = http;
        //Url de la api
        this.url = 'https://api-cosmetic-w32d.onrender.com/api/purchases';
    }
    // Trae toas las purchase
    getAllPurchase() {
        return this.http.get(this.url);
    }
    //Ruta para verificar si ya esxite una categoria
    getValidatePurchaseExist(name_category) {
        return this.http.get(`${this.url}-validate-categoryexist?name_category=${name_category}`);
    }
    //Ruta para crear una categoria
    createPurchase(categoriaData) {
        return this.http.post(this.url, categoriaData);
    }
    //Ruta para traer una categoria en especifico
    getPurchaseById(id) {
        if (typeof id !== 'number' || isNaN(id)) {
            // Manejar el caso en el que id no sea un número válido, por ejemplo, mostrar un error.
            console.error('ID de categoría no válido');
        }
        return this.http.get(this.url + '/' + id, {});
    }
    //Ruta para cambiar el estado de una categoria
    PurchaseChangeStatus(id) {
        return this.http.put(this.url + '/change-status' + id, {});
    }
    savePurchase(category) {
        if (category.id_category) {
            return this.http.put('/api/purchase/' + category.id_category, category);
        }
        else {
            category.id = src_app_shared_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.genId();
            return this.http.post('/api/purchase/', category);
        }
    }
    categoryPut(id) {
        return this.http.put(this.url + '/' + id, {});
    }
}
PurchasesService.ɵfac = function PurchasesService_Factory(t) { return new (t || PurchasesService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
PurchasesService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: PurchasesService, factory: PurchasesService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 23493:
/*!******************************************************************************!*\
  !*** ./src/app/views/purchases/purchase-detail/purchase-detail.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PurchaseDetailComponent": () => (/* binding */ PurchaseDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var src_app_shared_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/utils */ 22134);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var src_app_shared_services_purchase_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/services/purchase.service */ 9991);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/components/btn-loading/btn-loading.component */ 38845);









function PurchaseDetailComponent_h1_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Registrar Compra");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function PurchaseDetailComponent_h1_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "h1");
} }
function PurchaseDetailComponent_li_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Registrar Compra");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function PurchaseDetailComponent_li_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Detalle de Compra");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function PurchaseDetailComponent_div_13_tr_62_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](17, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const i_r8 = ctx.index;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](i_r8 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r7.id_product);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r7.product_category);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r7.cost_price);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r7.selling_price);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r7.product_category);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r7.vat);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r7.product_quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](item_r7.cost_price + item_r7.vat * ctx_r6.product_quantity);
} }
function PurchaseDetailComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 6)(1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Regresar");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PurchaseDetailComponent_div_13_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r9.print()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Imprimir Compra");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "div", 11)(8, "div", 12)(9, "h4", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, " Informaci\u00F3n de Compra");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 14)(14, "p")(15, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16, "Estado: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "p")(19, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "Fecha de compra: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](22, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](23, "p")(24, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "Fecha de Registro: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](27, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](28, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 16)(30, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](31, "h5", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "p")(33, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](34, "Proveedor: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "span", 18)(37, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](38, "Observaci\u00F3n: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "div", 11)(41, "div", 19)(42, "table", 20)(43, "thead", 21)(44, "tr")(45, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](46, "#");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](47, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](48, "Producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](50, "Categor\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](52, "precio Compra");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, "Precio Venta");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](56, "Iva");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](58, "Cantidad");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](60, "Sub Total");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](61, "tbody");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](62, PurchaseDetailComponent_div_13_tr_62_Template, 19, 9, "tr", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "div", 19)(64, "div", 24)(65, "h5", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, "Total Compra: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](67, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()()();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("#", ctx_r4.invoice_number, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r4.invoice == null ? null : ctx_r4.invoice.state_purchase, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](22, 8, ctx_r4.invoice == null ? null : ctx_r4.invoice.purchase_date), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](27, 10, ctx_r4.invoice == null ? null : ctx_r4.invoice.record_date_purchase), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r4.invoice == null ? null : ctx_r4.invoice.detailPurchase == null ? null : ctx_r4.invoice.detailPurchase.id_provider);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r4.invoice == null ? null : ctx_r4.invoice.detailPurchase == null ? null : ctx_r4.invoice.detailPurchase.observation_purchase, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r4.invoice == null ? null : ctx_r4.invoice.items);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r4.total_purchase, " ");
} }
function PurchaseDetailComponent_div_14_ng_container_119_tr_1_option_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "option", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const product_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", product_r21.id_product);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](product_r21.name_product);
} }
function PurchaseDetailComponent_div_14_ng_container_119_tr_1_input_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "input", 89);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("readonly", true);
} }
function PurchaseDetailComponent_div_14_ng_container_119_tr_1_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr", 80)(1, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td")(4, "select", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function PurchaseDetailComponent_div_14_ng_container_119_tr_1_Template_select_change_4_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const i_r18 = restoredCtx.index; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r22.handleProductSelection($event, i_r18)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, PurchaseDetailComponent_div_14_ng_container_119_tr_1_option_5_Template, 2, 2, "option", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, PurchaseDetailComponent_div_14_ng_container_119_tr_1_input_7_Template, 1, 1, "input", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "td")(9, "input", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function PurchaseDetailComponent_div_14_ng_container_119_tr_1_Template_input_change_9_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const i_r18 = restoredCtx.index; const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r24.handleProductSelection($event, i_r18)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "input", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "td")(13, "button", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PurchaseDetailComponent_div_14_ng_container_119_tr_1_Template_button_click_13_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r23); const i_r18 = restoredCtx.index; const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r25.removeProduct(i_r18)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](14, "i", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const i_r18 = ctx.index;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroupName", i_r18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](i_r18 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r16.listProducts);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r16.viewMode === "new");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("readonly", true);
} }
function PurchaseDetailComponent_div_14_ng_container_119_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, PurchaseDetailComponent_div_14_ng_container_119_tr_1_Template, 15, 5, "tr", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r11.productsFormArray.controls);
} }
function PurchaseDetailComponent_div_14_ng_template_120_tr_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "tr")(1, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const product_r27 = ctx.$implicit;
    const i_r28 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](i_r28 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](product_r27.id_product);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](product_r27.product_price);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](product_r27.product_quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](product_r27.product_quantity);
} }
function PurchaseDetailComponent_div_14_ng_template_120_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, PurchaseDetailComponent_div_14_ng_template_120_tr_0_Template, 12, 5, "tr", 23);
} if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r13.order_detail_products);
} }
function PurchaseDetailComponent_div_14_div_135_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " El campo Observaci\u00F3n no puede superar los 100 caracteres. El campo Observaci\u00F3n no puede super El campo Observaci\u00F3n\n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function PurchaseDetailComponent_div_14_div_140_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 91);
} }
const _c0 = function () { return ["/products"]; };
const _c1 = function () { return ["/orders"]; };
function PurchaseDetailComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div")(1, "form", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function PurchaseDetailComponent_div_14_Template_form_ngSubmit_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r30); const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r29.submitCategory()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "section", 27)(3, "div", 11)(4, "div", 28)(5, "div", 29)(6, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "Fecha Compra");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](10, "input", 32)(11, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 28)(13, "div", 29)(14, "label", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](15, "Numero Factura");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](17, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](18, "input", 35)(19, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 12)(21, "div", 29)(22, "label", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "Proveedor");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](25, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](26, "input", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 11)(28, "div", 28)(29, "div", 29)(30, "label", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, "Categoria");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "select", 40)(35, "option", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](36, "Elija una categoria");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](38, "Belleza");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "option");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](40, "Limpieza");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](41, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "div", 28)(43, "div", 29)(44, "label", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](45, "Producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](46, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](47, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](48, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](49, "input", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](50, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "div", 47)(52, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](53, "label", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](54, "div", 44)(55, "div", 48)(56, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](57, "Producto Nuevo");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](58, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "div", 28)(60, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](61, "label", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](62, "div", 44)(63, "div", 48)(64, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PurchaseDetailComponent_div_14_Template_button_click_64_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r30); const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r31.addProduct()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](65, "i", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](66, " Agregar Item");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](67, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](68, "div", 11)(69, "div", 28)(70, "div", 29)(71, "label", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](72, "Precio Compra");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](73, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](74, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](75, "input", 53)(76, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](77, "div", 28)(78, "div", 29)(79, "label", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](80, "Precio Venta");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](81, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](82, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](83, "input", 55)(84, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](85, "div", 28)(86, "div", 29)(87, "label", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](88, " Iva");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](89, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](90, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](91, "input", 57)(92, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](93, "div", 28)(94, "div", 29)(95, "label", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](96, "Cantidad");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](97, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](98, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](99, "input", 60)(100, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](101, "section", 27)(102, "div", 62)(103, "table", 20)(104, "thead", 21)(105, "tr")(106, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](107, "#");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](108, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](109, "Nombre del Producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](110, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](111, "Precio Unitario");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](112, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](113, "Unidades");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](114, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](115, "Subtotal");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](116, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](117, "Acciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](118, "tbody", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](119, PurchaseDetailComponent_div_14_ng_container_119_Template, 2, 1, "ng-container", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](120, PurchaseDetailComponent_div_14_ng_template_120_Template, 1, 1, "ng-template", null, 65, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](122, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](123, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](124, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](125, "div", 67)(126, "div", 68)(127, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](128, "Total Compra:");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](129);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](130, "div", 69)(131, "div", 70)(132, "label", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](133, "Observaci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](134, "textarea", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](135, PurchaseDetailComponent_div_14_div_135_Template, 2, 0, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](136, "div", 74)(137, "div", 75)(138, "button", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](139, "Volver");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](140, PurchaseDetailComponent_div_14_div_140_Template, 1, 0, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](141, "btn-loading", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](142, "Crear Pedido");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
} if (rf & 2) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](121);
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx_r5.categoryForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](55);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](9, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.viewMode === "new")("ngIfElse", _r12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", ctx_r5.viewMode === "new" ? ctx_r5.calculateTotal() : ctx_r5.orderTotal, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.categoryForm.get("observation_category").hasError("maxlength"));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](10, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.viewMode === "new-purchase");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("loading", ctx_r5.loading);
} }
const _c2 = function () { return ["/purchases"]; };
class PurchaseDetailComponent {
    constructor(formBuilder, fb, route, router, toastr, purchaseService) {
        this.formBuilder = formBuilder;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.purchaseService = purchaseService;
        this.viewMode = 'new-purchase';
        this.purchase = {};
        this.purchases = {
            name_purchase: '',
            observation_purchase: '',
            state_purchase: 'Activo',
            creation_date: ''
        };
        this.purchaseForm = this.formBuilder.group({
            name_purchase: [
                '',
                [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(80),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern('^[a-zA-ZáéíóúñÑ ]+$'),
                ],
                (control) => this.validatePurchaseExist(control)
            ],
            observation_purchase: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(100)]
        });
        // this.purchaseForm = this.fb.group({
        //   name_purchase: [
        //     '',
        //     [
        //       Validators.required,
        //       Validators.maxLength(80),
        //       Validators.pattern('^[a-zA-ZáéíóúñÑ ]+$'),
        //     ],
        //     (control) => this.validatePurchaseExist(control)
        //   ],
        //   observation_purchase: ['', Validators.maxLength(100)]
        // });
    }
    ngOnInit() {
        let id = this.id = this.route.snapshot.params['id'];
        this.isNew = !this.id;
        this.setViewMode();
        this.getPurchase();
        this.buildPurchaseForm(this.purchase);
        if (this.id) {
            this.viewMode = 'print-purchase';
            this.purchaseService.getPurchaseById(id)
                .subscribe(res => {
                this.purchase = res;
                this.buildPurchaseForm(this.purchase);
            });
        }
    }
    validatePurchaseExist(control) {
        return new Promise((resolve) => {
            if (!control.value) {
                resolve(true);
            }
            else {
                this.purchaseService.getValidatePurchaseExist(control.value).subscribe((isAvailable) => {
                    this.purchaseExists = isAvailable;
                    resolve(this.purchaseExists ? { purchaseTaken: true } : null);
                }, (error) => {
                    this.purchaseExists = true;
                    resolve({ purchaseTaken: true });
                });
            }
        });
    }
    getPurchase() {
        this.id = this.route.snapshot.params['id_purchase'];
        console.log(this.id);
        this.purchaseService.getPurchaseById(parseInt(this.id)).subscribe((data) => {
            this.purchase = data;
            console.log(this.purchase);
        }, (error) => {
            console.error('Error al obtener rol:', error);
        });
    }
    createPurchase() {
        this.purchaseForm.markAllAsTouched();
        if (this.purchaseForm.valid) {
            const purchaseData = this.purchaseForm.value;
            this.loading = true;
            this.purchaseService.createPurchase(purchaseData).subscribe(() => {
                this.loading = false;
                this.submit();
            }, (error) => {
                this.loading = false;
                this.toastr.error('Ocurrió un error al crear la categoría.', 'Error');
            });
        }
        else {
            this.toastr.error('Por favor, complete todos los campos correctamente.', 'Error de validación', { progressBar: true, timeOut: 3000 });
        }
    }
    cancel() {
        this.router.navigateByUrl('/purchases');
    }
    submit() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.toastr.success('Categoría registrada con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
                setTimeout(() => {
                    this.router.navigateByUrl('/purchase');
                }, 3000);
            }, 3000);
        }
    }
    setViewMode() {
        const currentRoute = this.router.url;
        if (currentRoute.includes('/new')) {
            this.viewMode = 'new-purchase';
        }
        else if (currentRoute.includes('/print-purchase')) {
            this.viewMode = 'print-purchase';
        }
    }
    buildPurchaseForm(i = {}) {
        this.purchaseForm = this.fb.group({
            id: [i.id_purchase],
            datePurchaseCreation: [i.creation_date_purchase ? src_app_shared_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.dateToNgbDate(i.creation_date_purchase) : {}],
            editPurchase: this.fb.group({
                name_purchase: [i.editPurchase ? i.editPurchase.name_purchase : ''],
                observation_purchase: [i.editPurchase ? i.editPurchase.observation_purchase : ''],
                state_purchase: [i.editPurchase ? i.editPurchase.state_purchase : ''],
                creation_date_purchase: ['']
            }),
        });
        // Escucha los cambios de valor y calcula el total si es necesario.
        if (this.purchaseFormSub) {
            this.purchaseFormSub.unsubscribe();
        }
    }
    savePurchase() {
        this.saving = true;
        this.purchase = this.purchaseForm.value;
        this.purchase.orderDate = src_app_shared_utils__WEBPACK_IMPORTED_MODULE_0__.Utils.ngbDateToDate(this.purchaseForm.value.orderDate);
        this.purchaseService.savePurchase(this.purchaseForm.value)
            .subscribe((savedPurchase) => {
            this.viewMode = 'print-purchase';
            this.saving = false;
            this.toastr.success('Categoria Actualizada Correctamente', 'Éxito!', { timeOut: 3000 });
            if (this.isNew) {
                this.router.navigateByUrl('/purchase/edit/' + savedPurchase.id);
            }
        });
    }
    print() {
        if (window) {
            window.print();
        }
    }
}
PurchaseDetailComponent.ɵfac = function PurchaseDetailComponent_Factory(t) { return new (t || PurchaseDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_6__.ToastrService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](src_app_shared_services_purchase_service__WEBPACK_IMPORTED_MODULE_1__.PurchasesService)); };
PurchaseDetailComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: PurchaseDetailComponent, selectors: [["app-purchase-print-purchase"]], decls: 15, vars: 8, consts: [[1, "breadcrumb"], [4, "ngIf"], [3, "routerLink"], [1, "separator-breadcrumb", "border-top"], [1, "form-container"], ["id", "print-area", "class", "print-view", 4, "ngIf"], ["id", "print-area", 1, "print-view"], [1, "d-sm-flex", "mb-5"], [1, "m-auto"], ["routerLink", "/purchases", 1, "btn", "btn-outline-secondary", "me-3", "mb-sm-0", "mb-3", "button-spacing"], [1, "btn", "btn-primary", "mb-sm-0", "mb-3", 3, "click"], [1, "row"], [1, "col-md-6"], [1, "font-weight-bold"], [1, "col-md-6", "text-sm-right"], [1, "mt-3", "mb-4", "border-top"], [1, "row", "mb-5"], [1, "col-md-6", "mb-3", "mb-sm-0"], [2, "white-space", "pre-line"], [1, "col-md-12"], [1, "table", "table-hover", "mb-4"], [1, "bg-gray-300"], ["scope", "col"], [4, "ngFor", "ngForOf"], [1, "invoice-summary", "float-right"], ["scope", "row"], [3, "formGroup", "ngSubmit"], [1, "ng-container"], [1, "col-md-3"], [1, "form-group"], ["for", "fechaCompra"], [1, "required"], ["type", "date", "id", "fechaCompra", "placeholder", "Fecha Compra", 1, "form-control", 2, "width", "100%"], ["id", "textoc", 1, "textoc"], ["for", "numFactura"], ["type", "text", "id", "numFactura", "placeholder", "Numero de factura", 1, "form-control", 2, "width", "100%"], ["id", "textoF", 1, "textoF"], ["for", "observaciones"], ["type", "text", "id", "observaciones", "placeholder", "Observaciones", 1, "form-control", 2, "width", "100%"], ["for", "categoria"], ["id", "categoria", 1, "form-control", "select2bs4", 2, "width", "100%"], ["selected", "selected"], [1, "texto4"], ["for", "producto"], [1, "input-group"], ["type", "text", "id", "producto", "placeholder", "Digite el producto", 1, "form-control", 2, "width", "100%"], ["id", "texto3", 1, "texto3"], [1, "col-md-2"], [1, "button_container"], [1, "btn", "btn-success", "float-right", 3, "routerLink"], [1, "btn", "btn-warning", 3, "click"], [1, "i-Add"], ["for", "precioCompra"], ["type", "text", "id", "precioCompra", "placeholder", "Precio Compra", 1, "form-control", 2, "width", "100%"], ["id", "texto5", 1, "texto5"], ["type", "text", "id", "precioCompra", "placeholder", " Precio Venta", 1, "form-control", 2, "width", "100%"], ["for", "precioVenta"], ["type", "text", "id", "precioVenta", "placeholder", "Iva", 1, "form-control", 2, "width", "100%"], ["id", "texto7", 1, "texto7"], ["for", "cantidad"], ["type", "text", "id", "cantidad", "placeholder", "Cantidad", 1, "form-control", 2, "width", "100%"], ["id", "texto8", 1, "texto8"], [1, "col-md-12", "mt-4", "table-border"], ["formArrayName", "products"], [4, "ngIf", "ngIfElse"], ["detailView", ""], [1, "table-footer"], [1, "col-md-8"], [1, "total"], [1, "row", "mt-4"], [1, "col-md-6", "form-group", "mb-3"], ["for", "observation"], ["id", "observation_category", "placeholder", "Observaci\u00F3n", "formControlName", "observation_category", 1, "form-control"], ["class", "error-message", 4, "ngIf"], [1, "col-md-12", 2, "margin-top", "20px"], [1, "d-flex", "justify-content-end"], [1, "btn", "btn-danger", "float-right", 3, "routerLink"], ["style", "width: 10px;", 4, "ngIf"], ["btnClass", "btn-primary", 3, "loading"], [3, "formGroupName", 4, "ngFor", "ngForOf"], [3, "formGroupName"], ["id", "id_product", "formControlName", "id_product", 1, "form-control", 3, "change"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "number", "name", "unitPrice", "id", "unitPrice", "class", "form-control", "formControlName", "unitPrice", 3, "readonly", 4, "ngIf"], ["type", "number", "formControlName", "unit", 1, "form-control", 3, "change"], ["type", "number", "formControlName", "subtotal", 1, "form-control", 3, "readonly"], [1, "btn", "btn-danger", 3, "click"], [1, "i-Remove-Cart"], [3, "value"], ["type", "number", "name", "unitPrice", "id", "unitPrice", "formControlName", "unitPrice", 1, "form-control", 3, "readonly"], [1, "error-message"], [2, "width", "10px"]], template: function PurchaseDetailComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, PurchaseDetailComponent_h1_1_Template, 2, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, PurchaseDetailComponent_h1_2_Template, 1, 0, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "ul")(4, "li")(5, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Compras");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, PurchaseDetailComponent_li_7_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, PurchaseDetailComponent_li_8_Template, 2, 0, "li", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](9, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](11, "br")(12, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, PurchaseDetailComponent_div_13_Template, 69, 12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, PurchaseDetailComponent_div_14_Template, 143, 11, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "new-purchase");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "print-purchase");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](7, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "new-purchase");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "print-purchase");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode === "print-purchase");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.viewMode == "new-purchase");
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormArrayName, _shared_components_btn_loading_btn_loading_component__WEBPACK_IMPORTED_MODULE_2__.BtnLoadingComponent, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLinkWithHref, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe], styles: [".error-message[_ngcontent-%COMP%] {\n  color: red;\n}\n\n.required[_ngcontent-%COMP%] {\n  color: red;\n}\n\n.form-group.text-right[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]   btn-danger[_ngcontent-%COMP%] {\n  margin-right: 10px;\n  color: white; \n  font-size: 14px;\n}\n\n.form-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  background-color: #f5f5f5;\n  border: 1px solid #ddd;\n}\n\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.form-control[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.section[_ngcontent-%COMP%] {\n  border: 1px solid #ddd;\n  padding: 10px;\n  margin-bottom: 20px;\n  background-color: #fff;\n}\n\n.table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.btn[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n\n.error-message[_ngcontent-%COMP%] {\n  color: #f00;\n  font-size: 14px;\n}\n\n.ngx-datatable.scroll-vertical.datatable-body[_ngcontent-%COMP%] {\n  overflow: hidden;\n  overflow-y: hidden !important;\n}\n\n.total-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1cmNoYXNlLWRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFVBQUE7QUFDSjs7QUFLRTtFQUNFLFVBQUE7QUFGSjs7QUFPRTtFQUNFLGtCQUFBO0VBQ0EsWUFBQSxFQUFBLG9CQUFBO0VBQ0EsZUFBQTtBQUpKOztBQU9BO0VBQ0UsYUFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7QUFKRjs7QUFPQTtFQUNFLG1CQUFBO0FBSkY7O0FBV0E7RUFDRSxXQUFBO0FBUkY7O0FBWUE7RUFDRSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBVEY7O0FBYUE7RUFDRSxXQUFBO0FBVkY7O0FBY0E7RUFDRSxrQkFBQTtBQVhGOztBQWVBO0VBQ0UsV0FBQTtFQUNBLGVBQUE7QUFaRjs7QUFnQkE7RUFDRSxnQkFBQTtFQUNBLDZCQUFBO0FBYkY7O0FBaUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FBZEYiLCJmaWxlIjoicHVyY2hhc2UtZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmVycm9yLW1lc3NhZ2Uge1xyXG4gICAgY29sb3I6IHJlZDtcclxufVxyXG5cclxuXHJcblxyXG4gIFxyXG4gIC5yZXF1aXJlZCB7XHJcbiAgICBjb2xvcjogcmVkO1xyXG4gIH1cclxuICBcclxuXHJcblxyXG4gIC5mb3JtLWdyb3VwLnRleHQtcmlnaHQgLmJ0biBidG4tZGFuZ2VyICB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgICBjb2xvcjogd2hpdGU7IC8qIFRleHRvIGVuIGJsYW5jbyAqL1xyXG4gICAgZm9udC1zaXplOiAxNHB4OyBcclxuICB9XHJcbi8vRVNUSUxPIERFIEZPUk1VTEFSSU9TIFxyXG4uZm9ybS1jb250YWluZXIge1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG59XHJcblxyXG4uZm9ybS1ncm91cCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLy8gLmZvcm0tZ3JvdXAgbGFiZWwge1xyXG4vLyAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4vLyB9XHJcblxyXG4uZm9ybS1jb250cm9sIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLy9FU1RJTE8gREUgU0VDQ0lPTkVTXHJcbi5zZWN0aW9uIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4vL0VTVElMT1MgUEFSQSBMQSBUQUJMQSBERVRBTExFU1xyXG4udGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4vL0VTVElMT1MgUEFSQSBMT1MgQk9UT05FU1xyXG4uYnRuIHtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi8vRVNUSUxPUyBQQVJBIE1FTlNBSkVTIERFIEVSUk9SXHJcbi5lcnJvci1tZXNzYWdlIHtcclxuICBjb2xvcjogI2YwMDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi8vUVVJRVRBUkxFIEVMIFNDUk9MTCBBIExBIFRBQkxBIERFIENPTVBSQVNcclxuLm5neC1kYXRhdGFibGUuc2Nyb2xsLXZlcnRpY2FsLmRhdGF0YWJsZS1ib2R5e1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgb3ZlcmZsb3cteTogaGlkZGVuICFpbXBvcnRhbnQ7O1xyXG59XHJcblxyXG4vL0FMSU5FQVIgVE9UQUwgQ09OIEVMIENBTVBPIFBST1ZFRURPUlxyXG4udG90YWwtZ3JvdXAge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG4iXX0= */"] });


/***/ }),

/***/ 73983:
/*!**************************************************************************!*\
  !*** ./src/app/views/purchases/purchase-list/purchase-list.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PurchaseListComponent": () => (/* binding */ PurchaseListComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 80823);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 22560);
/* harmony import */ var src_app_shared_services_purchase_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/services/purchase.service */ 9991);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ 82808);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 60124);










const _c0 = ["deleteConfirmModal"];
function PurchaseListComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " # Factura ");
} }
function PurchaseListComponent_ng_template_25_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    const rowIndex_r16 = ctx_r18.rowIndex;
    const row_r15 = ctx_r18.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"](" ", rowIndex_r16 + 1, ". ", row_r15.invoice_number, " ");
} }
function PurchaseListComponent_ng_template_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, PurchaseListComponent_ng_template_25_ng_container_0_Template, 2, 2, "ng-container", 21);
} if (rf & 2) {
    const row_r15 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r15 && row_r15.id_purchase);
} }
function PurchaseListComponent_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Proveedor ");
} }
function PurchaseListComponent_ng_template_28_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const row_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r20.id_provider, " ");
} }
function PurchaseListComponent_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, PurchaseListComponent_ng_template_28_ng_container_0_Template, 2, 1, "ng-container", 21);
} if (rf & 2) {
    const row_r20 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", row_r20 && row_r20.id_purchase);
} }
function PurchaseListComponent_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Fecha ");
} }
function PurchaseListComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "date");
} if (rf & 2) {
    const row_r27 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](1, 1, row_r27.purchase_date, "dd/MM/yyyy"), " ");
} }
function PurchaseListComponent_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Total Factura ");
} }
function PurchaseListComponent_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r31 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r31.total_purchase, " ");
} }
function PurchaseListComponent_ng_template_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Estado ");
} }
function PurchaseListComponent_ng_template_37_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0);
} if (rf & 2) {
    const row_r35 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", row_r35.state_purchase, " ");
} }
function PurchaseListComponent_ng_template_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](0, " Acciones ");
} }
const _c1 = function (a1) { return ["/purchases/detail", a1]; };
function PurchaseListComponent_ng_template_40_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PurchaseListComponent_ng_template_40_Template_button_click_2_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r41); const row_r39 = restoredCtx.row; const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r40.openModal(row_r39.id_purchase)); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "i", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r39 = ctx.row;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c1, row_r39.id_purchase));
} }
function PurchaseListComponent_ng_template_41_Template(rf, ctx) { if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26)(1, "h4", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Cambiar Estado del Categor\u00EDa");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PurchaseListComponent_ng_template_41_Template_button_click_3_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r44); const modal_r42 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r42.dismiss("Cross click")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 30)(7, "p")(8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "\u00BFEst\u00E1 seguro de que desea inhabilitar esta compra?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 31)(11, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PurchaseListComponent_ng_template_41_Template_button_click_11_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r44); const modal_r42 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r42.dismiss("cancel")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PurchaseListComponent_ng_template_41_Template_button_click_13_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r44); const modal_r42 = restoredCtx.$implicit; return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](modal_r42.close("Ok")); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Aceptar");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
} }
const _c2 = function () { return ["/purchases/new"]; };
// ...
class PurchaseListComponent {
    constructor(_purchaseService, modalService, toastr) {
        this._purchaseService = _purchaseService;
        this.modalService = modalService;
        this.toastr = toastr;
        this.searchControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl();
        this.listPurchases = [];
        this.filteredPurchases = [];
        this.purchases = [];
        this.offset = 0;
        this.pageSize = 6;
        this.currentPage = 1;
        this.modalAbierto = false;
    }
    ngOnInit() {
        this._purchaseService.getAllPurchase().subscribe((res) => {
            this.listPurchases = [...res];
            this.filteredPurchases = res;
        });
        this.searchControl.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.debounceTime)(200)).subscribe(value => {
            this.filterData(value);
        });
    }
    filterData(val) {
        if (val) {
            val = val.toLowerCase();
        }
        else {
            return this.filteredPurchases = [...this.purchases];
        }
        const columns = Object.keys(this.purchases[0]);
        if (!columns.length) {
            return;
        }
        const rows = this.purchases.filter(function (d) {
            for (let i = 0; i <= columns.length; i++) {
                const column = columns[i];
                if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                    return true;
                }
            }
        });
        this.filteredPurchases = rows;
    }
    onPageChange(event) {
        console.log('onPageChange: ', event);
        this.currentPage = event.offset + 1;
        this.loadData(); // Llama a loadData al cambiar de página
    }
    loadData() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        let endIndex = startIndex + this.pageSize;
        const totalPages = Math.ceil(this.listPurchases.length / this.pageSize);
        if (this.currentPage === totalPages) {
            const remainingRows = this.listPurchases.length % this.pageSize;
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows;
            }
        }
        // Ajusta el índice para que sea el próximo número divisible por 6 
        const rowsToAdd = 6 - (endIndex % 6);
        endIndex += rowsToAdd;
        this.filteredPurchases = this.listPurchases.slice(startIndex, endIndex);
        console.log('load data charged');
    }
    sortListCategoryById() {
        this.listPurchases.sort((a, b) => a.id_purchase - b.id_purchase);
    }
    getPurchases() {
        this._purchaseService.getAllPurchase().subscribe((data) => {
            this.listPurchases = data;
            this.sortListCategoryById();
        }, (error) => {
            console.error('Error al obtener categorías:', error);
        });
    }
    openModal(idCategory) {
        this._purchaseService.getPurchaseById(idCategory).subscribe;
        if (!this.modalAbierto) {
            this.modalAbierto = true;
            this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then((result) => {
                if (result === 'Ok') {
                    this._purchaseService.PurchaseChangeStatus(idCategory).subscribe((data) => {
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
    toggleState(row) {
        row.state_category = !row.state_category;
        // Aquí puedes realizar acciones adicionales según el nuevo estado, si es necesario.
    }
}
PurchaseListComponent.ɵfac = function PurchaseListComponent_Factory(t) { return new (t || PurchaseListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_services_purchase_service__WEBPACK_IMPORTED_MODULE_0__.PurchasesService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__.NgbModal), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_5__.ToastrService)); };
PurchaseListComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: PurchaseListComponent, selectors: [["app-purchase-list"]], viewQuery: function PurchaseListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 7);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.deleteConfirmModal = _t.first);
    } }, decls: 43, vars: 33, consts: [[1, "breadcrumb"], ["href", ""], [1, "separator-breadcrumb", "border-top"], [1, "row", "mb-3"], [1, "col-md-12"], [1, "row"], [1, "col-md-6"], [1, "form-group"], [1, "btn", "btn-primary", 3, "routerLink"], [1, "col-md-6", "text-end"], ["id", "id_provider", "placeholder", "Buscar Category", "type", "text", 1, "form-control", 3, "formControl"], [1, "card", "o-hidden"], [1, "material", "fullscreen", 2, "height", "460px", 3, "columnMode", "headerHeight", "footerHeight", "rowHeight", "scrollbarV", "scrollbarH", "rows", "externalPaging", "count", "limit", "offset", "page"], ["name", "id_provider", 3, "resizeable", "canAutoResize", "minWidth"], ["ngx-datatable-header-template", ""], ["ngx-datatable-cell-template", ""], ["name", "invoice_number", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "tota_purchase", 3, "resizeable", "canAutoResize", "minWidth"], ["name", "state_purchase", 3, "resizeable", "canAutoResize", "minWidth"], [3, "resizeable", "canAutoResize", "minWidth"], ["deleteConfirmModal", ""], [4, "ngIf"], [1, "btn", "btn-dark", "m-1", 3, "routerLink"], [1, "i-Eye"], [1, "btn", "btn-danger", "m-1", 3, "click"], [1, "i-Close"], [1, "modal-header"], ["id", "modal-title", 1, "modal-title"], ["type", "button", "aria-label", "Close button", "aria-describedby", "modal-title", 1, "close", 3, "click"], ["aria-hidden", "true"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-outline-secondary", 3, "click"], ["type", "button", "ngbAutofocus", "", 1, "btn", "btn-wide", "btn-danger", 3, "click"]], template: function PurchaseListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Compras");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul")(4, "li")(5, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Compras");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Lista de Compras");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 3)(11, "div", 4)(12, "div", 5)(13, "div", 6)(14, "div", 7)(15, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Crear nueva Compra");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 9)(18, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 4)(21, "div", 11)(22, "ngx-datatable", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("page", function PurchaseListComponent_Template_ngx_datatable_page_22_listener($event) { return ctx.onPageChange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "ngx-datatable-column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, PurchaseListComponent_ng_template_24_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, PurchaseListComponent_ng_template_25_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "ngx-datatable-column", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, PurchaseListComponent_ng_template_27_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, PurchaseListComponent_ng_template_28_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "ngx-datatable-column", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](30, PurchaseListComponent_ng_template_30_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, PurchaseListComponent_ng_template_31_Template, 2, 4, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "ngx-datatable-column", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](33, PurchaseListComponent_ng_template_33_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](34, PurchaseListComponent_ng_template_34_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "ngx-datatable-column", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, PurchaseListComponent_ng_template_36_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](37, PurchaseListComponent_ng_template_37_Template, 1, 1, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "ngx-datatable-column", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](39, PurchaseListComponent_ng_template_39_Template, 1, 0, "ng-template", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](40, PurchaseListComponent_ng_template_40_Template, 4, 3, "ng-template", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](41, PurchaseListComponent_ng_template_41_Template, 15, 0, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](32, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.searchControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("columnMode", "force")("headerHeight", 50)("footerHeight", 50)("rowHeight", "auto")("rowHeight", 60)("scrollbarV", true)("scrollbarH", true)("rows", ctx.listPurchases)("externalPaging", true)("count", ctx.listPurchases.length)("limit", ctx.pageSize)("offset", (ctx.currentPage - 1) * ctx.pageSize);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 200);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 200);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("resizeable", false)("canAutoResize", true)("minWidth", 200);
    } }, dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.DatatableComponent, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.DataTableColumnDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.DataTableColumnHeaderDirective, _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__.DataTableColumnCellDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlDirective, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe], styles: ["@charset \"UTF-8\";\n.ngx-datatable.scroll-vertical[_ngcontent-%COMP%]   .datatable-body[_ngcontent-%COMP%] {\n  overflow-x: hidden;\n}\n.ngx-datatable.scroll-horz[_ngcontent-%COMP%]   .datatable-body[_ngcontent-%COMP%] {\n  overflow-y: hidden;\n}\n@media print {\n  .print-view[_ngcontent-%COMP%] {\n    background-color: #fff;\n    padding: 20px;\n  }\n  .print-title[_ngcontent-%COMP%] {\n    font-size: 24px;\n    margin-bottom: 20px;\n  }\n  .print-field[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n}\n.btn-separator[_ngcontent-%COMP%] {\n  margin-right: 10px;\n}\n.button-spacing[_ngcontent-%COMP%] {\n  margin-right: 10px; \n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 10px; \n}\n.red-button[_ngcontent-%COMP%] {\n  color: red;\n  \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1cmNoYXNlLWxpc3QuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQWhCO0VBQ0ksa0JBQUE7QUFFSjtBQUNBO0VBQ0ksa0JBQUE7QUFFSjtBQUNBO0VBQ0k7SUFDRSxzQkFBQTtJQUNBLGFBQUE7RUFFSjtFQUNFO0lBQ0UsZUFBQTtJQUNBLG1CQUFBO0VBQ0o7RUFFRTtJQUNFLG1CQUFBO0VBQUo7QUFDRjtBQUtBO0VBQ0ksa0JBQUE7QUFISjtBQU1FO0VBQ0Usa0JBQUEsRUFBQSw2Q0FBQTtBQUhKO0FBTUU7RUFDRSxtQkFBQSxFQUFBLDZDQUFBO0FBSEo7QUFNRTtFQUNFLFVBQUE7RUFDQSxxQ0FBQTtBQUhKIiwiZmlsZSI6InB1cmNoYXNlLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubmd4LWRhdGF0YWJsZS5zY3JvbGwtdmVydGljYWwgLmRhdGF0YWJsZS1ib2R5IHtcclxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxufVxyXG5cclxuLm5neC1kYXRhdGFibGUuc2Nyb2xsLWhvcnogLmRhdGF0YWJsZS1ib2R5IHtcclxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxufVxyXG5cclxuQG1lZGlhIHByaW50IHtcclxuICAgIC5wcmludC12aWV3IHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgcGFkZGluZzogMjBweDtcclxuICAgIH1cclxuICBcclxuICAgIC5wcmludC10aXRsZSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgIH1cclxuICBcclxuICAgIC5wcmludC1maWVsZCB7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7IFxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuXHJcblxyXG4uYnRuLXNlcGFyYXRvciB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgfVxyXG5cclxuICAuYnV0dG9uLXNwYWNpbmcge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4OyAvKiBBanVzdGEgZWwgdmFsb3Igc2Vnw7puIGVsIGVzcGFjaW8gZGVzZWFkbyAqL1xyXG4gIH1cclxuICBcclxuICAuZm9ybS1ncm91cCB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4OyAvKiBBanVzdGEgZWwgdmFsb3Igc2Vnw7puIGVsIGVzcGFjaW8gZGVzZWFkbyAqL1xyXG4gIH1cclxuICBcclxuICAucmVkLWJ1dHRvbiB7XHJcbiAgICBjb2xvcjogcmVkO1xyXG4gICAgLyogT3Ryb3MgZXN0aWxvcyBxdWUgZGVzZWVzIGFwbGljYXIgKi9cclxuICB9XHJcbiAgXHJcblxyXG4iXX0= */"] });


/***/ }),

/***/ 16248:
/*!************************************************************!*\
  !*** ./src/app/views/purchases/purchase-routing.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PurchaseRoutingModule": () => (/* binding */ PurchaseRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 60124);
/* harmony import */ var _purchase_detail_purchase_detail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./purchase-detail/purchase-detail.component */ 23493);
/* harmony import */ var _purchase_list_purchase_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./purchase-list/purchase-list.component */ 73983);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 22560);





const routes = [
    {
        path: '',
        component: _purchase_list_purchase_list_component__WEBPACK_IMPORTED_MODULE_1__.PurchaseListComponent
    },
    {
        path: 'new',
        component: _purchase_detail_purchase_detail_component__WEBPACK_IMPORTED_MODULE_0__.PurchaseDetailComponent
    },
    {
        path: 'detail/:id_purchase',
        component: _purchase_detail_purchase_detail_component__WEBPACK_IMPORTED_MODULE_0__.PurchaseDetailComponent
    }
];
class PurchaseRoutingModule {
}
PurchaseRoutingModule.ɵfac = function PurchaseRoutingModule_Factory(t) { return new (t || PurchaseRoutingModule)(); };
PurchaseRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: PurchaseRoutingModule });
PurchaseRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](PurchaseRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 1325:
/*!****************************************************!*\
  !*** ./src/app/views/purchases/purchase.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PurchaseModule": () => (/* binding */ PurchaseModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 94666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 34534);
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ 77070);
/* harmony import */ var src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/shared/components/shared-components.module */ 50933);
/* harmony import */ var _purchase_detail_purchase_detail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./purchase-detail/purchase-detail.component */ 23493);
/* harmony import */ var _purchase_list_purchase_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./purchase-list/purchase-list.component */ 73983);
/* harmony import */ var _purchase_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./purchase-routing.module */ 16248);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 22560);

 // Importa solo ReactiveFormsModule







class PurchaseModule {
}
PurchaseModule.ɵfac = function PurchaseModule_Factory(t) { return new (t || PurchaseModule)(); };
PurchaseModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: PurchaseModule });
PurchaseModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _purchase_routing_module__WEBPACK_IMPORTED_MODULE_3__.PurchaseRoutingModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](PurchaseModule, { declarations: [_purchase_detail_purchase_detail_component__WEBPACK_IMPORTED_MODULE_1__.PurchaseDetailComponent, _purchase_list_purchase_list_component__WEBPACK_IMPORTED_MODULE_2__.PurchaseListComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__.NgxDatatableModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__.ReactiveFormsModule,
        src_app_shared_components_shared_components_module__WEBPACK_IMPORTED_MODULE_0__.SharedComponentsModule,
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_8__.NgbModule,
        _purchase_routing_module__WEBPACK_IMPORTED_MODULE_3__.PurchaseRoutingModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_views_purchases_purchase_module_ts.js.map