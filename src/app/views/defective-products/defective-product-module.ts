import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DefectiveProductDetailComponent } from './defective-product-detail/defective-product-detail.component';
import { DefectiveProductListComponent } from './defective-product-list/defective-product-list-component';
import { DefectiveProductRoutingModule } from './defective-product-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        SharedComponentsModule,
        NgbModule,
        DefectiveProductRoutingModule
    ],
    declarations: [DefectiveProductDetailComponent,  DefectiveProductListComponent]
})
export class DefectiveProductModule { }