import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { ServeRoutingModule } from './serve-routing.module';
import { ServeComponent } from './serve.component';
import { ImScreenModule } from '@shared/components/im-screen/im-screen.module';
import { BiEchartsModule } from '@shared/components/bi-echarts/bi-echarts.module';

@NgModule({
  declarations: [ServeComponent],
  imports: [
    SharedModule,
    CommonModule,
    ServeRoutingModule,
    ImScreenModule,
    BiEchartsModule,
  ],
})
export class ServeModule {}
