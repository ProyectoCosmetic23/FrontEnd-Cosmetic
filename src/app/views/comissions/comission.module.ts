import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { ComissionsDetailComponent } from './comission-detail/comission-detail.component';
import { ComissionListComponent } from './comission-list/comission-list.component';
import { ComissionRoutingModule } from './comission-routing.module';

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
    ComissionRoutingModule,
    NgxPaginationModule, // Agrega esta línea
  ],
  declarations: [ComissionsDetailComponent, ComissionListComponent]
})
export class ComissionModule { }
