import { Component, OnInit, TemplateRef } from '@angular/core';
import { BeOnDutyService } from '@shared/services/be-on-duty.service';
import { ItsysApiService } from '@shared/services/_itsys-api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { ProjectItemMap } from '@shared/data/inspection.data';
import { MessageService } from '@shared/components/message/message.service';
import { optionsToObject } from '@shared/utils/optionsToObj';

@Component({
  selector: 'im-dutylog-list',
  templateUrl: './dutylog-list.component.html',
  styleUrls: ['./dutylog-list.component.scss']
})
export class DutylogListComponent implements OnInit {

  content = '';

  files: any = [];

  title = '内容';

  modalRef?: BsModalRef;

  dataList: any = [];

  usermapPromise = this.itsysApiService.getUsers();
  officeObj = this.itsysApiService.officeQuery({}).toPromise().then(data => optionsToObject(data.items.map((i: any) => ({ label: i.name, value: i.id }))));
  constructor(
    private service: BeOnDutyService,
    private modalService: BsModalService,
    private messageService: MessageService,
    private itsysApiService: ItsysApiService,
  ) { }

  ngOnInit(): void {
    this.queryDutylog();
  }

  /** 查询值班日志 */
  queryDutylog() {
    const param = {
      criteria: [
      ]
    };
    this.service.queryDutylog(param).toPromise().then((res: any) => {
      if (res.code === '0') {
        this.dataList = res.items;
        this.usermapPromise.then((usermap: any) => {
          this.dataList.forEach((item: any) => {
            item.createtimestr = moment(item.createtime).format('yyyy-MM-DD HH:mm:ss');
            item.username = usermap[item.pubuserid].username || '';
            item.officeid = usermap[item.pubuserid].officeid;
          });
        });
      }
    });
  }

  /** 查询日志详情 */
  detail(log: any, template: TemplateRef<any>) {
    this.files = [];
    this.service.readDutylog({ item: { id: log.id } }).toPromise().then((res: any) => {
      if (res.code === '0') {
        this.content = res.item.content || '';
        res.item.parts.forEach((part: any) => {
          this.files.push({ name: part.name, edocid: part.edocid, path: part.path ? document.location.origin + part.path : null });
        });
        this.modalRef = this.modalService.show(template);
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
    // this.itsysApiService.requestData(file.edocid).toPromise().then((response: any) => {
    //   const blob = new Blob([response]);
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement('a') as HTMLAnchorElement;
    //   a.download = file.name;
    //   a.href = url;
    //   a.click();
    // });
  }

}
