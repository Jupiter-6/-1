import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MessageComponent } from './message.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    AlertModule.forRoot()
  ],
  entryComponents: [
    MessageComponent,
  ],
  providers: [
    MessageService
  ]
})
export class MessageModule { }
