import { Component, Inject, InjectionToken, Input, OnInit } from '@angular/core';
export const ConnectionConfigDismissible = new InjectionToken<{}>('ConnectionConfigDismissible');
export const ConnectionConfigType = new InjectionToken<{}>('ConnectionConfigType');
export const ConnectionConfigContent = new InjectionToken<{}>('ConnectionConfigContent');

@Component({
  selector: 'im-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  constructor(
    @Inject(ConnectionConfigDismissible) public dismissible: boolean,
    @Inject(ConnectionConfigType) public type: number,
    @Inject(ConnectionConfigContent) public content: string,
  ) { }

  ngOnInit(): void {
  }

  onClosed() {

  }
}
