import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';                //  图表支持

import { BiEchartsComponent } from './bi-echarts.component';

@NgModule({
  declarations: [
    BiEchartsComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  exports: [
    BiEchartsComponent
  ]
})
export class BiEchartsModule { }
