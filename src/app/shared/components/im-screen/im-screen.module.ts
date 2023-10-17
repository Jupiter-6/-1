import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; // 日期选择框
import { TimepickerModule } from 'ngx-bootstrap/timepicker'; // 时间选择框
import { ImScreenComponent } from './im-screen.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ImScreenComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  exports: [ImScreenComponent],
  providers: [{ provide: BsModalService }],
})
export class ImScreenModule {}
