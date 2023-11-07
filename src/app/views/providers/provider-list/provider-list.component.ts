import { Component, OnInit, ViewChild } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/shared/services/provider.service';
import { UntypedFormControl } from '@angular/forms';
import { PaginationControlsComponent } from 'ngx-pagination';
import { debounceTime } from 'rxjs/operators';


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
    ) { }

    ngOnInit(): void {
        this._providersService.getAllProviders()
            .subscribe((res: any[]) => {
                this.listProviders = [...res];
                this.filteredProviders = res;
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
        if (val) {
            val = val.toLowerCase();
        } else {
            return this.filteredProviders = [...this.providers];
        }

        const columns = Object.keys(this.providers[0]);
        if (!columns.length) {
            return;
        }

        const rows = this.providers.filter(function (d) {
            for (let i = 0; i <= columns.length; i++) {
                const column = columns[i];
                if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                    return true;
                }
            }
        });
        this.filteredProviders = rows;
    }

    sortListProvidersById() {
        this.listProviders.sort((a, b) => a.id_provider - b.id_provider);
    }

    getProviders() {
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
