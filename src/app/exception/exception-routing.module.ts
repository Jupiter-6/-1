import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Exception403Component } from './exception403/exception403.component';
import { Exception404Component } from './exception404/exception404.component';
import { Exception500Component } from './exception500/exception500.component';

const routes: Routes = [
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '', redirectTo: '/exception/404', pathMatch: 'full' },
  { path: '**', component: Exception404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionRoutingModule { }
