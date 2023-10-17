import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
import { ImScreenModule } from '@shared/components/im-screen/im-screen.module';
import { BiEchartsModule } from '@shared/components/bi-echarts/bi-echarts.module';

@NgModule({
  declarations: [BusinessComponent],
  imports: [
    SharedModule,
    CommonModule,
    BusinessRoutingModule,
    ImScreenModule,
    BiEchartsModule,
  ],
})
export class BusinessModule {}
