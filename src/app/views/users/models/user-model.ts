
export class UserFormModel {
  id_user: number;
  id_role: number;
  id_employee: number;
  id_card_employee: string;
  creation_date_user: Date;
  username: string;
  email: string;
  password: string;
  state_user: string;
  reason_anulate: string;
  observation_user: string;
  name_employee: string;
  name_role: string;

  constructor(response) {
    this.id_user = response.id_user;
    this.id_role = response.id_role;
    this.id_employee = response.id_employee;
    this.id_card_employee = response.id_card_employee;
    this.creation_date_user = response.creation_date_user;
    this.username = response.username;
    this.email = response.email;
    this.password = response.password;
    this.state_user = response.state_user;
    this.reason_anulate = response.reason_anulate;
    this.observation_user = response.observation_user;
    this.name_employee = response.name_employee;
    this.name_role = response.name_role;
  }
}