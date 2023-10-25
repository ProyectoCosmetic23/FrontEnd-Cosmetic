import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasListComponent } from './categorias-list/categorias-list.component';
import { CategoriaDetailComponent } from './categoria-detail/categoria-detail.component';

const routes: Routes = [
    {
        path: '',
        component: CategoriasListComponent
    },
    {
        path: 'new',
        component: CategoriaDetailComponent
    },
    {
        path: 'edit/:id',
        component: CategoriaDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
