import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { WaterworksRoutingModule } from './waterworks-routing.module';
import { SharedModule } from '@shared/shared.module'; // 基础共享模块

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { MainComponent } from './main/main.component';
import { FactoryComponent } from './factory/factory.component';
import { LiveComponent } from './live/live.component';
import { DayComponent } from './day/day.component';
import { MonthComponent } from './month/month.component';
import { YearComponent } from './year/year.component';
import { ListComponent } from './list/list.component';
import { TechnologyComponent } from './technology/technology.component';
import { DataDetailComponent } from './data-detail/data-detail.component';
import { StatisticalTypesComponent } from './statistical-types/statistical-types.component';
import { FactoryInfoCardComponent } from './factory-info-card/factory-info-card.component';


@NgModule({
  declarations: [
    LiveComponent,
    DayComponent,
    MonthComponent,
    YearComponent,
    ListComponent,
    TechnologyComponent,
    DataDetailComponent,
    StatisticalTypesComponent,
    MainComponent,
    FactoryComponent,
    FactoryInfoCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    WaterworksRoutingModule
  ]
})
export class WaterworksModule { }
