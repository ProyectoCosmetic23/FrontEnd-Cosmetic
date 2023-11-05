import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Importa solo ReactiveFormsModule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import {PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import {PurchaseListComponent } from './purchase-list/purchase-list.component';
import {PurchaseRoutingModule } from './purchase-routing.module';


@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule, // Solo importa ReactiveFormsModule
    SharedComponentsModule,
    NgbModule,
   PurchaseRoutingModule,
    
  ],
  declarations: [PurchaseDetailComponent, PurchaseListComponent]
})
export class PurchaseModule { }
