import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefectiveProductListComponent } from './defective-product-list/defective-product-list-component';
import {DefectiveProductDetailComponent } from './defective-product-detail/defective-product-detail.component';

const routes: Routes = [
    {
        path: '',
        component: DefectiveProductListComponent
    },
    
    
    {
        path: 'print/:id_defective_product',
        component: DefectiveProductDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DefectiveProductRoutingModule { }