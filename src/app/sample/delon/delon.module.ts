import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelonRoutingModule } from './delon-routing.module';

import { SharedModule } from '@shared/shared.module'; // 基础共享模块
import { ZipModule } from '@delon/abc/zip';           // zip 操作

import { CacheComponent } from './cache/cache.component';
import { LazyLoadComponent } from './lazy-load/lazy-load.component';
import { ZipComponent } from './zip/zip.component';
import { HttpTestComponent } from './http-test/http-test.component';
import { MockTestComponent } from './mock-test/mock-test.component';


@NgModule({
  declarations: [
    CacheComponent,
    LazyLoadComponent,
    ZipComponent,
    HttpTestComponent,
    MockTestComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ZipModule,
    DelonRoutingModule
  ]
})
export class DelonModule { }
