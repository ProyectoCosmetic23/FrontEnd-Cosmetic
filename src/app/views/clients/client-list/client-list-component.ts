import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/shared/services/client.service';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';



@Component({
    selector: 'app-client-list',
    templateUrl: './client-list-component.html',
    styleUrls: ['./client-list-component.scss']
})
export class ClientListComponent implements OnInit {
    loading: boolean;
    searchControl: UntypedFormControl = new UntypedFormControl();
    listClients: any[];
    filteredClients: any[];
   
    modalAbierto = false;
    currentPage = 1; // Propiedad para rastrear la página actual
    itemsPerPage = 6; // El número de filas por página
    countLabel: number;
    reasonForm: FormGroup;
   
    constructor(
        private _clientService: ClientsService,
        private modalService: NgbModal,
        private toastr: ToastrService,) { }
        private formBuilder: FormBuilder

    ngOnInit(): void {
        
        this.getClients();
        this.reasoniniForm();
        
    }

    getClients() {
        this._clientService.getAllClients().subscribe(data => {
            this.listClients = data.sort((a, b) => a.id_client - b.id_client);
            this.filteredClients = [...this.listClients];
        }, error => {
            console.log(error);
        }); 
    }

    @ViewChild(DatatableComponent)
    table: DatatableComponent;
    //  actualizar el valor visual de count según tus necesidades
    actualizarCountLabel() {
        this.countLabel = this.filteredClients.length;
    }

    sortListClientsById() {
        this.filteredClients.sort((a, b) => {
            if (a.id_client > b.id_client) {
                return -1;
            }
            if (a.id_client > b.id_client) {
                return 1;
            }
            return 0;
        });
    }

    onPageChange(event: any) {
        console.log('onPageChange event:', event);
        this.currentPage = event.offset + 1;
       
    }

    searchClient($event){
        
        const value = ($event.target as HTMLInputElement).value;
        if(value !==null && value !== undefined && value !== '')
        {
            this.filteredClients = this.listClients.filter(c => c.name_client.toLowerCase().indexOf(value.toLowerCase()) !== -1
            || this.changeClientStateDescription(c.state_client).toLowerCase().indexOf(value.toLowerCase()) !== -1)
        }else{
            this.filteredClients = this.listClients;
        }
    }

    changeClientStateDescription(state_client:boolean){
        return state_client ? 'Activo':'Inactivo';}
        
        private reasoniniForm(): void {
            this.reasonForm = this.formBuilder.group({
              reason_anulate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(220)]],
        
            });
        
          }

    @ViewChild('deleteConfirmModal', { static: true }) deleteConfirmModal: any;

    openModal(idClient: number) {
        if (!this.modalAbierto) {
            this.modalAbierto = true;
            this.modalService.open(this.deleteConfirmModal, { centered: true }).result.then(
                (result) => {
                    if (result === 'Ok') {
                        this._clientService.clientChangeStatus(idClient).subscribe(
                            (data) => {
                                this.loading = false;
                                // this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', { progressBar: true, timeOut: 2000 });
                                // console.log(data);

                                setTimeout(() => {
                                    location.reload();
                                });
                            },
                            (error) => {
                                this.loading = false;
                                this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', { progressBar: true, timeOut: 2000 });
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
    }

}