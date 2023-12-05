import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PurchasesService } from 'src/app/shared/services/purchase.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/shared/services/provider.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import * as flatted from 'flatted';

// ...

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  listPurchases: any[] = [];
  filteredPurchases: any[] = [];
  list: any[] = [];
  purchases: any[] = [];
  offset: number = 0;
  itemsPerPage = 6;
  currentPage = 1;
  modalAbierto = false;
  loading: boolean;
  providers: any = {};
  countLabel: number;
  reasonForm: FormGroup;
  reasonAnulate = {}


  constructor(
    private _purchaseService: PurchasesService,
    private providersService: ProvidersService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.reasoniniForm();
    this.getPurchases();
    this.providersService.getAllProviders().subscribe((providers: any[]) => {
      providers.forEach(provider => {
        this.providers[provider.id_provider] = provider.name_provider;
      });
    });


  }


  getPurchases() {
    this._purchaseService.getAllPurchase().subscribe(
        (data) => {
            this.listPurchases = data;
            this.filteredPurchases =this.listPurchases;
            this.sortListPurchases();
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
    this.countLabel = this.filteredPurchases.length;
}

sortListPurchases() {
    this.filteredPurchases.sort((a, b) => {
        if (a.id_purchase > b.id_purchase) {
            return -1;
        }
        if (a.id_purchase > b.id_purchase) {
            return 1;
        }
        return 0;
    });
}

searchPurchase($event){
    
    const value = ($event.target as HTMLInputElement).value;
    if(value !==null && value !== undefined && value !== '')
    {
        this.filteredPurchases = this.listPurchases.filter(c => c.provider.name_provider.toLowerCase().indexOf(value.toLowerCase()) !== -1
        || this.changePuchaseStateDescription(c.state_purchase).toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
        c.invoice_number.indexOf(value.toLowerCase()) !== -1)
    }else{
        this.filteredPurchases = this.listPurchases;
    }
}

changePuchaseStateDescription(state_purchase:boolean){
    return state_purchase ? 'Activo':'Anulada';}


  private reasoniniForm(): void {
    this.reasonForm = this.formBuilder.group({
      reason_anulate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(220)]],

    });

  }



  @ViewChild('changeStatusModal', { static: true }) changeStatusModal: any;

  modalStatus(idPurchase: number, $event?: any): void {
    this.modalService.open(this.changeStatusModal, { centered: true }).result.then(
      (result) => {


        if (result === 'Ok') {
          const reasonAnulate = this.reasonForm.get('reason_anulate').value;
          this._purchaseService.PurchaseChangeStatus(idPurchase, reasonAnulate).subscribe(

            (data) => {
              this.loading = false;
              this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', {
                progressBar: true,
                timeOut: 2000
              });
              this.getPurchases();
              this.modalAbierto = false;
              this.reasonForm.get('reason_anulate').setValue(null);
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


  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

}