import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchBoxComponent } from './search-box/search-box.component';
import { PumpHousesTableComponent } from './pump-houses-table/pump-houses-table.component';
import { PumpDmaTableComponent } from './pump-dma-table/pump-dma-table.component';
import { LegendComponent } from './legend/legend.component';
import { FormsModule } from '@angular/forms';
import { HouseRuningCardTopComponent } from './house-runing-card-top/house-runing-card-top.component';
import { HouseRuningCardComponent } from './house-runing-card/house-runing-card.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { ImPipeModule } from '@shared/pipes/im.pipe.module';
import { PumpHouseCardComponent } from './pump-house-card/pump-house-card.component';
@NgModule({
  declarations: [
    SearchBoxComponent,
    PumpHousesTableComponent,
    PumpDmaTableComponent,
    LegendComponent,
    HouseRuningCardTopComponent,
    HouseRuningCardComponent,
    CustomTableComponent,
    PumpHouseCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImPipeModule,
  ],
  exports: [
    SearchBoxComponent,
    PumpHousesTableComponent,
    PumpDmaTableComponent,
    LegendComponent,
    HouseRuningCardTopComponent,
    HouseRuningCardComponent,
    CustomTableComponent,
    PumpHouseCardComponent
  ]
})
export class MonitoringUiModule { }
