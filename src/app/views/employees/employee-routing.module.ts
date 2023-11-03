import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
    {
        path: '',
        component: EmployeeListComponent
    },
    {
        path: 'new',
        component: EmployeeDetailComponent
    },
    {
        path: 'edit/:id_employee',
        component: EmployeeDetailComponent
    },
    {
        path: 'detail/:id_employee',
        component: EmployeeDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
