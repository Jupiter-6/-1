import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormlyBootstrapModule } from '@ngx-formly/bootstrap'; // bootstrap-UI组件支持
import { NgxEchartsModule } from 'ngx-echarts';                //  图表支持
import { CustomFormTemplateModule } from './custom-form-template/custom-form-template.module';
import { ComponentsModule } from './components/components.module';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { zhCnLocale } from 'ngx-bootstrap/locale';
defineLocale('zh-cn', zhCnLocale);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    FormlyBootstrapModule,
    CustomFormTemplateModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  exports: [
    ComponentsModule,
    FormlyBootstrapModule,
    CustomFormTemplateModule,
    NgxEchartsModule,
  ]
})
export class SharedModule { }
