import { CategoryFormMode } from "../../categorias/models/category.model";
import { ProductFormModel } from "../../products/models/product.model";

// Define la interfaz Products
export interface Detail {
    id_product: string;
    id_category: string;
    cost_price: number;
    selling_price: number;
    vat: number;
    product_quantity: number;
    product: ProductPurchase

}

// Define la interfaz Products
export interface ProductPurchase {
    id_product: string;
    name_product: string;
    product_category: CategoryFormMode;
}


// Define la interfaz Products
export interface ProviderProductPurchase{
    id_provider: string;
    name_provider: string;
}

// Usa la interfaz Products en la clase PurchaseFormMode
export class PurchaseFormMode {
    id_purchase: string;
    id_provider: string;
    provider:ProviderProductPurchase;
    invoice_number: string;
    purchase_date: Date;
    record_date_purchase: Date;
    total_purchase: number;
    state_purchase: string;
    observation_purchase: string;
    reason_anulate: string;
    purchase_detail: Detail[]; // Cambiado de Product a Products
    purchase_details: Detail[]; // Cambiado de Product a Products
   
    constructor(response) {
        this.id_purchase = response.id_purchase;
        this.invoice_number = response.invoice_number;
        this.id_provider = response.id_provider;
        this.purchase_date = new  Date (response.purchase_date);
        this.observation_purchase = response.observation_purchase
        this.purchase_detail = response.products;
        this.purchase_details = response.purchase_details;
        this.record_date_purchase = response.record_date_purchase;
        this.reason_anulate = response.reason_anulate;
        this.state_purchase = response.state_purchase;
    }
}
