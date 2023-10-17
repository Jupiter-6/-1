import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { CustomFormTemplateModule } from '@shared/custom-form-template/custom-form-template.module';
import { ImPipeModule } from '@shared/pipes/im.pipe.module';
import { PopoverModule } from 'ngx-bootstrap/popover'; // 弹出框
import { ModalModule } from 'ngx-bootstrap/modal'; // 模态框
import { PaginationModule } from 'ngx-bootstrap/pagination'; // 分页器

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { RealtimeRoutingModule } from './realtime-routing.module';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    RealtimeRoutingModule,
    SharedModule,
    CustomFormTemplateModule,
    ImPipeModule,
    PopoverModule,
    ModalModule.forRoot(),
    FormsModule,
    PaginationModule.forRoot(),
  ]
})
export class RealtimeModule { }
