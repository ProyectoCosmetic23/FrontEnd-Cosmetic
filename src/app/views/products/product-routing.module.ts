import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    
    {
        path: 'new',
        component: ProductDetailComponent
    },
    {
        path: 'edit/:id_product',
        component: ProductDetailComponent
    },
    {
        path: 'print/:id_product',
        component: ProductDetailComponent
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
