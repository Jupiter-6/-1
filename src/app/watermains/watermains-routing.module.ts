import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarComponent } from './star/star.component';
import { DataComponent } from './data/data.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { WarningComponent } from './warning/warning.component';
import { WatermainsComponent } from './watermains.component';

const routes: Routes = [
  { path: 'analyse', component: AnalyseComponent, data: { title: '数据分析' } },
  { path: 'warning', component: WarningComponent, data: { title: '实时报警', firstPage: true } },

  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: DataComponent, data: { title: '管网监控', firstPage: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatermainsRoutingModule { }
