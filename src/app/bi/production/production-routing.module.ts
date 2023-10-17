import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductionComponent } from './production.component';
const routes: Routes = [
  { path: '**', component: ProductionComponent, data: { title: '生产指标', firstPage: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
