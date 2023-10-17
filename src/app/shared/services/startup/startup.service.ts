import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { NgxPermissionsService } from 'ngx-permissions';
import { TitleService } from '@delon/theme';
import { DatabaseService } from '@shared/services/_database.service';
import { PERM } from '@shared/data/perm';

@Injectable()
export class StartupService {
  constructor(
    @Inject(DA_SERVICE_TOKEN) private service: ITokenService,
    private httpClient: HttpClient,
    private titleService: TitleService,
    private permissionsService: NgxPermissionsService,
    private databaseService: DatabaseService
  ) { }
  private viaHttp(resolve: any, reject: any): void {
    zip(
      this.httpClient.get('assets/cmzassets/app-data.json'),
    ).pipe(
      catchError((res) => {
        console.warn(`StartupService.load: Network request failed`, res);
        resolve(null);
        return [];
      }),
    ).subscribe(
      ([appData]: any[]) => {
        const permStr = sessionStorage.getItem('perm') || JSON.stringify(PERM);
        if (permStr) {
          const perm = JSON.parse(permStr);
          this.permissionsService.loadPermissions(perm);
        }
        const userStr = sessionStorage.getItem('user');
        if (userStr) {
          // const user = JSON.parse(userStr);
        }
        this.setAppData(appData);


      },
      () => { },
      () => {
        resolve(null);
      },
    );
  }
  setAppData(appData: { app: any }) {
    const { app } = appData;
    localStorage.setItem('app', JSON.stringify(app));
    this.titleService.setTitle(app.subname);
    // Can be set page suffix title, https://ng-alain.com/theme/title
  }
  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {

      /** 处理免登录逻辑 */
      this.appinit();
      // 只有在已登录的情况下才会调用关键接口获取菜单权限数据
      if (sessionStorage && sessionStorage.getItem('_token')) {
        this.viaHttp(resolve, reject);
      } else {
        this.httpClient.get('assets/cmzassets/app-data.json').subscribe((appData: any) => {
          this.setAppData(appData);
          resolve(null);
        });
      }
    });
  }
  private appinit() {

    if ((window as any)?.javaobj) {
      const res = (window as any)?.javaobj?.getTokenObj();
      // 设置全局ihivejs
      if (res) {
        const user = JSON.parse(res).user;
        this.service.set({ token: user.token });
        sessionStorage.setItem('user', JSON.stringify(user));
        this.databaseService.initDatabase(user);// 初始化数据库
        this.databaseService.initData(); // 恢复数据
      }
    }
  }

}
