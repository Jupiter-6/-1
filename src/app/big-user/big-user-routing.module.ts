import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StarComponent } from './star/star.component';
import { AnalyseComponent } from './analyse/analyse.component';

const routes: Routes = [
  { path: 'star', component: StarComponent, data: { title: '我的收藏' } },
  { path: 'analyse', component: AnalyseComponent, data: { title: '数据分析' } },

  { path: '', redirectTo: '/analyse', pathMatch: 'full' },
  { path: '**', component: AnalyseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BigUserRoutingModule { }
