import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { FactoryComponent } from './factory/factory.component';
import { DataDetailComponent } from './data-detail/data-detail.component';

const routes: Routes = [
  { path: 'main', component: MainComponent, data: { title: '水厂数据', firstPage: true } },
  { path: 'factory/:id', component: FactoryComponent, data: { title: '水厂' } },
  { path: 'data-detail/:id', component: DataDetailComponent, data: { title: '详细数据' } },

  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterworksRoutingModule { }
