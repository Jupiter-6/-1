import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BigUserRoutingModule } from './big-user-routing.module';
import { SharedModule } from '@shared/shared.module'; // 基础共享模块

import { StarComponent } from './star/star.component';
import { AnalyseComponent } from './analyse/analyse.component';


@NgModule({
  declarations: [
    StarComponent,
    AnalyseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BigUserRoutingModule
  ]
})
export class BigUserModule { }
