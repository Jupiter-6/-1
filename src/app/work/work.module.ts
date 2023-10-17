import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { WorkRoutingModule } from './work-routing.module';
import { SharedMediaModule } from '@shared/multimedia/shared.media.module'; // 多媒体模块
import { CustomFormTemplateModule } from '@shared/custom-form-template/custom-form-template.module';
import { TabsModule } from 'ngx-bootstrap/tabs';       // 标签页
import { ModalModule } from 'ngx-bootstrap/modal';     // 模态框
import { PopoverModule } from 'ngx-bootstrap/popover'; // 弹出框
import { ImPipeModule } from '@shared/pipes/im.pipe.module';

import { DownloadComponent } from './download/download.component';
import { UploadingComponent } from './uploading/uploading.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { AudioComponent } from './audio/audio.component';
import { VideoComponent } from './video/video.component';
import { PhotoComponent } from './photo/photo.component';
import { PartsEditComponent } from './parts/parts-edit/parts-edit.component';
import { PartsListComponent } from './parts/parts-list/parts-list.component';

@NgModule({
  declarations: [
    DownloadComponent,
    UploadingComponent,
    ListComponent,
    DetailsComponent,
    AudioComponent,
    VideoComponent,
    PhotoComponent,
    PartsEditComponent,
    PartsListComponent
    
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
    WorkRoutingModule
  ]
})
export class WorkModule { }
