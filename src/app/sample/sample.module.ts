import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';

import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { SharedMediaModule } from '@shared/multimedia/shared.media.module'; // 多媒体模块

import { NgxViewerModule } from 'ngx-viewer'; // import ngx-viewer module
import { MessageModule } from '@shared/components/message/message.module'; // 全局消息提示
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth'; // 蓝牙

import { SampleRoutingModule } from './sample-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';    // 模态框
import { TabsModule } from 'ngx-bootstrap/tabs';      // 标签页

import { PhotoComponent } from './photo/photo.component';
import { ScanComponent } from './scan/scan.component';
import { VideoComponent } from './video/video.component';
import { AudioComponent } from './audio/audio.component';
import { ChartsComponent } from './charts/charts.component';
import { OlMapComponent } from './ol-map/ol-map.component';
import { ModalComponent } from './modal/modal.component';
import { TabsComponent } from './tabs/tabs.component';
import { MessageComponent } from './message/message.component';
import { BluetoothComponent } from './bluetooth/bluetooth.component';

@NgModule({
  declarations: [
    PhotoComponent,
    ScanComponent,
    VideoComponent,
    AudioComponent,
    ChartsComponent,
    OlMapComponent,
    ModalComponent,
    TabsComponent,
    MessageComponent,
    BluetoothComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedMediaModule,
    NgxViewerModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    SampleRoutingModule,
    MessageModule,
    WebBluetoothModule.forRoot({
      enableTracing: true // or false, this will enable logs in the browser's console
    })
  ]
})
export class SampleModule { }
