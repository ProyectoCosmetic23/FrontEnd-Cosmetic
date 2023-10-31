import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderDetailComponent } from './provider-detail/provider-detail.component';
import { ProviderListComponent } from './provider-list/provider-list.component';

const routes: Routes = [
    {
        path: '',
        component: ProviderListComponent
    },
    {
        path: 'new',
        component: ProviderDetailComponent
    },
    {
        path: 'edit/:id_provider',
        component: ProviderDetailComponent
    },
    {
        path: 'detalle/:id_provider',
        component: ProviderDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
