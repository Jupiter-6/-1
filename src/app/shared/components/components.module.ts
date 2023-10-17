import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonitoringUiModule } from './monitoring-ui/monitoring-ui.module';
import { InspectionUiModule } from './inspection-ui/inspection-ui.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ListTipComponent } from './list-tip/list-tip.component';
import { ModalPickerComponent } from './modal-picker/modal-picker.component';
import { SensorPickerComponent } from './sensor-picker/sensor-picker.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ImTableComponent } from './im-table/im-table.component';

@NgModule({
  declarations: [
    NavBarComponent,
    ListTipComponent,
    ModalPickerComponent,
    SensorPickerComponent,
    TabsComponent,
    ImTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MonitoringUiModule,
    InspectionUiModule,
    TabsModule,
  ],
  exports: [
    NavBarComponent,
    ListTipComponent,
    MonitoringUiModule,
    InspectionUiModule,
    ModalPickerComponent,
    SensorPickerComponent,
    TabsComponent,
    ImTableComponent,
  ]
})
export class ComponentsModule { }
