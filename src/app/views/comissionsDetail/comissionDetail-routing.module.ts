import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ComissionsDetailDetailComponent } from './comissionDetail-detail/comissionDetail-detail.component';
// import { ComissionDetailListComponent } from './comissionDetail-list/comissionDetail-list.component';


const routes: Routes = [
    // {
    //     path: '',
    //     component: ComissionDetailListComponent
    // },
    {
        path: 'registrar', 
        component: ComissionsDetailDetailComponent
    },
    {
        path: 'detalle/:id_commission_detail',
        component: ComissionsDetailDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComissionDetailRoutingModule { }
