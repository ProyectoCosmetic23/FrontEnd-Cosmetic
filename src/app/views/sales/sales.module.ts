import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrdersRoutingModule } from "./sales-routing.module";
import { SalesListComponent } from "./sales-list/sales-list.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SharedComponentsModule } from "src/app/shared/components/shared-components.module";
import { SalesDetailComponent } from "./sales-detail/sales-detail.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgbModule,
    OrdersRoutingModule,
  ],
  declarations: [SalesListComponent, SalesDetailComponent],
})
export class SalesModule {}
