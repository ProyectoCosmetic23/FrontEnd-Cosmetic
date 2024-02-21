import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { ReturnsDetailComponent } from './returns-detail/returns-detail.component';

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