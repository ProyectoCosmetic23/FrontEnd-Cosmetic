import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
    loading: boolean;
    listCategories: any[] = [];
    modalAbierto = false;
    searchControl: UntypedFormControl = new UntypedFormControl();
    filteredCategories: any[] = [];
    currentPage = 1; // Propiedad para rastrear la página actual
    itemsPerPage = 6; // El número de filas por página
    countLabel: number;

    constructor(
        private _categoriesService: CategoriesService,
        private modalService: NgbModal,
        private toastr: ToastrService
    ) { }
//inicializa el get
    ngOnInit(): void {
        this.getCategories();
    }
//CONSULTA TODAS LAS CATEGORIAS
    getCategories() {
        this._categoriesService.getAllCategory().subscribe(
            (data) => {
                this.listCategories = data;
                this.filteredCategories =this.listCategories;
                this.sortListCategoriesById();
                this.adjustListCategories();
            },
            (error) => {
                console.error('Error al obtener Categorías:', error);
            }
        );
    }

    @ViewChild(DatatableComponent)
    table: DatatableComponent;

    //  actualizar el valor visual de count según tus necesidades
    actualizarCountLabel() {
        this.countLabel = this.filteredCategories.length;
    }
//AJUSTAR LA LISTA DE CATEGORIAS
    adjustListCategories() {
        // const totalRows = this.filteredCategories.length;
        // const remainingRows = 6 - (totalRows % 6);

        // for (let i = 0; i < remainingRows; i++) {
        //     // this.filteredCategories.push({}); // Agrega filas vacías
        // }

        this.loadData();
    }

    sortListCategoriesById() {
        this.filteredCategories.sort((a, b) => {
            if (a.id_category > b.id_category) {
                return -1;
            }
            if (a.id_category > b.id_category) {
                return 1;
            }
            return 0;
        });
    }
//CARGA LAS CATEGORIAS EN CADA PAGINA
    loadData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;

        const totalPages = Math.ceil(this.filteredCategories.length / this.itemsPerPage);

        if (this.currentPage === totalPages) {
            const remainingRows = this.filteredCategories.length % this.itemsPerPage;
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows;
            }
        }

        // Ajusta endIndex para que sea el próximo número divisible por 6
        const rowsToAdd = 6 - (endIndex % 6);
        endIndex += rowsToAdd;

        // this.filteredCategories = this.filteredCategories.slice(startIndex, endIndex);

        console.log('load data charged');
    }

    onPageChange(event: any) {
        console.log('onPageChange event:', event);
        this.currentPage = event.offset + 1;
        this.loadData();
    }

    searchCategory($event){
        
        const value = ($event.target as HTMLInputElement).value;
        if(value !==null && value !== undefined && value !== '')
        {
            this.filteredCategories = this.listCategories.filter(c => c.name_category.toLowerCase().indexOf(value.toLowerCase()) !== -1
            || this.changeCategoryStateDescription(c.state_category).toLowerCase().indexOf(value.toLowerCase()) !== -1)
        }else{
            this.filteredCategories = this.listCategories;
        }
    }

    changeCategoryStateDescription(state_category:boolean){
        return state_category ? 'Activo':'Inactivo';}


    //CAMBIAR ESTADO

    @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

    modalStatus(IdCategory: number, $event?: any): void {
   
            this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
                (result) => {
                    if (result === 'Ok') {
                        const isChecked = ($event.target as HTMLInputElement).checked;
                        this._categoriesService.CategoryChangeStatus(IdCategory,isChecked).subscribe(
                            (data) => {
                                this.loading = false;
                                this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', {
                                    progressBar: true,
                                    timeOut: 2000
                                });
                                this.getCategories();
                                this.modalAbierto = false;

                               
                            },
                            (error) => {
                                this.loading = false;
                                this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', {
                                    progressBar: true,
                                    timeOut: 2000
                                });
                                console.error('Error al cambiar de estado:', error);
                            }
                        );
                    } else if (result === 'Cancel') {
                        this.modalAbierto = false;
                     
                    }
                }
            );
    }
}