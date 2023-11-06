import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { ComissionsDetailDetailComponent } from './comissionDetail-detail/comissionDetail-detail.component';
// import { ProviderListComponent } from './comissionDetail-list/comissionDetail-list.component';
import { ComissionDetailRoutingModule } from './comissionDetail-routing.module';
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
    ComissionDetailRoutingModule,
    NgxPaginationModule, // Agrega esta línea
  ],
  declarations: [ComissionsDetailDetailComponent]
})
export class ComissionDetailModule { }
