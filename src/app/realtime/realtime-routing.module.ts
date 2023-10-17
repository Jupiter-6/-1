import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {OrderComponent } from './order/order.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    { path: 'list', component: ListComponent, data: { title: '实时报警' } },
    { path: 'details/:id', component: DetailsComponent, data: { title: '实时报警详情' } },
    { path: 'order/:id', component: OrderComponent, data: { title: '生成工单' } },
    { path: '', redirectTo: '/realtime/list', pathMatch: 'full' },
    { path: '**', component: ListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RealtimeRoutingModule { }
