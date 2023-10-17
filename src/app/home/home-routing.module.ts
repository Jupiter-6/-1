import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuDevComponent } from './menu-dev/menu-dev.component';
import { MenuProdComponent } from './menu-prod/menu-prod.component';
const routes: Routes = [
  { path: 'menu', component: MenuProdComponent },
  { path: 'menu-dev', component: MenuDevComponent },
  { path: '', redirectTo: '/home/menu', pathMatch: 'full' },
  { path: '**', component: MenuProdComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
