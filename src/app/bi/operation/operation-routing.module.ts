import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OperationComponent } from './operation.component';
const routes: Routes = [
  { path: '**', component: OperationComponent, data: { title: '经营指标', firstPage: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
