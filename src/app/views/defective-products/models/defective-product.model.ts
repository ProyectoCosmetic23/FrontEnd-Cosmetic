export class DefectiveProductFormModel {
    id_product: string;
    return_reason: string;
    return_date: string;
    return_quantity: string;
    return_value: string;
    name_product: string;
    id_defective_product: string;
    
    
    

    constructor(response) {
        this.id_product = response.id_product;
        this.return_reason= response.return_reason;
        this.return_date = response.return_date;
        this.return_quantity = response.return_quantity;
        this.return_value = response.return_value;
        this.name_product= response.name_product;
        this.id_defective_product = response.id_defective_product

    }
}

//defective-produc=