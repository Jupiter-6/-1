import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CacheComponent } from './cache/cache.component';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';
import { ZipComponent } from './zip/zip.component';
import { HttpTestComponent } from './http-test/http-test.component';
import { MockTestComponent } from './mock-test/mock-test.component';

const routes: Routes = [
  { path: 'cache', component: CacheComponent, data: { title: 'cache 缓存' } },
  { path: 'lazy-load', component: LazyLoadComponent, data: { title: 'lazy-load 懒加载' } },
  { path: 'zip', component: ZipComponent, data: { title: 'zip 操作' } },
  { path: 'http-test', component: HttpTestComponent, data: { title: 'http 请求' } },
  { path: 'mock-test', component: MockTestComponent, data: { title: 'mock 数据' } },
  { path: '', redirectTo: '/delon/cache', pathMatch: 'full' },
  { path: '**', component: CacheComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelonRoutingModule { }
