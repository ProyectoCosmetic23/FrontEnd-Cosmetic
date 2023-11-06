import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentListComponent } from './payment-list/payment-list.component';


const routes: Routes = [
    {
        path: '',
        component: PaymentListComponent
    },
    {
        path: 'registrar', 
        component: PaymentsDetailComponent
    },
    {
        path: 'detalle/:id_payment',
        component: PaymentsDetailComponent
    },
    {
        path: 'detalle/clientes/:id_client',
        component: PaymentsDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
