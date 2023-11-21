

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule ,
        FormsModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        SharedComponentsModule,
        NgbModule,
        UserRoutingModule
    ],
    declarations: [UserDetailComponent,  UserListComponent]
})
export class UserModule { }