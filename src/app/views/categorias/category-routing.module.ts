import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
    {
        path: '',
        component: CategoryListComponent
    },
    {
        path: 'new',
        component: CategoryDetailComponent
    },
    {
        path: 'edit/:id_category',
        component: CategoryDetailComponent
    },
    {
        path: 'detail/:id_category',
        component: CategoryDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
