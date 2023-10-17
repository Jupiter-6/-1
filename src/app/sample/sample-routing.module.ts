import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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


const routes: Routes = [

  { path: 'photo', component: PhotoComponent, data: { title: 'photo 照片' } },
  { path: 'scan', component: ScanComponent, data: { title: 'scan 扫码' } },
  { path: 'video', component: VideoComponent, data: { title: 'video 视频' } },
  { path: 'audio', component: AudioComponent, data: { title: 'audio 音频' } },
  { path: 'charts', component: ChartsComponent, data: { title: 'charts 图表' } },
  { path: 'ol-map', component: OlMapComponent, data: { title: 'ol-map 地图' } },
  { path: 'modal', component: ModalComponent, data: { title: 'modal 模态框' } },
  { path: 'tabs', component: TabsComponent, data: { title: 'tabs 便签页' } },
  { path: 'message', component: MessageComponent, data: { title: 'message 全局提示' } },
  { path: 'bluetooth', component: BluetoothComponent, data: { title: 'bluetooth 蓝牙' } },
  { path: '', redirectTo: '/sample/charts', pathMatch: 'full' },
  { path: '**', component: ChartsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleRoutingModule { }
