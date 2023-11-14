import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list-component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        SharedComponentsModule,
        NgbModule,
        ClientRoutingModule
    ],
    declarations: [ClientDetailComponent,  ClientListComponent]
})
export class ClientModule { }