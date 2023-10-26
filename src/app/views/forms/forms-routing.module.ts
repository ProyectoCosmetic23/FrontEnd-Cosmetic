import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { AppImgCropperComponent } from './img-cropper/img-cropper.component';

import { FormLayoutsComponent } from './form-layouts/form-layouts.component';

const routes: Routes = [
  {
    path: 'basic',
    component: BasicFormComponent
  },
  {
    path: 'layouts',
    component: FormLayoutsComponent
  },

  {
    path: 'img-cropper',
    component: AppImgCropperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
