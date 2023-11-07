import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';

const routes: Routes = [
    {
        path: '',
        component: OrdersListComponent
    },
    {
        path: 'new',
        component: OrdersDetailComponent
    },
    {
        path: 'detail/:id_order',
        component: OrdersDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }