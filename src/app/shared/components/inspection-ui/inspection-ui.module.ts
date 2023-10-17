import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImPipeModule } from '@shared/pipes/im.pipe.module';
import { DeviceCardComponent } from './device-card/device-card.component';
import { HouseCardComponent } from './house-card/house-card.component';



@NgModule({
  declarations: [
    DeviceCardComponent,
    HouseCardComponent
  ],
  imports: [
    CommonModule,
    ImPipeModule
  ],
  exports: [
    DeviceCardComponent,
    HouseCardComponent
  ]
})
export class InspectionUiModule { }
