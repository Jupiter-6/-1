import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { SharedMediaModule } from '@shared/multimedia/shared.media.module'; // 多媒体模块
import { CustomFormTemplateModule } from '@shared/custom-form-template/custom-form-template.module';
import { TabsModule } from 'ngx-bootstrap/tabs';       // 标签页
import { ModalModule } from 'ngx-bootstrap/modal';     // 模态框
import { PopoverModule } from 'ngx-bootstrap/popover'; // 弹出框
import { ImPipeModule } from '@shared/pipes/im.pipe.module';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { DownloadComponent } from './download/download.component';
import { UploadingComponent } from './uploading/uploading.component';
import { HistoryComponent } from './history/history.component';
import { PartsListComponent } from './parts/parts-list/parts-list.component';
import { PartsEditComponent } from './parts/parts-edit/parts-edit.component';
import { AudioComponent } from './audio/audio.component';
import { PhotoComponent } from './photo/photo.component';
import { VideoComponent } from './video/video.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    DownloadComponent,
    UploadingComponent,
    HistoryComponent,
    PartsListComponent,
    PartsEditComponent,
    AudioComponent,
    PhotoComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedMediaModule,
    CustomFormTemplateModule,
    TabsModule,
    ModalModule,
    ImPipeModule,
    PopoverModule,
    MaintenanceRoutingModule
  ]
})
export class MaintenanceModule { }
