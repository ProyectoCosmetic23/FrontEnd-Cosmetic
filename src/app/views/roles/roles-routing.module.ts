import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { RolesDetailComponent } from './roles-detail/roles-detail.component';
import { RolesListComponent } from './roles-list/roles-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: RolesListComponent
    },
    {
        path: 'new',
        canActivate: [AuthGuard],
        component: RolesDetailComponent
    },
    {
        path: 'edit/:id_role',
        canActivate: [AuthGuard],
        component: RolesDetailComponent
    },
    {
        path: 'detail/:id_role',
        canActivate: [AuthGuard],
        component: RolesDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolesRoutingModule { }