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
                console.log(this.listCategories);
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
        this.countLabel = this.listCategories.length;
    }
//AJUSTAR LA LISTA DE CATEGORIAS
    adjustListCategories() {
        const totalRows = this.listCategories.length;
        const remainingRows = 6 - (totalRows % 6);

        for (let i = 0; i < remainingRows; i++) {
            this.listCategories.push({}); // Agrega filas vacías
        }

        this.loadData();
    }

    sortListCategoriesById() {
        this.listCategories.sort((a, b) => {
            if (a.id_categoríae < b.id_categoríae) {
                return -1;
            }
            if (a.id_categoríae > b.id_categoríae) {
                return 1;
            }
            return 0;
        });
    }
//CARGA LAS CATEGORIAS EN CADA PAGINA
    loadData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;

        const totalPages = Math.ceil(this.listCategories.length / this.itemsPerPage);

        if (this.currentPage === totalPages) {
            const remainingRows = this.listCategories.length % this.itemsPerPage;
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows;
            }
        }

        // Ajusta endIndex para que sea el próximo número divisible por 6
        const rowsToAdd = 6 - (endIndex % 6);
        endIndex += rowsToAdd;

        this.filteredCategories = this.listCategories.slice(startIndex, endIndex);

        console.log('load data charged');
    }

    onPageChange(event: any) {
        console.log('onPageChange event:', event);
        this.currentPage = event.offset + 1;
        this.loadData();
    }
    //CAMBIAR ESTADO

    @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

    openModal(IdCategory: number) {
        this._categoriesService.getCategoryById(IdCategory).subscribe(
            (data) => {
                if (!this.modalAbierto) {
                    this.modalAbierto = true;
                    this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
                        (result) => {
                            if (result === 'Ok') {
                                this._categoriesService.CategoryChangeStatus(IdCategory).subscribe(
                                    (data) => {
                                        this.loading = false;
                                        this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', {
                                            progressBar: true,
                                            timeOut: 2000
                                        });
                                        setTimeout(() => {
                                            location.reload();
                                        }, 2000);
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
                                setTimeout(() => {
                                    location.reload();
                                }, 2000);
                            }
                        },
                        (reason) => {
                            this.modalAbierto = false;
                            location.reload();
                        }
                    );
                }
            },
            (error) => {
                console.error('Error al obtener el categoría:', error);
            }
        );
    }
}