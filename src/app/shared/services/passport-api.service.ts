import { Injectable, Injector } from '@angular/core';
import { BaseApi, BaseUrl, POST, Query, Body, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import * as dd from 'dingtalk-jsapi';
import * as JsEncryptModule from 'jsencrypt'; //引入JSEncrypt
const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzopvj+2Tv7gEt5IvVSKG
36VG9BTjuNaRyxNvJ6me7sftMU4PuXtFwPkLuBwZgTWMdloZK8M/Obf8a67TGkNK
xtq9l1fc0qiub7zd22js5dzzyOctR7OaW/pgvWBVF0nGOp1isgmeAmPK1GGnWVLQ
QLoAtB9Aw0XStfvSne3MDlThUbBNcSSCvmcKqIrjCRk18TYC38vYlFG8+CPQfG4O
l/IcazeoDAEBXk0SJGV/5qZ91ZZe60pPxsrBbnpy6+nCxg283G1qg/VTPFLk21Wb
C/SCnPk4xgsBXWuo0WV6Fapj+o8+oi4eThtukc5uF6ukL1qMgFLF+aT8czgwev8t
1QIDAQAB`;

import { DdloginParams, LoginParams } from '@shared/entities/login.type';

@Injectable({
  providedIn: 'root'
})
@BaseUrl(environment.api_prefix)
export class PassportApiService extends BaseApi {
  corpId: string = '';
  constructor(
    protected injector: Injector,
    private http: _HttpClient
  ) {
    super(injector)
  }

  /** 登录 */
  @POST('/itsys/login/login.api')
  login(@Query('username') username: any, @Query('password') password: any, @Body data: any): Observable<any> {
    return new Observable();
  }

  ddlogin(params: DdloginParams) {
    const encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(publicKey); // 设置公钥
    const user = encrypt.encrypt(JSON.stringify(params)); // 加密
    return this.http.post(environment.api_prefix + '/itsys/ddlogin/login.api?_allow_anonymous=true', { reqExtends: { encrypted: user }, ...params }).toPromise();
  }

  ddloginBind(params: LoginParams & DdloginParams) {
    const encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(publicKey); // 设置公钥
    const user = encrypt.encrypt(JSON.stringify(params)); // 加密

    return this.http.post(environment.api_prefix + '/itsys/ddlogin/bind.api?_allow_anonymous=true', { reqExtends: { encrypted: user }, ...params }, null).toPromise();
  }
  dd_jsapi_ticket(params:any) { 
    return this.http.post(environment.api_prefix + '/itsys/ddlogin/jsapi_ticket.api?_allow_anonymous=true', params, null).toPromise();
  }

  private get requestAuthCode() {
    if (!this.corpId) {
      this.corpId = location.href.match(/corpId=(\S)*[&]{0,1}/)?.[0]?.split('=')?.[1] as string;
    }
    return dd.runtime.permission.requestAuthCode({
      corpId: this.corpId,
    })
  }

  private get getUserExclusiveInfo() {
    return dd.biz.realm.getUserExclusiveInfo({})
  }

  async ddcode() {
    const info = await this.getUserExclusiveInfo;
    if (info) {
      return (await this.requestAuthCode).code;
    }
    return null;
  }
}
