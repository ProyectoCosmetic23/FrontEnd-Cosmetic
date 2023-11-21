import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';

const routes: Routes = [
    {
        path: '',
        component: PurchaseListComponent
    },
    {
        path: 'new',
        component: PurchaseDetailComponent
    },
    {
        path: 'detail/:id_purchase',
        component: PurchaseDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
