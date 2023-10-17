import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreakdownRoutingModule } from './breakdown-routing.module';
import { SharedMediaModule } from '@shared/multimedia/shared.media.module'; // 多媒体模块
import { CustomFormTemplateModule } from '@shared/custom-form-template/custom-form-template.module';
import { TabsModule } from 'ngx-bootstrap/tabs'; // 标签页
import { ModalModule } from 'ngx-bootstrap/modal'; // 模态框
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; // 日期选择框
import { FormsModule } from '@angular/forms';
import { zhCnLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { SharedModule } from '@shared/shared.module';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
defineLocale('zh-cn', zhCnLocale); // 中文支持

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    SharedMediaModule,
    CustomFormTemplateModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BreakdownRoutingModule,
  ]
})
export class BreakdownModule { }
