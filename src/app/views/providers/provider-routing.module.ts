import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersDetailComponent } from './provider-detail/provider-detail.component';
import { ProviderListComponent } from './provider-list/provider-list.component';


const routes: Routes = [
    {
        path: '',
        component: ProviderListComponent
    },
    {
        path: 'registrar', 
        component: ProvidersDetailComponent
    },
    {
        path: 'editar/:id_provider',
        component: ProvidersDetailComponent
    },
    {
        path: 'detalle/:id_provider',
        component: ProvidersDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
