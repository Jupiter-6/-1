import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { BeOnDutyService } from '@shared/services/be-on-duty.service';
import { DatabaseService } from '@shared/services/_database.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { MessageService } from '@shared/components/message/message.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'im-dutylog-add',
  templateUrl: './dutylog-add.component.html',
  styleUrls: ['./dutylog-add.component.scss']
})
export class DutylogAddComponent implements OnInit {

  @ViewChild('file') private fileContainer!: ElementRef;

  filename: any = '';

  edocs: any = [];

  userid = '';

  userList: any = [];

  selectedDate = new Date();

  selectedTime = new Date();
  notice = ''
  dateOfReport = ''
  noticeOption = []
  dateOfReportOption = []
  summaryList = [
    { label: '正常', value: 1 },
    { label: '异常', value: 0 },
  ];

  summary = 1;

  content = '';
  user: any = {
  };
  usermapPromise = this.itsysApiService.getUsers();

  constructor(
    private itsysApiService: ItsysApiService,
    private databaseService: DatabaseService,
    private service: BeOnDutyService,
    private messageService: MessageService,
    private bsLocaleService: BsLocaleService,
    private http: HttpClient
  ) {
    this.bsLocaleService.use('zh-cn');
  }

  async ngOnInit() {
    this.userid = this.databaseService.user.id;
    this.user = JSON.parse(JSON.stringify(this.databaseService.user))
    console.log("user", this.databaseService.user);
    this.usermapPromise.then((usermap: any) => {
      const list: any = [];
      Object.keys(usermap).forEach((id: string) => {
        list.push({ label: usermap[id].username, value: id });
      });
      this.userList = list;
    });
    const stime = moment(new Date).format('yyyy') + '-01-01'
    const etime = moment(new Date).format('yyyy') + '-12-31'
    const res = await this.service.getNotificationList({ criteria: [{ name: 'btime', value1: stime, value2: etime }] }).toPromise()
    this.noticeOption = res.items.map((item: any) => ({ ...item, label: item.name, value: item.id }));
    this.notice = this.noticeOption[0]['value']
    const data = await this.service.getmMayPlantolog({ criteria: [{ name: 'adviceid', value1: this.notice }] }).toPromise()
    this.dateOfReportOption = data.items.map((item: any) => ({ label: moment(item.date).format('YYYY-MM-DD'), value: item.planid }))
    this.dateOfReport = this.dateOfReportOption.length ? this.dateOfReportOption[0]['value'] : '';
  }

  add() {
    if (!this.dateOfReport) {
      this.messageService.show({ content: '报告时间不能为空', type: 'warning' });
      return;
    }
    if (!this.content) {
      this.messageService.show({ content: '日志内容不能为空', type: 'warning' });
      return;
    }
    this.service.creatLog({}).toPromise().then((res: any) => {
      if (res.code === '0') {
        const obj = res.item;
        obj.content = this.content;
        obj.summary = this.summary;
        obj.adviceid = this.notice
        obj.planid = this.dateOfReport
        // 拼接日期和时间
        console.log("dateOfReportOption")
        const a = (this.dateOfReportOption as any).find((i: any) => i.value === this.dateOfReport).label
        const date = moment(a).format('yyyy-MM-DD ');
        const time = moment(this.selectedTime).format('HH:mm:ss');
        const pubdate = moment(`${date} ${time}`).valueOf();
        const createtime = moment().valueOf();
        obj.createtime = createtime;
        obj.createuser = this.userid;
        obj.pubdate = moment(pubdate).valueOf();
        obj.pubofficeid = this.user.officeid;
        obj.pubuserid = this.userid;
        obj.edocids = this.edocs.map((item: any) => item.id).join(',');
        this.service.insertLog({ item: obj }).toPromise().then((res1: any) => {
          if (res1.code === '0') {
            this.messageService.show({ content: '上报成功', type: 'success' });
            this.selectedDate = new Date();
            this.selectedTime = new Date();
            this.summary = 1;
            this.content = '';
            this.edocs = [];
          }
        });
      }
    });
  }
  
// 这段代码主要执行了一些日志添加的操作，下面是其主要功能的概述：

// 这是一个方法定义，名称为 add，没有参数。

// 如果没有定义变量 this.dateOfReport 或 this.content，则通过 this.messageService.show 显示一个警告信息，并结束运行。

// this.service.creatLog({}) 创建一个日志，如果创建成功，服务器响应返回的码 res.code 为'0'。

// 如果日志创建成功，获取到日志对象 res.item，并为其添加一些必要的属性。

// 使用 moment 方法拼接日期和时间，生成 pubdate（发布日期）和 createtime（创建日期）。

// 添加发布信息，包括发布者id(pubuserid)，发布者机构id(pubofficeid)。

// 提取文档id(edocids)，作为日志的一个属性。

// 调用 this.service.insertLog 方法，将这个日志对象插入数据库。

// 如果插入成功，再次通过 this.messageService.show 显示一个成功的信息，并清空一些变量，以便于下一次添加日志。

// 注意：整个方法的结果依赖于异步操作(toPromise())的结果，因此它的执行是非阻塞的。

  /** 选择文件后上传，得到filetoken,再获取edocid */
  async inputChange(e: Event) {
    const input: HTMLInputElement = e.target as any;
    const files: any = input.files;
    if (!files?.length) {
      return;
    }
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      const item = {
        name: files[i].name,
        file: files[i],
        res: null as any,
      };
      const res = await this.upload(item);
      if (!res) {
        return;
      }
      this.getEdocid(res.filetoken, item);
    }
    // this.file = files.map((item: any) => item.name).join(',');
    // files.forEach(async (file: any) => {

    // });
  }

  /**
   * 上传文件,成功返回一个对象
   */
  async upload(item: any) {
    const formdata = new FormData();
    formdata.append('file', item.file, item.name);
    const res: any = await this.http
      .post('/server/itsys/fileupload/upload.api', formdata)
      .toPromise()
      .catch((rej) => {
        return null;
      });
    if (res) {
      this.filename = null;
      return res.item;
    } else {
      return null;
    }
  }

  /** 获取edocid */
  getEdocid(token: string, item: any) {
    const param = {
      item: {
        filetoken: token
      }
    };
    this.service.getEdocid(param).subscribe((res: any) => {
      if (res.code === '0') {
        this.edocs.push({ id: res.item.id, name: item.name });
      }
    });
  }

  /** 触发选择文件 */
  addFile() {
    this.fileContainer.nativeElement.click();
  }

  /** 删除文件 */
  del(doc: any) {
    const index = this.edocs.findIndex((item: any) => item.id === doc.id);
    if (index !== -1) {
      this.edocs.splice(index, 1);
    }
  }

  onValueChange(e: any) {
    // 填入错误日期时，设置为默认值
    const tmp = moment(e).format('yyyy-MM-DD');
    if (tmp === 'Invalid date') {
      setTimeout(() => {
        this.selectedDate = new Date();
      }, 300);
    }
  }
  async dutynoticeChang() {
    const data = await this.service.getmMayPlantolog({ criteria: [{ name: 'adviceid', value1: this.notice }] }).toPromise()
    this.dateOfReportOption = data.items.map((item: any) => ({ label: moment(item.date).format('YYYY-MM-DD'), value: item.planid }))
    this.dateOfReport = this.dateOfReportOption.length ? this.dateOfReportOption[0]['value'] : '';
  }
}
