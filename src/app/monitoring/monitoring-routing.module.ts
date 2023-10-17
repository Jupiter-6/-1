import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DmaListComponent } from './dma-list/dma-list.component';
import { HouseRuningComponent } from './house-runing/house-runing.component';
import { RealTimeDataComponent } from './real-time-data/real-time-data.component';
import { InspectionRecordsComponent } from './inspection-records/inspection-records.component';
import { HouseRecordsComponent } from './house-records/house-records.component';
import { HouseLocationComponent } from './house-location/house-location.component';
import { DmaHouseComponent } from './dma-house/dma-house.component';

const routes: Routes = [
  { path: 'list', component: DmaListComponent, data: { title: '实时监控' } },
  { path: 'dma-houses', component: DmaHouseComponent, data: { title: '泵房列表' } },
  
  { path: 'house-runing/:houseid', component: HouseRuningComponent, data: { title: '' } },
  { path: 'real-time-data/:houseid', component: RealTimeDataComponent, data: { title: '' } },
  { path: 'inspection-records/:houseid', component: InspectionRecordsComponent, data: { title: '泵房-运维' } },
  { path: 'house-records/:houseid', component: HouseRecordsComponent, data: { title: '' } },
  { path: 'house-location/:houseid', component: HouseLocationComponent, data: { title: '泵房-位置' } },
  { path: '', redirectTo: '/monitoring/list', pathMatch: 'full' },
  { path: '**', component: DmaListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
