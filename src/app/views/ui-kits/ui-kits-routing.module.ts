import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ButtonsComponent } from './buttons/buttons.component';


import { ModalsComponent } from './modals/modals.component';
import { AlertsComponent } from './alerts/alerts.component';

import { LoadersComponent } from './loaders/loaders.component';



const routes: Routes = [
  {
    path: 'alerts',
    component: AlertsComponent
  },

  {
    path: 'buttons',
    component: ButtonsComponent
  },

  {
    path: 'modals',
    component: ModalsComponent
  },
  {
    path: 'loaders',
    component: LoadersComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiKitsRoutingModule { }
