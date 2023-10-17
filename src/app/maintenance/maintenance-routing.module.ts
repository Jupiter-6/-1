import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ListComponent } from './list/list.component';
import { HistoryComponent } from './history/history.component';
import { DetailsComponent } from './details/details.component';
import { DownloadComponent } from './download/download.component';
import { UploadingComponent } from './uploading/uploading.component';
import { PartsListComponent } from './parts/parts-list/parts-list.component';
import { AudioComponent } from './audio/audio.component';
import { PhotoComponent } from './photo/photo.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  { path: 'list', component: ListComponent, data: { title: '维修' } },
  { path: 'history', component: HistoryComponent, data: { title: '历史' } },
  { path: 'details/:id', component: DetailsComponent, data: { title: '维修详情' } },
  { path: 'download', component: DownloadComponent, data: { title: '下载' } },
  { path: 'uploading', component: UploadingComponent, data: { title: '上传' } },

  { path: 'parts/:id', component: PartsListComponent, data: { title: '维修-配件' } },
  { path: 'audio/:id', component: AudioComponent, data: { title: '维修-音频' } },
  { path: 'photo/:id', component: PhotoComponent, data: { title: '维修-图片' } },
  { path: 'video/:id', component: VideoComponent, data: { title: '维修-视频' } },
  { path: '', redirectTo: '/maintenance/list', pathMatch: 'full' },
  { path: '**', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
