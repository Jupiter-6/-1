import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { FormRoutingModule } from './form-routing.module';

import { SelectComponent } from './select/select.component';
import { InputComponent } from './input/input.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SearchSelectComponent } from './search-select/search-select.component';

@NgModule({
  declarations: [
    SelectComponent,
    InputComponent,
    DatePickerComponent,
    SearchSelectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormRoutingModule
  ]
})
export class FormModule { }
