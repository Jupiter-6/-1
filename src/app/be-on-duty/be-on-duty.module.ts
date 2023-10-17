import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { ImPipeModule } from '@shared/pipes/im.pipe.module';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BeOnDutyRoutingModule } from './be-on-duty-routing.module';
import { DutyplanComponent } from './dutyplan/dutyplan.component';
import { DutynoticeComponent } from './dutynotice/dutynotice.component';
import { DutynoticePlusComponent } from './dutynotice-plus/dutynotice-plus.component';
import { DutylogComponent } from './dutylog/dutylog.component';
import { DutylogAddComponent } from './dutylog/dutylog-add/dutylog-add.component';
import { DutylogListComponent } from './dutylog/dutylog-list/dutylog-list.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; // 日期选择框
import { TimepickerModule } from 'ngx-bootstrap/timepicker'; // 时间选择框

@NgModule({
  declarations: [
    DutyplanComponent,
    DutynoticeComponent,
    DutynoticePlusComponent,
    DutylogComponent,
    DutylogAddComponent,
    DutylogListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ImPipeModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    TabsModule,
    ModalModule,
    BeOnDutyRoutingModule
  ],
  providers: [{provide: BsModalService}]
})
export class BeOnDutyModule { }
