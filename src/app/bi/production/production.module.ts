import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { BiEchartsModule } from '@shared/components/bi-echarts/bi-echarts.module';
import { ImScreenModule } from '@shared/components/im-screen/im-screen.module';

@NgModule({
  declarations: [ProductionComponent],
  imports: [
    SharedModule,
    CommonModule,
    ProductionRoutingModule,
    ImScreenModule,
    BiEchartsModule,
  ],
})
export class ProductionModule {}
