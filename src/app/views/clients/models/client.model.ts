export class ClientFormModel {
    nit_or_id_client: string;
    name_client: string;
    last_name_client: string;
    email_client: string;
    phone_client: string;
    address_client: string;
    state_client: string;



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