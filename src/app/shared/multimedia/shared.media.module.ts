import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppyAngularDashboardModalModule } from '@uppy/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxViewerModule } from 'ngx-viewer';           // import ngx-viewer module
import { MediaModule } from '@delon/abc/media';         // 多媒体播放器
import { ModalModule } from 'ngx-bootstrap/modal';

import { ScanComponent } from './scan/scan.component';
import { PhotoComponent } from './photo/photo.component';
import { VideoComponent } from './video/video.component';
import { AudioComponent } from './audio/audio.component';
import { AudioListComponent } from './audio-list/audio-list.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoListNewComponent } from './photo-list-new/photo-list.component';
import { VideoListComponent } from './video-list/video-list.component';
import { CustomFormTemplateModule } from '@shared/custom-form-template/custom-form-template.module';



@NgModule({
  declarations: [
    ScanComponent,
    PhotoComponent,
    VideoComponent,
    AudioComponent,
    AudioListComponent,
    PhotoListComponent,
    PhotoListNewComponent,
    VideoListComponent
  ],
  imports: [
    CommonModule,
    UppyAngularDashboardModalModule,
    ZXingScannerModule,
    NgxViewerModule,
    MediaModule,
    ModalModule.forRoot(),
    CustomFormTemplateModule
  ],
  exports: [
    ZXingScannerModule,
    ScanComponent,
    PhotoComponent,
    VideoComponent,
    AudioComponent,
    AudioListComponent,
    PhotoListComponent,
    PhotoListNewComponent,
    VideoListComponent
  ]
})
export class SharedMediaModule { }
