import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DefectiveProductsService } from 'src/app/shared/services/defective-product.service';
import { DefectiveProductFormModel } from '../models/defective-product.model';


@Component({
    selector: 'app-defective-product-detail',
    templateUrl: './defective-product-detail.component.html',
    styleUrls: ['./defective-product-detail.component.scss']
})
export class DefectiveProductDetailComponent implements OnInit {

    defectiveProductForm: FormGroup;
    defectiveProductFormSub: Subscription;
    loading: boolean = false;
    formBasic: FormGroup;
    viewMode: 'new' | 'edit' | 'print' = 'new';
    id: string;
    isNew: boolean;
    invoice: any = {};
    invoiceForm: UntypedFormGroup;
    invoiceFormSub: Subscription;
    subTotal: number;
    saving: boolean;
    defectiveProductData: DefectiveProductFormModel;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private fb: UntypedFormBuilder,
        private toastr: ToastrService,
        private defectiveProductsService: DefectiveProductsService
    ) {

    }


    ngOnInit() {
        this.id = this.route.snapshot.params['id_defective_product'];
        this.isNew = !this.id;
        this.setViewMode();
        this.inicializateForm(Number(this.id));
     
        
    }

    private inicializateForm(id: number): void {
        this.defectiveProductForm = this.formBuilder.group({
            id_defective_product:[],
            id_product: [],
            
            return_reason:[],
            return_date:[],
            return_quantity:[],
            return_value:[],


        });

        if (this.viewMode == 'print') {
            this.defectiveProductForm.disable();
        }


    }

    private getDefectiveProductByID(id: number): void {
        this.loading = true;
        this.defectiveProductsService.getDefectiveProductsById(id).subscribe({
            next: (response: any) => {
                this.defectiveProductData = new DefectiveProductFormModel(response);
                this.setDataDefectiveProduct();
            },
            error: (err) => {
                console.log('err', err);
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
            },
        });
    }



        private setDataDefectiveProduct(): void {
        if (this.defectiveProductData) {

            this.id_defective_product.setValue(this.defectiveProductData.id_defective_product),
            this.id_product.setValue(this.defectiveProductData.id_product),
            this.return_reason.setValue(this.defectiveProductData.return_reason),
            this.return_quantity.setValue(this.defectiveProductData.return_quantity),
            this.return_date.setValue(this.defectiveProductData.return_date),
            this.return_value.setValue(this.defectiveProductData.return_value)

            this.defectiveProductForm.setValue(this.defectiveProductData)
        }
    }

  





  

    cancel() {
        this.router.navigateByUrl('/defective-products');
    }

 





    setViewMode() {
        const currentRoute = this.router.url;
        if (currentRoute.includes('/new')) {
            this.viewMode = 'new';
        } else if (currentRoute.includes('/edit/')) {
            this.viewMode = 'edit';
        } else if (currentRoute.includes('/print/')) {
            this.viewMode = 'print';
        }
    }



    print() {
        if (window) {
            window.print();
        }
    }
    
  
    submitDefectiveProduct() {
        if (!this.loading) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.toastr.success('Cliente registrado con éxito.', 'Éxito', { progressBar: true, timeOut: 3000 });
                setTimeout(() => {
                    this.router.navigateByUrl('/defective-products');
                }, 3000);
            }, 3000);
        }
    }


    get id_product() {
        return this.defectiveProductForm.get('id_product');
    }
    
   
    get return_reason() {
        return this.defectiveProductForm.get('return_reason');
    }

    get return_date() {
        return this.defectiveProductForm.get('return_date');
    }
    get return_quantity() {
        return this.defectiveProductForm.get('return_quantity');
    }
    get return_value() {
        return this.defectiveProductForm.get('return_value');
    }
    get id_defective_product () {
        return this.defectiveProductForm.get('id_defective_product');
    }

    

   
}