import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFormTemplateModule } from '@shared/custom-form-template/custom-form-template.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap'; // bootstrap-UI组件支持
import { PassportRoutingModule } from './passport-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CustomFormTemplateModule,
    FormlyBootstrapModule,
    PassportRoutingModule
  ]
})
export class PassportModule { }
