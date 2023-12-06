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
    motivo: string
    loading: boolean;
    listProviders: any[] = []
    originalListProviders: any[] = [];
    reasonAnulate: any = "";
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
                console.log(data)
                this.listProviders = data;
                this.filteredProviders = this.listProviders;
                this.sortListProvidersById();

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

    }

    changeProviderStateDescription(state_provider: boolean) {
        return state_provider ? 'Activo' : 'Inactivo';
    }

    @ViewChild('changeStateModal', { static: true }) changeStateModal: any;

    openModal(idProvider: number) {
        console.log(idProvider)
        this._providersService.getProviderById(idProvider).subscribe()
        if (!this.openedModal) {
            this.openedModal = true;
            this.modalService
                .open(this.changeStateModal, { centered: true })
                .result.then(
                    (result) => {
                        if (result === "Yes") {
                            console.log("razon", this.reasonAnulate)
                            this._providersService.updateProviderStatus(idProvider, this.reasonAnulate).subscribe(

                                (data) => {
                                    this.openedModal = false;
                                    this.loading = false;
                                    this.toastr.success(
                                        "Cambio de estado realizado con éxito.",
                                        "Proceso Completado",
                                        { progressBar: true, timeOut: 2000 }
                                    );
                                    console.log(data);
                                    this.openedModal = false;
                                    this.getProviders()

                                },
                                (error) => {
                                    this.loading = false;
                                    this.toastr.error(
                                        "Fallo al realizar el cambio de estado.",
                                        "Error",
                                        { progressBar: true, timeOut: 2000 }
                                    );
                                    console.error("Error al cambiar de estado:", error);
                                    this.openedModal = false;
                                }
                            );
                        } else if (result === "Cancel") {
                            this.openedModal = false;
                            this.getProviders();
                      
                        }
                    },
                    (reason) => {
                        this.getProviders();
                        this.openedModal = false;
                        this.updateSwitchState(idProvider)
                    }
                );
        }
    };
    updateSwitchState(idProvider: number) {
        const provider = this.listProviders.find((provider) => provider.id_provider === idProvider);
        if (provider) {
            provider.state_provider = provider.state_provider === "Activo" ? "Inactivo" : "Activo";
        }
      }
}