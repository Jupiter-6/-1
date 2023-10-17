import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BusinessComponent } from './business.component';
const routes: Routes = [
  { path: '**', component: BusinessComponent, data: { title: '业务指标', firstPage: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
