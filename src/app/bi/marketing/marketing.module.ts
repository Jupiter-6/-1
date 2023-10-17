import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiEchartsModule } from '@shared/components/bi-echarts/bi-echarts.module';

import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { MarketingRoutingModule } from './marketing-routing.module';
import { MarketingComponent } from './marketing.component';
import { ImScreenModule } from '@shared/components/im-screen/im-screen.module';

@NgModule({
  declarations: [MarketingComponent],
  imports: [
    SharedModule,
    CommonModule,
    BiEchartsModule,
    MarketingRoutingModule,
    ImScreenModule,
  ],
})
export class MarketingModule {}
