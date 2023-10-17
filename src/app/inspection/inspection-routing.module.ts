import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';


import { ListComponent } from './list/list.component';
import { PumpHousesComponent } from './pump-houses/pump-houses.component';
import { DevicesComponent } from './devices/devices.component';
import { ProjectsComponent } from './projects/projects.component';
import { DownloadComponent } from './download/download.component';
import { UploadingComponent } from './uploading/uploading.component';
import { PhotoComponent } from './photo/photo.component';
import { AudioComponent } from './audio/audio.component';
import { VideoComponent } from './video/video.component';
import { ExceptionComponent } from './exception/exception.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  {
    path: 'list', component: ListComponent,
    canActivate: [NgxPermissionsGuard],
    data: { title: '巡检采集', permissions: { only: 'sws.route.publish', redirectTo: '/exception/403' } }
  },
  { path: 'pump-house/location', component: LocationComponent, data: { title: '巡检-泵房-坐标' } },
  { path: 'pump-house/:taskid', component: PumpHousesComponent, data: { title: '任务' } },
  { path: 'pump-house/:taskid/:houseid', component: DevicesComponent, data: { title: '泵房' } },
  { path: 'pump-house/:taskid/:houseid/:deviceid', component: ProjectsComponent, data: { title: '设备' } },

  { path: 'download', component: DownloadComponent, data: { title: '路线下载' } },
  { path: 'uploading', component: UploadingComponent, data: { title: '路线上传' } },

  { path: 'photo/:taskid', component: PhotoComponent, data: { title: '巡检-图片' } },
  { path: 'photo/:taskid/:houseid', component: PhotoComponent, data: { title: '巡检-泵房-图片' } },
  { path: 'photo/:taskid/:houseid/:deviceid/:projectid', component: PhotoComponent, data: { title: '巡检-项目-图片' } },

  { path: 'audio/:taskid', component: AudioComponent, data: { title: '巡检-音频' } },
  { path: 'audio/:taskid/:houseid', component: AudioComponent, data: { title: '巡检-泵房-音频' } },
  { path: 'audio/:taskid/:houseid/:deviceid/:projectid', component: AudioComponent, data: { title: '巡检-项目-音频' } },

  { path: 'video/:taskid', component: VideoComponent, data: { title: '巡检-视频' } },
  { path: 'video/:taskid/:houseid', component: VideoComponent, data: { title: '巡检-泵房-视频' } },
  { path: 'video/:taskid/:houseid/:deviceid/:projectid', component: VideoComponent, data: { title: '巡检-项目-视频' } },

  { path: 'exception/:taskid/:houseid/:deviceid/:projectid', component: ExceptionComponent, data: { title: '巡检-项目-异常上报' } },

  { path: '', redirectTo: '/inspection/list', pathMatch: 'full' },
  { path: '**', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionRoutingModule { }
