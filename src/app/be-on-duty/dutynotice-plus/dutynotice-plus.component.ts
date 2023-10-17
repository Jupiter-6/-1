import { Component, OnInit, TemplateRef } from '@angular/core';
import * as moment from 'moment';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { BeOnDutyService } from '@shared/services/be-on-duty.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from '@shared/components/message/message.service';
import { optionsToObject } from '@shared/utils/optionsToObj';

@Component({
  selector: 'im-dutynotice',
  templateUrl: './dutynotice-plus.component.html',
  styleUrls: ['./dutynotice-plus.component.scss']
})
export class DutynoticePlusComponent implements OnInit {

  files: any = [];

  modalRef?: BsModalRef;

  dataList: any = [];

  usermapPromise = this.itsysApiService.getUsers();
  officeObj = this.itsysApiService.officeQuery({}).toPromise().then(data => optionsToObject(data.items.map((i: any) => ({ label: i.name, value: i.id }))));
  
  noticeContent = '';

  curNoticeName = '';

  constructor(
    private service: BeOnDutyService,
    private itsysApiService: ItsysApiService,
    private modalService: BsModalService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.queryTableData();
  }

  queryTableData() {
    const param = {
      criteria: [{ name: "status", value1: 1 }]
    };
    this.service.queryDutyadvice(param).toPromise().then((res: any) => {
      if (res.code === '0') {
        this.dataList = res.items;
        this.usermapPromise.then((usermap: any) => {
          this.dataList.forEach((data: any) => {
            data.createtimestr = moment(data.createtime).format('yyyy-MM-DD HH:mm:ss');
            data.username = usermap[data.pubuserid].username || '';
          });
        });
      }
    });
  }

  /** 查询公告详情 */
  detail(notice: any, template: TemplateRef<any>) {
    this.files = [];
    this.curNoticeName = notice.name;//notice.name是不同消息的name
    this.service.readAdvice({ item: { id: notice.id } }).toPromise().then((res: any) => {
      if (res.code === '0') {
        this.noticeContent = res.item.content || '';
        res.item.parts.forEach((part: any) => {
          this.files.push({ name: part.name, edocid: part.edocid, path: part.path ? document.location.origin + part.path : null });
        });
        console.log(this.noticeContent)
        this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
      }
    });
  }

  download(file: any) {
    if (!file.path) {
      this.messageService.show({ content: '没有找到文件路径', type: 'warning' });
      return;
    }
    const a = document.createElement('a') as HTMLAnchorElement;
    a.download = file.name;
    a.href = file.path;
    a.click();
  }

}
