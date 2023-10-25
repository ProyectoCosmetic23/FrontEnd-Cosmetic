import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { Utils } from 'src/app/shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-categoria-detail',
    templateUrl: './categoria-detail.component.html',
    styleUrls: ['./categoria-detail.component.scss']
})
export class CategoriaDetailComponent implements OnInit {
    viewMode: 'edit' | 'print' = 'edit';
    id: string;
    isNew: boolean;
    categoria: any = {};
    categoriaForm: UntypedFormGroup;
    categoriaFormSub: Subscription;
    subTotal: number;
    saving: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: UntypedFormBuilder,
        private dl: DataLayerService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isNew = !this.id;
        this.buildCategoriaForm(this.categoria);
        if (this.id) {
            this.viewMode = 'print';
            this.dl.getCategoria(this.id)
                .subscribe(res => {
                    this.categoria = res;
                    this.buildCategoriaForm(this.categoria);
                    this.subTotal = this.calculateSubtotal(this.categoriaForm.value);
                })
        }
    }

    buildCategoriaForm(i: any = {}) {
        this.categoriaForm = this.fb.group({
            id: [i.id],
            orderNumber: [i.orderNumber],
            orderStatus: [i.orderStatus],
            currency: [i.currency],
            vat: [i.vat],
            orderDate: [i.orderDate ? Utils.dateToNgbDate(i.orderDate) : {}],
            billFrom: this.fb.group({
                name: [i.billFrom ? i.billFrom.name : ''],
                address: [i.billFrom ? i.billFrom.address : '']
            }),
            billTo: this.fb.group({
                name: [i.billTo ? i.billTo.name : ''],
                address: [i.billTo ? i.billTo.address : '']
            }),
            items: this.fb.array((() => {
                if (!i.items) {
                    return [];
                }
                return i.items.map((item) => this.createItem(item));
            })())
        });
        // LINSTEN FOR VALUE CHANGES AND CALCULATE TOTAL
        if (this.categoriaFormSub) {
            this.categoriaFormSub.unsubscribe();
        }
        this.categoriaFormSub = this.categoriaForm.valueChanges
            .subscribe(formValue => {
                this.subTotal = this.calculateSubtotal(formValue);
            });
    }

    createItem(item: any = {}) {
        return this.fb.group({
            name: [item.name],
            unit: [item.unit],
            unitPrice: [item.unitPrice]
        });
    }
    addItem() {
        const control = <UntypedFormArray>this.categoriaForm.controls['items'];
        control.push(this.createItem());
    }
    removeItem(i) {
        const control = <UntypedFormArray>this.categoriaForm.controls['items'];
        control.removeAt(i);
    }

    saveCategoria() {
        this.saving = true;
        this.categoria = this.categoriaForm.value;
        this.categoria.orderDate = Utils.ngbDateToDate(this.categoriaForm.value.orderDate);
        this.dl.saveCategoria(this.categoriaForm.value)
            .subscribe((savedCategoria: any) => {
                this.viewMode = 'print';
                this.saving = false;
                this.toastr.success('Categoria Saved!', 'Success!', { timeOut: 3000 });
                if(this.isNew) {
                    this.router.navigateByUrl('/categoria/edit/'+savedCategoria.id);
                }
            });
    }



    calculateSubtotal(categoria) {
        let total = 0;
        categoria.items.forEach(i => {
            total += (i.unit * i.unitPrice);
        });
        return total;
    }

    print() {
        if (window) {
            window.print();
        }
    }

}
