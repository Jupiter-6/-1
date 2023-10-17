import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'list', component: ListComponent, data: { title: '故障' } },
  { path: 'details/:id', component: DetailsComponent, data: { title: '故障详情' } },
  { path: '', redirectTo: '/breakdown/list', pathMatch: 'full' },
  { path: '**', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreakdownRoutingModule { }
