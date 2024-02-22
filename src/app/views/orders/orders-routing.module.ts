import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ReturnsDetailComponent } from '../returns/returns-detail/returns-detail.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

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
        canActivate: [AuthGuard],
        component: ReturnsDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }