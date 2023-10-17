import { Component, OnDestroy, OnInit } from '@angular/core';
import { deepCopy } from '@delon/util';
import { Inspection } from '@shared/entities/database.type';
import { InspectionApiService } from '@shared/services/inspection-api.service';
import { DatabaseService } from '@shared/services/_database.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InspectionService } from '../inspection.service';
import { MessageService } from '@shared/components/message/message.service';

@Component({
  selector: 'im-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.scss']
})
export class UploadingComponent implements OnInit, OnDestroy {
  list: Inspection[] = [];
  destroy = new Subject();
  willSyncItem: Inspection = {} as Inspection;
  synchronising: boolean = false;
  constructor(
    private inspectionService: InspectionService,
    private databaseService: DatabaseService,
    private inspectionApiService: InspectionApiService,
    private messageService: MessageService
  ) { }

  /** 读取数据库 */
  readDatabase() {
    this.list = Object.values(this.databaseService.read<Inspection>('inspection') || {});
  }
  /** 手动更新数据 */
  manualUpdateData(item: Inspection) {
    const data = this.list.find(i => i.id === item.id);
    data!.detail = deepCopy(item.detail);
    data!.loading = item.loading;
  }
  ngOnInit(): void {
    this.readDatabase();
    this.inspectionService.uploadSucess
      .pipe(takeUntil(this.destroy))
      .subscribe((data) => {
        console.log('上传成功');
        this.manualUpdateData(data); // 更新数据
      })
  }
  ngOnDestroy(): void {
    this.destroy.next()
  }
  upload(item: Inspection) {
    this.inspectionService.upload(item);
  }
  openModal(modal: ModalDirective, item: Inspection) {
    modal.show();
    this.willSyncItem = item;
  }

  syncSequential(modal: ModalDirective) {
    this.synchronising = true;
    const { id, pdclassno } = this.willSyncItem;
    this.inspectionApiService
      .itemTaskSort({
        reqExtends: { routetaskid: id, pdclassno },
        item: {}
      })
      .subscribe((data) => {
        this.synchronising = false;
        modal.hide();
        if (data.code === '0') {
          this.messageService.show({
            type: 'success',
            content: '顺序同步成功!'
          })
        }
      })
  }
}
