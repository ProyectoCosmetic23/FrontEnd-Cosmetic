import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl } from '@angular/forms';
import { DefectiveProductsService } from 'src/app/shared/services/defective-product.service';
import { debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-defective-product-list',
    templateUrl: './defective-product-list-component.html',
    styleUrls: ['./defective-product-list-component.scss']
})
export class DefectiveProductListComponent implements OnInit {
    loading: boolean;
    searchControl: UntypedFormControl = new UntypedFormControl();
    listDefectiveProducts: any[];
    filteredDefectiveProducts: any[];
    pageSize: number = 10;
    currentPage: number = 1;
    modalAbierto = false;


    constructor(
        private _defectiveProductService: DefectiveProductsService,
        private modalService: NgbModal,
        private toastr: ToastrService,) { }

    ngOnInit(): void {
        this.getDefectiveProducts();
        this.searchControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filterData(value);
            });
    }



    getDefectiveProducts() {
        this._defectiveProductService.getAllDefectiveProducts().subscribe(data => {
            this.listDefectiveProducts = data.sort((a, b) => a.id_defective_product - b.id_defective_product);
            this.filteredDefectiveProducts = [...this.listDefectiveProducts];
        }, error => {
            console.log(error);
        });
    }

    filterData(value: string) {
        if (value) {
            value = value.toLowerCase();
        } else {
            this.filteredDefectiveProducts = [...this.listDefectiveProducts];
            return;
        }

        this.filteredDefectiveProducts = this.listDefectiveProducts.filter(defective_product => {
            const motivoMatch = defective_product.return_reason.toLowerCase().includes(value);
            const id_productMatch = defective_product.id_product.toLowerCase().includes(value);
            

            return motivoMatch || id_productMatch;
        });

        this.currentPage = 1;
    }



}