import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MaintenancePart } from '@shared/entities/maintenance.type';
import { Maintenance } from '@shared/entities/database.type';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { MaintenanceService } from '../../maintenance.service';
@Component({
  selector: 'im-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.scss']
})
export class PartsListComponent implements OnInit {
  @Input() pagestatus = 'edit';
  item: any = null;
  showWebcam = false;
  data: Array<MaintenancePart> = [];
  willChangePart: MaintenancePart = {};
  modalRef?: BsModalRef;
  action = '';
  editIndex = 0;

  constructor(
    private modalService: BsModalService,
    private routeInfo: ActivatedRoute,
    private service: MaintenanceService,
  ) { }

  ngOnInit(): void {
    // 判断路由参数中是否有页面状态
    const pagestatus = this.routeInfo.snapshot.queryParams.pagestatus;
    if (pagestatus) {
      this.pagestatus = pagestatus;
    }
    // 获取itemid 读取数据库
    const itemid = this.routeInfo.snapshot.params.id;
    // 从本地获取数据
    this.item = this.service.getItem(itemid);
    if (this.item && typeof(this.item.parts) === 'object') {
      this.data = this.item.parts;
    } else {
      // 根据itemid调用接口获取数据
      const params = {
        criteria: [{
          name: 'maintenanceid',
          value1: itemid
        }]
      };
      this.service.getPart(params).then((datas) => {
        this.data = datas.map((i) => ({
          partname: i.partname,
          unitname: i.unitname,
          quantity: i.quantity,
          remark: i.remark
        }));
      });
    }
  }
  startCamera() {
    this.showWebcam = true;
    this.willChangePart = {};
    this.action = 'add';
  }
  onSeclected(part: MaintenancePart) {
    if (this.action === 'add') {
      this.data.unshift({ ...part, itemid: this.item.id });
    } else {
      this.data[this.editIndex] = { ...part };
    }
    this.synDatabase();
  }
  openModal(part: MaintenancePart, index: number) {
    this.willChangePart = JSON.parse(JSON.stringify(part));
    this.showWebcam = true;
    this.action = 'edit';
    this.editIndex = index;
  }
  openDeleteModal(template: TemplateRef<any>, part: MaintenancePart, index: number) {
    this.willChangePart = { ...part };
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
    this.editIndex = index;
  }
  confirm(): void {
    this.modalRef?.hide();
    this.data.splice(this.editIndex, 1);
    this.synDatabase();
  }

  decline(): void {
    this.modalRef?.hide();
  }

  /** 同步数据 */
  synDatabase(): void {
    this.item = {
      ...this.item,
      parts: this.data
    };
    this.service.id_itemdetil_map[this.item.id] = this.item;
  }
}
