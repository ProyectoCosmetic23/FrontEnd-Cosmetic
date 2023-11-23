import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

const routes: Routes = [
    {
        path: '',
        canActivate:[AuthGuard],
        component: EmployeeListComponent
    },
    {
        path: 'new',
        canActivate:[AuthGuard],
        component: EmployeeDetailComponent
    },
    {
        path: 'edit/:id_employee',
        canActivate:[AuthGuard],
        component: EmployeeDetailComponent
    },
    {
        path: 'print/:id_employee',
        canActivate:[AuthGuard],
        component: EmployeeDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
