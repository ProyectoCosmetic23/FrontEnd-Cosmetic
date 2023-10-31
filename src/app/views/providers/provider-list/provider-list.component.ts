import { Component, OnInit } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/shared/services/provider.service';


@Component({
    selector: 'app-provider-list',
    templateUrl: './provider-list.component.html',
    styleUrls: ['./provider-list.component.scss']
    })
    export class ProviderListComponent implements OnInit {
    listProviders: any[];

    constructor(private _providerService: ProvidersService) {}

    ngOnInit(): void {
    this.getProviders();
    }

    getProviders() {
    this._providerService.getAllProviders().subscribe(data => {
        this.listProviders = data;
    }, error => {
        console.log(error);
        })
        
    }
    /*
    loadInvoices() {
        this.dl.getInvoices()
            .subscribe(res => {
                this.invoices = res;
            })
    }

    deleteInvoice(id, modal) {
        this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
            .result.then((result) => {
                this.dl.deleteInvoice(id)
                    .subscribe(res => {
                        this.toastr.success('Invoice Deleted!', 'Success!', { timeOut: 3000 });
                        this.loadInvoices();
                    })
            }, (reason) => {
            });
    }*/

}
