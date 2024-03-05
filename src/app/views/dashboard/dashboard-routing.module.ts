import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/auth.guard';
import { DashboadDefaultComponent } from './dashboad-default/dashboad-default.component';


const routes: Routes = [
  {
    path: 'v1',
    canActivate: [AuthGuard],
    component: DashboadDefaultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
