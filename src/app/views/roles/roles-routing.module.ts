import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesDetailComponent } from './roles-detail/roles-detail.component';

const routes: Routes = [
    {
        path: '',
        component: RolesListComponent
    },
    {
        path: 'new',
        component: RolesDetailComponent
    },
    {
        path: 'edit/:id_role',
        component: RolesDetailComponent
    },
    {
        path: 'detail/:id_role',
        component: RolesDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolesRoutingModule { }