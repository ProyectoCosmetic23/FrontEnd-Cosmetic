import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComissionsDetailComponent } from './comission-detail/comission-detail.component';
import { ComissionListComponent } from './comission-list/comission-list.component';


const routes: Routes = [
    {
        path: '',
        component: ComissionListComponent
    },
    {
        path: 'registrar', 
        component: ComissionsDetailComponent
    },
    {
        path: 'detalle/:id_commission',
        component: ComissionsDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComissionRoutingModule { }
