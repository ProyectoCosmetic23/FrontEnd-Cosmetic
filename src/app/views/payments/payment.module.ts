import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { PaymentsDetailComponent } from './payment-detail/payment-detail.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentRoutingModule } from './payment-routing.module';

// Importa NgxPaginationModule
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgbModule,
    PaymentRoutingModule,
    NgxPaginationModule, // Agrega esta línea
  ],
  declarations: [PaymentsDetailComponent, PaymentListComponent]
})
export class PaymentModule { }
