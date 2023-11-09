export class CategoryFormMode {
    id_category: string;
    name_category: string;
    observation_category: string;
    state_category: string;
    creation_date_category: Date

    constructor(response){
        this.name_category = response.name_category;
        this.creation_date_category = new Date(response.creation_date_category);
        this.state_category = response.state_category;
        this.id_category = response.id_category;
        this.observation_category = response.observation_category;

    }
}