import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        canActivate:[AuthGuard],
        component: ProductListComponent
    },
    
    {
        path: 'new',
        canActivate:[AuthGuard],
        component: ProductDetailComponent
    },
    {
        path: 'edit/:id_product',
        canActivate:[AuthGuard],
        component: ProductDetailComponent
    },
    {
        path: 'print/:id_product',
        canActivate:[AuthGuard],
        component: ProductDetailComponent
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
