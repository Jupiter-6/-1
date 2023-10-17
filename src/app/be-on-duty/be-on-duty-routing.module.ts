import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DutyplanComponent } from './dutyplan/dutyplan.component';
import { DutynoticeComponent } from './dutynotice/dutynotice.component';
import { DutynoticePlusComponent } from './dutynotice-plus/dutynotice-plus.component';
import { DutylogComponent } from './dutylog/dutylog.component';

const routes: Routes = [
  { path: 'dutyplan', component: DutyplanComponent, data: { title: '签到', firstPage: true } },
  { path: 'dutynotice', component: DutynoticeComponent, data: { title: '值班公告', firstPage: true } },
  { path: 'dutynotice-plus', component: DutynoticePlusComponent, data: { title: '值班通知', firstPage: true } },
  { path: 'dutylog', component: DutylogComponent, data: { title: '值班日志', firstPage: true } },

  { path: '', redirectTo: '/dutyplan', pathMatch: 'full' },
  { path: '**', component: DutyplanComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeOnDutyRoutingModule { }
