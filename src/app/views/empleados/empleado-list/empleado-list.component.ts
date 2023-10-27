import { Component, OnInit } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from 'src/app/shared/services/empleado.service';

@Component({
    selector: 'app-empleado-list',
    templateUrl: './empleado-list.component.html',
    styleUrls: ['./empleado-list.component.scss']
    })
    export class EmpleadoListComponent implements OnInit {
    listEmpleados: any[];

    constructor(private _empleadoService: EmpleadosService) {}

    ngOnInit(): void {
    this.obtenerEmpleados();
    }

    obtenerEmpleados() {
    this._empleadoService.getAllEmployes().subscribe(data => {
        this.listEmpleados = data;
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
