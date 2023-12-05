import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  imports: [
    CommonModule,
    SharedComponentsModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    NgxDatatableModule,
    
    NgbModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    
  ],
  declarations: [DashboadDefaultComponent]
})
export class DashboardModule { }
