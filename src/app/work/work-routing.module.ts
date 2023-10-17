import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DownloadComponent } from './download/download.component';
import { UploadingComponent } from './uploading/uploading.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { AudioComponent } from './audio/audio.component';
import { VideoComponent } from './video/video.component';
import { PhotoComponent } from './photo/photo.component';
import { PartsListComponent } from './parts/parts-list/parts-list.component';

const routes: Routes = [
  { path: 'list', component: ListComponent, data: { title: '工单列表', firstPage: true } },
  { path: 'details/:id', component: DetailsComponent, data: { title: '工单详情' } },
  { path: 'download', component: DownloadComponent, data: { title: '工单下载', firstPage: true } },
  { path: 'uploading', component: UploadingComponent, data: { title: '工单上传', firstPage: true } },

  { path: 'parts/:id', component: PartsListComponent, data: { title: '维修-配件' } },
  { path: 'audio/:id', component: AudioComponent, data: { title: '维修-音频' } },
  { path: 'photo/:id', component: PhotoComponent, data: { title: '维修-图片' } },
  { path: 'video/:id', component: VideoComponent, data: { title: '维修-视频' } },
  { path: '', redirectTo: '/work/list', pathMatch: 'full', data: { title: '工单列表', firstPage: true } },
  { path: '**', component: ListComponent, data: { title: '工单列表', firstPage: true } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkRoutingModule { }
