import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterTableComponent } from './filter-table/filter-table.component';


const routes: Routes = [

  {
    path: 'filter',
    component: FilterTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTablesRoutingModule { }
