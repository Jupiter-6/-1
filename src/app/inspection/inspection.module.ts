import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { InspectionRoutingModule } from './inspection-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs'; // 标签页
import { PopoverModule } from 'ngx-bootstrap/popover'; // 弹出框
import { SharedMediaModule } from '@shared/multimedia/shared.media.module'; // 多媒体模块

import { ListComponent } from './list/list.component';
import { PumpHousesComponent } from './pump-houses/pump-houses.component';
import { DevicesComponent } from './devices/devices.component';
import { ProjectsComponent } from './projects/projects.component';
import { DownloadComponent } from './download/download.component';
import { UploadingComponent } from './uploading/uploading.component';
import { PhotoComponent } from './photo/photo.component';
import { AudioComponent } from './audio/audio.component';
import { VideoComponent } from './video/video.component';
import { ImPipeModule } from '@shared/pipes/im.pipe.module';
import { ExceptionComponent } from './exception/exception.component';
import { LocationComponent } from './location/location.component';


@NgModule({
  declarations: [
    ListComponent,
    PumpHousesComponent,
    DevicesComponent,
    ProjectsComponent,
    DownloadComponent,
    UploadingComponent,
    PhotoComponent,
    AudioComponent,
    VideoComponent,
    ExceptionComponent,
    LocationComponent
  ],
  imports: [
    CommonModule,
    ImPipeModule,
    SharedModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    SharedMediaModule,
    InspectionRoutingModule
  ]
})
export class InspectionModule { }
