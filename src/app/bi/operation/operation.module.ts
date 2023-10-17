import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { OperationRoutingModule } from './operation-routing.module';
import { OperationComponent } from './operation.component';
import { BiEchartsModule } from '@shared/components/bi-echarts/bi-echarts.module';
import { ImScreenModule } from '@shared/components/im-screen/im-screen.module';

@NgModule({
  declarations: [OperationComponent],
  imports: [
    SharedModule,
    CommonModule,
    OperationRoutingModule,
    ImScreenModule,
    BiEchartsModule,
  ],
})
export class OperationModule {}
