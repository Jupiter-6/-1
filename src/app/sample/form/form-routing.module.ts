import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SearchSelectComponent } from './search-select/search-select.component';

const routes: Routes = [
  { path: 'input', component: InputComponent, data: { title: 'input 输入框' } },
  { path: 'select', component: SelectComponent, data: { title: 'select 选择器' } },
  { path: 'search-select', component: SearchSelectComponent, data: { title: 'select 搜索选择器' } },
  { path: 'date-picker', component: DatePickerComponent, data: { title: 'date-picker 日期选择器' } },
  { path: '', redirectTo: '/form/input', pathMatch: 'full' },
  { path: '**', component: InputComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
