import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: OrdersListComponent
    },
    {
        path: 'new',
        canActivate: [AuthGuard],

        component: OrdersDetailComponent
    },
    {
        path: 'detail/:id_order',
        canActivate: [AuthGuard],
        component: OrdersDetailComponent
    },
    {
        path: 'returns/:id_order',
        component: ReturnsDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }