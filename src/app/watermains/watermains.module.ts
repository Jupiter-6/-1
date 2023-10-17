import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


import { WatermainsRoutingModule } from './watermains-routing.module';
import { SharedModule } from '@shared/shared.module'; // 基础共享模块

import { StarComponent } from './star/star.component';
import { DataComponent } from './data/data.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { WarningComponent } from './warning/warning.component';
import { WatermainsComponent } from './watermains.component';


@NgModule({
  declarations: [
    StarComponent,
    DataComponent,
    AnalyseComponent,
    WarningComponent,
    WatermainsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    WatermainsRoutingModule
  ]
})
export class WatermainsModule { }
