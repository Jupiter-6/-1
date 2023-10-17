import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'list', component: ListComponent, data: { title: '应急事件列表', firstPage: true } },
  { path: 'details/:id', component: DetailsComponent, data: { title: '事件详情' } },
  { path: '', redirectTo: '/event/list', pathMatch: 'full' },
  { path: '**', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
