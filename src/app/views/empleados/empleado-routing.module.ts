import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoDetailComponent } from './empleado-detail/empleado-detail.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';

const routes: Routes = [
    {
        path: '',
        component: EmpleadoListComponent
    },
    {
        path: 'new',
        component: EmpleadoDetailComponent
    },
    {
        path: 'edit/:id',
        component: EmpleadoDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
