import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BasicFormComponent } from './basic-form/basic-form.component';
import { AppImgCropperComponent } from './img-cropper/img-cropper.component';
import { ImageCropperModule } from 'ngx-img-cropper';

import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';

import { TextMaskModule } from 'angular2-text-mask';

import { FormLayoutsComponent } from './form-layouts/form-layouts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgbModule,
    ImageCropperModule,
    TextMaskModule,

    FormsRoutingModule
  ],
  declarations: [BasicFormComponent, AppImgCropperComponent,  FormLayoutsComponent]
})
export class AppFormsModule { }
