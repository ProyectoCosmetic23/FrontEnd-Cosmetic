import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { ProvidersDetailComponent } from './provider-detail/provider-detail.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderRoutingModule } from './provider-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgbModule,
    ProviderRoutingModule
  ],
  declarations: [ProvidersDetailComponent, ProviderListComponent]
})
export class ProviderModule { }
