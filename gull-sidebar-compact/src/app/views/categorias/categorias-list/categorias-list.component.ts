import { Component, OnInit } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-categorias-list',
    templateUrl: './categorias-list.component.html',
    styleUrls: ['./categorias-list.component.scss']
})
export class CategoriasListComponent implements OnInit {
    categoriass: any[]

    constructor(
        private dl: DataLayerService,
        private modalService: NgbModal,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.loadCategoriass()
    }
    loadCategoriass() {
        this.dl.getCategoriass()
            .subscribe(res => {
                this.categoriass = res;
            })
    }

    deleteCategorias(id, modal) {
        this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
            .result.then((result) => {
                this.dl.deleteCategorias(id)
                    .subscribe(res => {
                        this.toastr.success('Categorias Deleted!', 'Success!', { timeOut: 3000 });
                        this.loadCategoriass();
                    })
            }, (reason) => {
            });
    }

}
