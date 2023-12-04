import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnsDetailComponent } from './returns-detail/returns-detail.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

const routes: Routes = [
    
   
    {
        path: 'detaild/:id_order',
        canActivate: [AuthGuard],
        component: ReturnsDetailComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReturnsRoutingModule { }