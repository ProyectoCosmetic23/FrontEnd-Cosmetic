import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import { PurchasesService } from 'src/app/shared/services/purchase.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/shared/services/provider.service';

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
  purchases: any[] = [];
  offset: number = 0;
  pageSize: number = 6;
  currentPage: number = 1;
  modalAbierto = false;
  loading: boolean;
  providers:  any = {};


  constructor(
    private _purchaseService: PurchasesService,
    private providersService: ProvidersService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void{
    this._purchaseService.getAllPurchase().subscribe((res: any[]) => {
      this.listPurchases =[...res];
      this.providersService.getAllProviders().subscribe((providers: any[]) => {
        // Mapear los datos de provideres en un objeto para búsquedas rápidas
        providers.forEach(provider => {
            this.providers[provider.id_provider] = provider.name_provider;
        });
    });
      this.filteredPurchases = res;
    });

    this.searchControl.valueChanges.pipe(debounceTime(200)).subscribe(value => {
      this.filterData(value);
    });
  }


  filterData(val) {
    if (val) {
        val = val.toLowerCase();
    } else {
        return this.filteredPurchases = [...this.purchases];
    }

    const columns = Object.keys(this.purchases[0]);
    if (!columns.length) {
        return;
    }

    const rows = this.purchases.filter(function (d) {
        for (let i = 0; i <= columns.length; i++) {
            const column = columns[i];
            if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                return true;
            }
        }
    });
    this.filteredPurchases = rows;
}





  onPageChange(event: any) {
    console.log('onPageChange: ', event);
    this.currentPage = event.offset +1;
    this.loadData(); // Llama a loadData al cambiar de página
  }
  
  loadData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;

    const totalPages = Math.ceil(this.listPurchases.length / this.pageSize);

    if (this.currentPage === totalPages) {
        const remainingRows = this.listPurchases.length % this.pageSize;
        if (remainingRows > 0) {
            endIndex = startIndex + remainingRows;
        }
    }

    // Ajusta el índice para que sea el próximo número divisible por 6 
    const rowsToAdd = 6 - (endIndex % 6);
    endIndex += rowsToAdd;

    this.filteredPurchases = this.listPurchases.slice(startIndex, endIndex);

    console.log('load data charged');
  }

  sortListCategoryById() {
    this.listPurchases.sort((a, b) => a.id_purchase - b.id_purchase);
}


  getPurchases() {
    this._purchaseService.getAllPurchase().subscribe(
        (data) => {
            this.listPurchases = data;
            this.sortListCategoryById();
        },
        (error) => {
            console.error('Error al obtener categorías:', error);
        }
    );
  }
  

  // @ViewChild('changeStatusModal', { static: true }) changeStatusModal: any;

  // modalStatus(IdCategory: number, $event?: any): void {
 
  //         this.modalService.open(this.changeStatusModal, { centered: true }).result.then(
  //             (result) => {
  //                 if (result === 'Ok') {
  //                     const isChecked = ($event.target as HTMLInputElement).checked;
  //                     this._purchaseService.PurchaseChangeStatus(IdCategory,isChecked).subscribe(
  //                         (data) => {
  //                             this.loading = false;
  //                             this.toastr.success('Cambio de estado realizado con éxito.', 'Proceso Completado', {
  //                                 progressBar: true,
  //                                 timeOut: 2000
  //                             });
  //                             this.getCategories();
  //                             this.modalAbierto = false;

                             
  //                         },
  //                         (error) => {
  //                             this.loading = false;
  //                             this.toastr.error('Fallo al realizar el cambio de estado.', 'Error', {
  //                                 progressBar: true,
  //                                 timeOut: 2000
  //                             });
  //                             console.error('Error al cambiar de estado:', error);
  //                         }
  //                     );
  //                 } else if (result === 'Cancel') {
  //                     this.modalAbierto = false;
                   
  //                 }
  //             }
  //         );
  // }


  

}


  


