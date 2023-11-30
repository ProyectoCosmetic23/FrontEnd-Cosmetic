import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/shared/services/provider.service';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { DatatableComponent } from '@swimlane/ngx-datatable';


@Component({
    selector: 'app-provider-list',
    templateUrl: './provider-list.component.html',
    styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {
    loading: boolean;
    listProviders: any[] = []
    originalListProviders: any[] = [];
    openedModal = false;
    searchControl: UntypedFormControl = new UntypedFormControl();
    providers;
    filteredProviders: any[] = [];
    paginationId: string = 'providers-pagination';

    currentPage: number = 1;
    itemsPerPage: number = 6;
    countLabel: number;


    constructor(
        private _providersService: ProvidersService,
        private modalService: NgbModal,
        private toastr: ToastrService,
        private cookieService: CookieService,
    ) { }

    ngOnInit(): void {
        this.getProviders();
        
    }

 
    getProviders() {
        const token = this.cookieService.get('token');
        this._providersService.getAllProviders().subscribe(
            (data) => {
                this.listProviders = data;
                this.filteredProviders =this.listProviders;
                this.sortListProvidersById();
                this.refreshListProviders();
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
        this.countLabel = this.filteredProviders.length;
    }
//AJUSTAR LA LISTA DE CATEGORIAS
    refreshListProviders() {
        // const totalRows = this.filteredProviders.length;
        // const remainingRows = 6 - (totalRows % 6);

        // for (let i = 0; i < remainingRows; i++) {
        //     // this.filteredProviders.push({}); // Agrega filas vacías
        // }

        this.loadData();
    }

    sortListProvidersById() {
        this.filteredProviders.sort((a, b) => {
            if (a.id_provider > b.id_provider) {
                return -1;
            }
            if (a.id_provider > b.id_provider) {
                return 1;
            }
            return 0;
        });
    }
//CARGA LAS CATEGORIAS EN CADA PAGINA
    loadData() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;

        const totalPages = Math.ceil(this.filteredProviders.length / this.itemsPerPage);

        if (this.currentPage === totalPages) {
            const remainingRows = this.filteredProviders.length % this.itemsPerPage;
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows;
            }
        }

        // Ajusta endIndex para que sea el próximo número divisible por 6
        const rowsToAdd = 6 - (endIndex % 6);
        endIndex += rowsToAdd;

        // this.filteredProviders = this.filteredProviders.slice(startIndex, endIndex);

        console.log('load data charged');
    }

    onPageChange(event: any) {
        console.log('onPageChange event:', event);
        this.currentPage = event.offset + 1;
        this.loadData();
    }
    searchProvider(event: Event) {
        const searchTerm = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
        if (searchTerm !== null && searchTerm !== undefined && searchTerm !== '') {
            this.filteredProviders = this.listProviders.filter(provider =>
                provider.name_provider.toLowerCase().includes(searchTerm) ||
                this.changeProviderStateDescription(provider.state_provider).toLowerCase().includes(searchTerm)
            );
        } else {
            this.filteredProviders = this.listProviders;
        }
    
        this.actualizarCountLabel();
        this.refreshListProviders();
    }
    

    changeProviderStateDescription(state_provider:boolean){
        return state_provider ? 'Activo':'Inactivo';}

    @ViewChild('changeStateModal', { static: true }) changeStateModal: any;

    openModal(idProvider: number) {
        this._providersService.getProviderById(idProvider).subscribe
        if (!this.openedModal) {
            this.openedModal = true;
            this.modalService.open(this.changeStateModal, { centered: true }).result.then(
                (result) => {
                    if (result === 'Yes') {
                        this._providersService.updateProviderStatus(idProvider).subscribe(
                            (data) => {

                                this.loading = false;
                                this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                                console.log(data);
                                this.getProviders();
                                this.openedModal = false;
                            },
                            (error) => {
                                this.loading = false;
                                this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', { progressBar: true, timeOut: 2000 });
                                console.error('Error al cambiar de estado:', error);
                                this.openedModal = false;
                            }
                        );
                    } else if (result === 'cancel') {
                        this.openedModal = false;
                        location.reload();
                    }
                },
                (reason) => {
                    this.openedModal = false;
                    location.reload();
                }
            );
        }
    }
}
