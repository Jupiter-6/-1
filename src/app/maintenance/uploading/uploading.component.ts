import { Component, OnInit } from '@angular/core';
import { MessageService } from '@shared/components/message/message.service';
import { uploadingItemList } from '@shared/data/maintenance.data';
import { UploadingEntity } from '@shared/entities/maintenance.type';
import { MaintenanceService } from '../maintenance.service';
@Component({
  selector: 'im-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.scss']
})
export class UploadingComponent implements OnInit {
  loading = false;

  /** 页面数据 */
  itemList: any[] = [];

  constructor(
    private service: MaintenanceService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  /** 读取页面数据 */
  getList(): void {
    const allData = Object.values(this.service.getAlldata());
    const list = allData.filter((item: any) => item.finished && !item.uploaded);
    this.itemList = JSON.parse(JSON.stringify(list));
  }

  /** 上传 */
  async upload(item: any): Promise<void> {
    item.uploading = true;
    try {
      await this.service.upload(item).then((bool) => {
        if (bool !== true) {
          // this.messageService.show({ content: '错误', type: 'danger' });
          return;
        } else {
          item.uploaded = true;
          // 删除缓存
          this.service.itemid_form_map[item.id] = null;
        }
      });
    } catch (error) {

    } finally {
      item.uploading = false;
    }

  }

  /** 全部上传 */
  uploadAll(): void {
    this.itemList.forEach((item: any) => {
      if (!item.uploaded) {
        this.upload(item);
      }
    });
  }

}
