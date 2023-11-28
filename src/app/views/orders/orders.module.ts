import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SharedComponentsModule } from "src/app/shared/components/shared-components.module";
import { OrdersDetailComponent } from "./orders-detail/orders-detail.component";
import { TabsModule } from "ngx-bootstrap/tabs";

@NgModule({
  imports: [
    [TabsModule.forRoot()],
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgbModule,
    OrdersRoutingModule,
  ],
  declarations: [OrdersListComponent, OrdersDetailComponent],
})
export class OrdersModule {}
