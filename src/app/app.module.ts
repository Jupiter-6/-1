import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DelonMockModule } from '@delon/mock';
import { AlainConfig, ALAIN_CONFIG } from '@delon/util/config';
import { DA_STORE_TOKEN, DelonAuthModule, SessionStorageStore, SimpleInterceptor } from '@delon/auth';
import { DefaultInterceptor } from '@shared/services/net/default.interceptor';
import * as MOCKDATA from '@shared/data/_index';
import { environment } from '@env/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StartupService } from '@shared/services/startup/startup.service';
import { MessageModule } from '@shared/components/message/message.module';
// #region Startup Service
export function StartupServiceFactory(startupService: StartupService): () => Promise<void> {
  return () => startupService.load();
}
/** 开发环境模块 */
const DevModule = [
  DelonMockModule.forRoot({ data: MOCKDATA })
];
const url_prefix = environment.assets_prefix;
/** alain global-config */
const alainConfig: AlainConfig = {
  media: {
    urls: [
      url_prefix + '/assets/js/plyr.min.js',
      url_prefix + '/assets/css/plyr.css'
    ]
  },
  zip: {
    url: url_prefix + '/assets/js/jszip.min.js'
  },
  auth: {
    login_url: '/passport/login',
  }
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DelonAuthModule,
    MessageModule,
    NgxPermissionsModule.forRoot(),
    ...(environment.production && [] || DevModule),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

  ],
  providers: [
    { provide: ALAIN_CONFIG, useValue: alainConfig },
    // 指定认证风格对应的HTTP拦截器
    { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    { provide: DA_STORE_TOKEN, useClass: SessionStorageStore },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
