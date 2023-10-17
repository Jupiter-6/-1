import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { SwsRoutingModule } from './sws-routing.module';
import { SwsComponent } from './sws.component';
import { BiEchartsModule } from '@shared/components/bi-echarts/bi-echarts.module';
import { ImScreenModule } from '@shared/components/im-screen/im-screen.module';

@NgModule({
  declarations: [SwsComponent],
  imports: [
    SharedModule,
    CommonModule,
    ImScreenModule,
    BiEchartsModule,
    SwsRoutingModule,
  ],
})
export class SwsModule {}
