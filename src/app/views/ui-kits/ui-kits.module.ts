import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { UiKitsRoutingModule } from './ui-kits-routing.module';
import { ButtonsComponent } from './buttons/buttons.component';


import { FormsModule } from '@angular/forms';
import { ModalsComponent } from './modals/modals.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ToastrModule } from 'ngx-toastr';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { LoadersComponent } from './loaders/loaders.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SharedDirectivesModule } from 'src/app/shared/directives/shared-directives.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule,
    NgbModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    SharedComponentsModule,
    SharedDirectivesModule,
    UiKitsRoutingModule
  ],
  declarations: [
      ButtonsComponent, 
 
      ModalsComponent, 
      AlertsComponent, 
 
      LoadersComponent, 

    ]
})
export class UiKitsModule { }
