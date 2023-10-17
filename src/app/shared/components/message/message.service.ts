import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { MessageComponent, ConnectionConfigDismissible, ConnectionConfigType, ConnectionConfigContent } from './message.component';
export interface MessageConfig {
  /** 提示内容 */
  content?: string;
  /** 消息类型 默认 info */
  type?: 'success' | 'info' | 'warning' | 'danger';
  /** 持续时间，默认 3500 ms */
  duration?: number;
  /** 是否展示关闭按钮，默认 true  */
  dismissible?: boolean;
}
@Injectable()
export class MessageService {

  constructor(
    private injector: Injector,
    private overlay: Overlay
  ) { }

  show(config?: MessageConfig) {
    const overlayRef = this.overlay.create();
    const injectorTokens = new WeakMap<any, any>([
      [ConnectionConfigDismissible, config?.dismissible === undefined && true || config.dismissible],
      [ConnectionConfigType, config?.type || 'info'],
      [ConnectionConfigContent, config?.content || config?.type || 'tips~']
    ]);
    const userProfilePortal = new ComponentPortal(MessageComponent, null, this.createPortalInjector(injectorTokens));
    overlayRef.attach(userProfilePortal);
    setTimeout(() => {
      overlayRef.dispose()
    }, config?.duration || 3500);
  }

  createPortalInjector(injectorTokens: WeakMap<any, any>): PortalInjector {
    return new PortalInjector(this.injector, injectorTokens);
  }
}
