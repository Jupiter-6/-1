import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';               //  表单支持支持

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


import { defineLocale } from 'ngx-bootstrap/chronos';
import { zhCnLocale } from 'ngx-bootstrap/locale';
defineLocale('zh-cn', zhCnLocale);


/** ngx-bootstrap 模块 */
const NgBModule = [
  BsDatepickerModule.forRoot(),
  TypeaheadModule.forRoot(),
];

import { DatePickerComponent } from './date-picker/date-picker.component';
import { SearchSelectComponent } from './search-select/search-select.component';

@NgModule({
  declarations: [
    DatePickerComponent,
    SearchSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...NgBModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      /** 全局自定义验证器 */
      validators: [],
      /** 全局自定义表单 */
      types: [
        { name: 'date-picker', component: DatePickerComponent },
        { name: 'search-select', component: SearchSelectComponent },
      ],
      validationMessages: [
        { name: 'required', message: '这个字段是必填项' },
      ],
    }),
  ],
  exports: [
    ReactiveFormsModule,
    FormlyModule
  ]
})
export class CustomFormTemplateModule { }
