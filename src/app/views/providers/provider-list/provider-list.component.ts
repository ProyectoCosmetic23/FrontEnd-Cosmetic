import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/shared/services/provider.service';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


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
    filteredProviders;
    paginationId: string = 'providers-pagination';

    currentPage: number = 1;
    itemsPerPage: number = 6;


    onPageChange(event: any) {
        this.currentPage = event.offset / this.itemsPerPage + 1;
        this.updateListProviders();
    }

    constructor(
        private _providersService: ProvidersService,
        private modalService: NgbModal,
        private toastr: ToastrService,
        private cookieService: CookieService,
    ) { }

    ngOnInit(): void {
        const token = this.cookieService.get('token');
        console.log(token);
        this._providersService.getAllProviders(token)
            .subscribe((res: any[]) => {
                this.providers = [...res];
                this.listProviders = [...res];
                this.filteredProviders = [...res];
                this.originalListProviders = [...res];
            });
    
        this.searchControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filerData(value);
            });
    }
    

    
    updateListProviders() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        let endIndex = startIndex + this.itemsPerPage;
        const totalPages = Math.ceil(this.listProviders.length / this.itemsPerPage);

        if (this.currentPage === totalPages) {
            const remainingRows = this.listProviders.length%this.itemsPerPage
            if (remainingRows > 0) {
                endIndex = startIndex + remainingRows
            }
        }

        const rowsToAdd = 6 -(endIndex % 6)
        endIndex += rowsToAdd
        this.filteredProviders = this.listProviders.slice(startIndex, endIndex)
    }

    pageChanged(event: any) {
        this.currentPage = event.page;
        this.updateListProviders();
    }

    filerData(val) {
        console.log('Valor de búsqueda (antes del toLowerCase):', val);
    
        if (val) {
            val = val.toLowerCase();
        } else {
            this.filteredProviders = [...this.listProviders];
            return;
        }
    
        console.log('Valor de búsqueda (después del toLowerCase):', val);
    
        const rows = this.listProviders.filter(function (d) {
            const nameProvider = d['name_provider'] ? d['name_provider'].toString().toLowerCase() : '';
            return nameProvider.indexOf(val) > -1;
        });
    
        console.log('Resultados después de filtrar:', rows);
    
        this.filteredProviders = rows;
    }
    
    

    sortListProvidersById() {
        this.listProviders.sort((a, b) => a.id_provider - b.id_provider);
    }

    getProviders() {
        const token = this.cookieService.get('token');
        this._providersService.getAllProviders().subscribe(
            (data) => {
                this.listProviders = data;
                this.sortListProvidersById();
                location.reload();
            },
            (error) => {
                console.error('Error al obtener los proveedores:', error);
            }
        );
    }

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

                                setTimeout(() => {
                                    location.reload();
                                }, 2000);
                            },
                            (error) => {
                                this.loading = false;
                                this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', { progressBar: true, timeOut: 2000 });
                                console.error('Error al cambiar de estado:', error);
                            }
                        );
                    } else if (result === 'Cancel') {
                        this.openedModal = false;
                        setTimeout(() => {
                            location.reload();
                        }, 2000);
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
