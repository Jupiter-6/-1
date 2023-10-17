import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { MonitoringUiModule } from '@shared/components/monitoring-ui/monitoring-ui.module';

import { CollapseModule } from 'ngx-bootstrap/collapse'; // 抽屉
import { TabsModule } from 'ngx-bootstrap/tabs'; // 标签页
import { NgxEchartsModule } from 'ngx-echarts'; // echarts

import { MonitoringRoutingModule } from './monitoring-routing.module';

import { DmaListComponent } from './dma-list/dma-list.component';
import { HouseRuningComponent } from './house-runing/house-runing.component';
import { RealTimeDataComponent } from './real-time-data/real-time-data.component';
import { InspectionRecordsComponent } from './inspection-records/inspection-records.component';
import { HouseRecordsComponent } from './house-records/house-records.component';
import { HouseLocationComponent } from './house-location/house-location.component';
import { HouseComponent } from './house-records/house/house.component';
import { DevicesComponent } from './house-records/devices/devices.component';
import { DetailsNavBarComponent } from './details-navbar/details.component';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '@shared/components/components.module';
import { DmaHouseComponent } from './dma-house/dma-house.component';
import { SharedMediaModule } from '@shared/multimedia/shared.media.module'; // 多媒体模块
import { ImPipeModule } from '@shared/pipes/im.pipe.module';

@NgModule({
  declarations: [
    DmaListComponent,
    HouseRuningComponent,
    RealTimeDataComponent,
    InspectionRecordsComponent,
    HouseRecordsComponent,
    HouseLocationComponent,
    HouseComponent,
    DevicesComponent,
    DetailsNavBarComponent,
    DmaHouseComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedMediaModule,
    SharedModule,
    MonitoringUiModule,
    NgxEchartsModule,
    ComponentsModule,
    TabsModule.forRoot(),
    CollapseModule.forRoot(),
    MonitoringRoutingModule,
    ImPipeModule,
  ]
})
export class MonitoringModule { }
