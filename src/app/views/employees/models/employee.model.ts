export class EmployeeFormModel {
    id_card_employee: string;
    name_employee: string;
    email: string;
    address: string;
    phone: string;
    state_employee: string;
    observation: string;
    creation_date_employee: Date;
    reason_anulate: string; // Nueva propiedad


    constructor(response) {
        this.id_card_employee = response.id_card_employee;
        this.name_employee = response.name_employee;
        this.email = response.email;
        this.address = response.address;
        this.phone = response.phone;
        this.state_employee = response.state_employee;
        this.observation = response.observation;
        this.creation_date_employee = response.creation_date_employee;
        this.reason_anulate = response.reason_anulate;
    }
}