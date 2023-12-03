export class ProductFormModel {
    id_product: string;
    id_category: string;
    name_product: string;
    quantity: string;
    max_stock: string;
    min_stock: string;
    cost_price: string;
    selling_price: string;
    profit: string;
    creation_date_product: Date;
    state_product: string;
    reason_anulate: string;
    observation: string;


    constructor(response) {
        this.id_product = response.id_product;
        this.id_category = response.id_category;
        this.name_product = response.name_product;
        this.quantity = response.quantity;
        this.max_stock =response.max_stock;
        this.min_stock = response.min_stock;
        this.cost_price = response.cost_price;
        this.selling_price = response.selling_price;
        this.profit = response.profit;
        this.state_product = response.state_product;
        this.reason_anulate = response.reason_anulate;
        this.observation = response.observation;
        this.creation_date_product = response.creation_date_product;
    }
}