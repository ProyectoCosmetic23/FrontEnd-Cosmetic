
export class UserFormModel {
    id_user: string;
    id_card_employee: string;
    creation_date_user: Date;
    username: string;
    email: string;
    password: string;
    state_user: string;
    observation_user: string;
    name_role:string;
    id_role: string




    constructor(response) {
        this.id_user = response.id_user;
        this.id_card_employee = response.id_card_employee;
        this.creation_date_user = response.creation_date_user;
        this.username = response.username;
        this.email = response.email;
        this.password = response.password;
        this.state_user = response.state_user;
       this.observation_user = response.observation_user;
       this.name_role=response.name_role;
       this.id_role=response.id_role
    }
}