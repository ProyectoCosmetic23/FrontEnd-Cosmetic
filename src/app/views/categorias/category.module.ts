import { CommonModule,DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Importa solo ReactiveFormsModule
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryRoutingModule } from './category-routing.module';



@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    ReactiveFormsModule, // Solo importa ReactiveFormsModule
    SharedComponentsModule,
    NgbModule,
    CategoryRoutingModule

    
  ],
  declarations: [CategoryDetailComponent, CategoryListComponent],
  providers: [DatePipe]
})
export class CategoryModule { }
