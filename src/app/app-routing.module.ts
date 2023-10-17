import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  ...(environment.routes || []),
  /** 首页 */
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'authorized', redirectTo: '/passport' } }
  },
  /** 登录页 */
  {
    path: 'passport',
    loadChildren: () => import('./passport/passport.module').then(m => m.PassportModule)
  },
  /** 异常页面 */
  {
    path: 'exception',
    loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule)
  },
  /** 巡检采集 */
  {
    path: 'inspection',
    loadChildren: () => import('./inspection/inspection.module').then(m => m.InspectionModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  /** 故障 */
  {
    path: 'breakdown',
    loadChildren: () => import('./breakdown/breakdown.module').then(m => m.BreakdownModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws.route.publish', redirectTo: '/exception/403' } }
  },
  /** 维修  */
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws.event.maintenance', redirectTo: '/exception/403' } }
  },
    /** 实时报警  */
    {
      path: 'realtime',
      loadChildren: () => import('./realtime/realtime.module').then(m => m.RealtimeModule),
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: 'sws',
          redirectTo: '/exception/403'
        }
      }
    },
  /** 实时监控 */
  {
    path: 'monitoring',
    loadChildren: () => import('./monitoring/monitoring.module').then(m => m.MonitoringModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  /** 管网监控 */
  {
    path: 'watermains',
    loadChildren: () => import('./watermains/watermains.module').then(m => m.WatermainsModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  /** 大用户 */
  {
    path: 'big-user',
    loadChildren: () => import('./big-user/big-user.module').then(m => m.BigUserModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  /** 制水厂 */
  {
    path: 'waterworks',
    loadChildren: () => import('./waterworks/waterworks.module').then(m => m.WaterworksModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  /** 值班 */
  {
    path: 'be-on-duty',
    loadChildren: () => import('./be-on-duty/be-on-duty.module').then(m => m.BeOnDutyModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  /** 工单 */
  {
    path: 'work',
    loadChildren: () => import('./work/work.module').then(m => m.WorkModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  /** 应急事件 */
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then(m => m.EventModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  /** 常州BI */
  {
    path: 'bi/business',
    loadChildren: () => import('./bi/business/business.module').then(m => m.BusinessModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  {
    path: 'bi/marketing',
    loadChildren: () => import('./bi/marketing/marketing.module').then(m => m.MarketingModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  {
    path: 'bi/operation',
    loadChildren: () => import('./bi/operation/operation.module').then(m => m.OperationModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  {
    path: 'bi/production',
    loadChildren: () => import('./bi/production/production.module').then(m => m.ProductionModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  {
    path: 'bi/serve',
    loadChildren: () => import('./bi/serve/serve.module').then(m => m.ServeModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  {
    path: 'bi/sws',
    loadChildren: () => import('./bi/sws/sws.module').then(m => m.SwsModule),
    canActivate: [NgxPermissionsGuard],
    data: { permissions: { only: 'sws', redirectTo: '/exception/403' } }
  },
  /** 默认跳转到首页菜单 */
  { path: '', redirectTo: '/home/menu', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule)
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
