import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BeOnDutyService } from '@shared/services/be-on-duty.service';
import { DatabaseService } from '@shared/services/_database.service';
import * as moment from 'moment';
import { MessageService } from '@shared/components/message/message.service';
import { GPS } from '@shared/utils/coordinate_transform';
import * as dd from 'dingtalk-jsapi';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from '@env/environment';

@Component({
  selector: 'im-dutyplan',
  templateUrl: './dutyplan.component.html',
  styleUrls: ['./dutyplan.component.scss']
})
export class DutyplanComponent implements OnInit, OnDestroy {
  modalRef?: BsModalRef;
  userid = '';
  /** 值班计划列表 */
  planList: any = [];
  /** 当前选中的值班计划 */
  curPlan: any = null;
  /** 0-上班打卡；1-下班打卡; 2-不可用 */
  status = 2;
  timer1: any = null;
  today = "";

  img_1 = environment.assets_prefix + '/assets/cmzassets/images/dutyplan-top.png'
  img_2 = environment.assets_prefix + '/assets/cmzassets/images/dutyplan-signIn.png'
  img_3 = environment.assets_prefix + '/assets/cmzassets/images/dutyplan-date.png'
  constructor(
    private service: BeOnDutyService,
    private databaseService: DatabaseService,
    private messageService: MessageService,
  ) { }
  ngOnDestroy(): void {
    clearInterval(this.timer1);
  }

  async ngOnInit(): Promise<void> {
    this.today = moment(new Date().getTime()).format("yyyy-MM-DD");
    this.userid = this.databaseService.user.id;
    // this.userid = '4568';
    await this.queryPlan();
    if (this.curPlan) {
      this.timer1 = setInterval(() => {
        this.planClick(this.curPlan);
      }, 1000);
    }
  }

  // 查询计划
  async queryPlan() {
    const param = {
      criteria: [
        {
          name: 'userid',
          value1: this.userid
        }
      ]
    };
    await this.service.queryPlan(param).toPromise().then((res) => {
      if (res.code === '0') {
        let arr: any = [];
        res.items.forEach((item: any, index: number) => {
          // 时间格式化
          item.today == moment(item.btime).format('HH:mm');
          item.btimestr = moment(item.btime).format('HH:mm');
          item.etimestr = moment(item.etime).format('HH:mm');
          item.bsignstr = item.bsign ? moment(item.bsign).format('HH:mm') : '-';
          item.esignstr = item.esign ? moment(item.esign).format('HH:mm') : '-';
          // 签到时间范围
          item.btimelimit = [moment(item.btime).subtract(1, 'hour').valueOf(), item.etime];
          // 签退时间范围
          item.etimelimit = [item.btime, moment(item.etime).add(2, 'hour').valueOf()];
          if (moment(item.date).format('yyyy-MM-DD') == this.today) {
            if (arr.length == 0) {
              arr.push(item);
            }
          }
        });
        this.planList = arr;

        if (this.planList.length) {
          console.log('list = ', this.planList);
          this.planClick(this.planList[0]);
        }
      }
    });
  }

  // 选中计划
  planClick(plan: any) {
    this.curPlan = plan;
    console.log('this.curPlan = ', this.curPlan);
    const now = moment().valueOf();
    // 计算状态
    // 到了上班时间还没打上班卡
    if (!plan.bsign && now >= plan.btimelimit[0]) {
      this.status = 0;
      return;
    }
    // 在下班打卡时间段内并且已经打了上班卡
    if (plan.bsign && now >= plan.etimelimit[0]) {
      this.status = 1;
      return;
    }
    // 不能打卡
    this.status = 2;
  }

  /** 打卡 */
  async sign() {
    let res: any;
    // 获取当前位置
    if ((window as any)?.javaobj) {
      res = (window as any)?.javaobj?.getgps();
      // alert(res);
      if (!res) {
        this.messageService.show({ type: 'warning', content: '未能获取当前位置信息' });
        return;
      }
      res = res.split(',');
      // alert(`res[0]=${res[0]},res[1]=${res[1]}`);
      // 转坐标系
      res = GPS.gcj_decrypt_exact(Number(res[1]), Number(res[0]));
      // alert(`x:${res.lat},y:${res.lon}`);
    }
    if (dd.env.platform !== 'notInDingTalk') {
      const data = await this.dd_geolocation_get()
      res = { lon: data.longitude, lat: data.latitude }
    }
    // return;
    // // 判断与打卡位置距离
    const pos1 = [this.curPlan.positionx, this.curPlan.positiony];
    const pos2 = [res.lon, res.lat];
    const distance = Math.ceil(this.calculateDistance(pos1, pos2));
    // alert(`distance = ${distance}`);
    // console.log('distance = ', distance);
    if (distance > this.curPlan.limitdist) {
      this.messageService.show({ type: 'warning', content: `不在打卡范围内，${distance}>${this.curPlan.limitdist}` });
      return;
    }

    const param = {
      item: {
        // planid: this.curPlan.id,
        userid: this.userid,
        positionx: null as any,
        positiony: null as any,
        id: this.curPlan.signid,
        // signid: this.planList[0].id;
      },
      reqExtends: {
        time: moment().format('yyyy-MM-DD HH:mm:ss')
      }
    };
    if (this.status) {
      // 下班打卡
      this.service.esign(param).toPromise().then((res: any) => {
        if (res.code === '0') {
          this.messageService.show({ type: 'success', content: '打卡成功' });
          this.queryPlan();
        }
      });
    } else {
      // 上班打卡
      param.item.positionx = pos2[0];
      param.item.positiony = pos2[1];
      this.service.bsign(param).toPromise().then((res: any) => {
        if (res.code === '0') {
          if (this.curPlan.signtime) {
            this.messageService.show({ type: 'success', content: '打卡时间已更新' });
          } else {
            this.messageService.show({ type: 'success', content: '打卡成功' });
          }
          this.queryPlan();
        }
      });
    }
  }

  /** 计算两点之间距离 */
  calculateDistance(pos1: any, pos2: any) {
    // 根据经纬度，计算2点之间的直线距离。
    // 距离较近的场景，可以使用，误差较小。
    // 距离较远的场景，要考虑具体的业务场景。
    // 因为这个只是计算直线距离，和实际的路线不同，所以要结合场景，看是否适用
    // 地球半径（这里取的是平均半径）
    const EARTH_RADIUS = 6.371229 * 1e6;
    // 益乐坐标点 120.10621905326843,30.285422801971436
    const x = (pos2[1] - pos1[1]) * Math.PI * EARTH_RADIUS * Math.cos(((pos1[0] + pos2[0]) / 2) * Math.PI / 180) / 180;
    const y = (pos1[0] - pos2[0]) * Math.PI * EARTH_RADIUS / 180;
    return Math.hypot(x, y);
  }
  /** 钉钉环境获取坐标 */
  dd_geolocation_get() {
    return new Promise<{
      longitude: number,
      latitude: number,
    }>((resolve) => {
      dd.ready(function () {
        dd.device.geolocation.get({
          targetAccuracy: 200,
          coordinate: 0,
          withReGeocode: false,
          useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
          onSuccess: (result: any) => {
            resolve(result)
          },
          onFail: (err: any) => {
            alert(JSON.stringify(err))
          }
        } as any);
      });
    })
  }
}
