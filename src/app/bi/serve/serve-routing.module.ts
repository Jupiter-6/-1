import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServeComponent } from './serve.component';
const routes: Routes = [
  { path: '**', component: ServeComponent, data: { title: '服务指标', firstPage: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServeRoutingModule { }
