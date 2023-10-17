import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SwsComponent } from './sws.component';
const routes: Routes = [
  { path: '**', component: SwsComponent, data: { title: '二供指标', firstPage: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwsRoutingModule { }
