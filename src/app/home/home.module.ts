import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionModule } from 'ngx-bootstrap/accordion';

import { HomeRoutingModule } from './home-routing.module';
import { MenuDevComponent } from './menu-dev/menu-dev.component';
import { MenuProdComponent } from './menu-prod/menu-prod.component';

@NgModule({
  declarations: [
    MenuDevComponent,
    MenuProdComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
