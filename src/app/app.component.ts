import { AfterContentInit, Component, OnInit } from '@angular/core';
import { PassportApiService } from '@shared/services/passport-api.service';
import { DatabaseService } from '@shared/services/_database.service';
import * as dd from 'dingtalk-jsapi';

@Component({
  selector: 'im-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  constructor(
    private databaseService: DatabaseService,
    private passportApiService: PassportApiService,
  ) { }
  ngAfterContentInit(): void {
    this.databaseService.initData(); // 数据库初始化

    if (dd.env.platform !== 'notInDingTalk') {
      this.init_dd_config();
    }
  }
  init_dd_config() {
    const appStr = localStorage.getItem('app');
    if (!appStr) { return false };
    const app = JSON.parse(appStr);

    this.passportApiService.dd_jsapi_ticket({
      appcode: app.appcode,
      orgno: app.organid,
      url: location.href
    }).then(data => {
      dd.config({
        agentId: data.agentId, // 必填，微应用ID
        corpId: data.corpId,//必填，企业ID
        timeStamp: data.timeStamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，自定义固定字符串。
        signature: data.signature, // 必填，签名
        type: 0,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
        jsApiList: [
          'device.geolocation.get',
          'biz.util.chooseImage',
          'biz.util.compressImage',
        ] // 必填，需要使用的jsapi列表，注意：不要带dd。
      });

      dd.error(function (err) {
        alert('dd error: ' + JSON.stringify(err));
      })



    })
    return true;
  }
}
