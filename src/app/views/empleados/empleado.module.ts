import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { EmpleadoDetailComponent } from './empleado-detail/empleado-detail.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoRoutingModule } from './empleado-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgbModule,
    EmpleadoRoutingModule
  ],
  declarations: [EmpleadoDetailComponent, EmpleadoListComponent]
})
export class EmpleadoModule { }
