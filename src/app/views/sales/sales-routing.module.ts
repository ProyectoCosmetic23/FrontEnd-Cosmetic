import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { SalesDetailComponent } from './sales-detail/sales-detail.component';
import { SalesListComponent } from './sales-list/sales-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: SalesListComponent
    },
    {
        path: 'detail/:id_order',
        canActivate: [AuthGuard],
        component: SalesDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule { }