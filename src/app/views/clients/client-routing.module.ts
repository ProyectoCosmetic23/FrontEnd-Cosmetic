import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list-component';

const routes: Routes = [
    {
        path: '',
        component: ClientListComponent
    },
    {
        path: 'new',
        component: ClientDetailComponent
    },
    {
        path: 'edit/:id_client',
        component: ClientDetailComponent
    },
    {
        path: 'print/:id_client',
        component: ClientDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }