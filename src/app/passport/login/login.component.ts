import { Component, Inject, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { environment } from '@env/environment';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { PassportApiService } from '@shared/services/passport-api.service';
import { PERM } from '@shared/data/perm';
import { NgxPermissionsService } from 'ngx-permissions';
import { DatabaseService } from '@shared/services/_database.service';


@Component({
  selector: 'im-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logoSrc = environment.assets_prefix + '/assets/cmzassets/images/app-icon.png';

  loading: boolean = false;
  errorInfo = '';
  app = {} as any;
  constructor(
    private router: Router,
    private ngxPermissionsService: NgxPermissionsService,
    private passportApiService: PassportApiService,
    private databaseService: DatabaseService,
    @Inject(DA_SERVICE_TOKEN) private service: ITokenService
  ) { }

  ngOnInit(): void {
    const appStr = localStorage.getItem('app');
    if (appStr) {
      this.app = JSON.parse(appStr);
    }
    this.ddLogin();
  }

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: '账号',
        placeholder: '输入账号',
        required: true,
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: '密码',
        placeholder: '输入密码',
        required: true,
      }
    },
  ];

  async onSubmit(model: any) {
    this.loading = true;
    let params = await this.getDdlogParams() as any;
    let res;
    const { username, password } = model;
    if (params) {
      this.errorInfo = '钉钉账户绑定中。。。';
      res = await this.passportApiService.ddloginBind({ ...params, username, password }).catch(error => { alert(JSON.stringify(error)) })
    } else {
      const params = { username: `0:${this.app.organid}:` + username, password };
      // const params = { username: `0:demo:` + username, password };
      res = await this.passportApiService.login(params.username, params.password, params).toPromise();
    }
    this.loading = false;
    this.afterLogin(res)
    return true;
  }
  afterLogin(res: any) {
    const { code, detailmsg, user } = res;
    if (code !== '0') {
      this.errorInfo = detailmsg
    } else {
      const { token } = user;
      this.service.set({ token });
      const perm = PERM;
      sessionStorage.setItem('perm', JSON.stringify(perm));
      sessionStorage.setItem('user', JSON.stringify(user));
      this.ngxPermissionsService.addPermission(perm);
      this.databaseService.initDatabase(user);// 初始化数据库
      this.databaseService.initData(); // 恢复数据
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
  }
  async ddLogin() {
    this.loading = true;
    const params = await this.getDdlogParams();
    if (params) {
      this.errorInfo = '钉钉账号自动登录中...'
      const res = await this.passportApiService.ddlogin(params);
      this.afterLogin(res)
    }
    this.loading = false;
    this.errorInfo = '';
  }

  private async getDdlogParams() {
    try {
      const ddcode = await this.passportApiService.ddcode();
      if (ddcode) {
        const { appcode, organid } = this.app;
        return { ddcode, orgno: organid, appcode }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

}
