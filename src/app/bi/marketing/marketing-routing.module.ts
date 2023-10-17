import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketingComponent } from './marketing.component';
const routes: Routes = [
  { path: '**', component: MarketingComponent, data: { title: '营销指标', firstPage: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketingRoutingModule { }
