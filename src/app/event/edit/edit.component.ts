import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UppyFile } from '@uppy/core';
import { ResourceUrl } from '@shared/entities/inspection.type';
import { MessageService } from '@shared/components/message/message.service';
import { EventService } from '../event.service';
@Component({
  selector: 'im-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  @Input() model: any = {};
  @Input() pagestatus = 'edit';
  @Input() picList: Array<ResourceUrl> = [];
  @Output() picListChange = new EventEmitter(); // 表单变更
  @Output() modelChange = new EventEmitter(); // 表单变更
  @Output() addSucess = new EventEmitter(); // 通知列表刷新

  showWebcam = false;
  /** 表单状态 */
  options: FormlyFormOptions = {
    formState: {
      disabled: true, // 全部不可编辑
    },
  };

  loading = false;
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];

  constructor(
    private domSanitizer: DomSanitizer,
    private messageService: MessageService,
    private service: EventService,
  ) { }

  ngOnInit(): void {
    this.options.formState.disabled = (this.pagestatus === 'read');
    // 初始化表单
    this.fields = this.service.initFields(this.pagestatus, this.model);
    if (this.model.id) {
      this.getPic(); // 执行查询图片方法
    }
  }

  /** 表单变更，自动保存 */
  formChange(model: any) {
    this.modelChange.emit(model);
  }

  async onSubmit(model: any) {
    this.loading = true;
    model.dmanodes = this.service.dmaid_item_map[model.dmaid].dmanodes;
    if (this.service.facMap[model.factoryid]) {
      model.stationcls = 'factory';
    } else {
      model.stationcls = 'station';
    }
    await this.service.upload(model, this.picList).then((bool) => {
      if (bool !== true) {
        this.messageService.show({ content: '错误', type: 'danger' });
        return;
      } else {
        this.messageService.show({ content: '上传成功', type: 'success' });
        this.formDirective.resetForm();
        this.picList = [];
        this.addSucess.next()
      }
    });
    this.loading = false;
  }

  /** 查询图片 */
  getPic() {
    this.service.querybyentity({
      criteria: [{
        name: 'tablename',
        value1: 'sda_event'
      }, {
        name: 'entityid',
        value1: `${this.model.id}`
      }]
    }).then((items) => {
      const edocids = items.map((item: any) => (item.id));
      edocids.forEach((id: string) => {
        this.service.getUrl(id).then((itemurl) => {
          this.picList.push({
            url: itemurl,
            remark: '',
            name: new Date().toString()
          });
        });
      });
    });
  }

  startCamera() {
    this.showWebcam = true;
  }
  onSeclected(event: {
    [key: string]: UppyFile<any>
  }) {
    const source = URL.createObjectURL(Object.values(event)[0].data);
    let url = this.domSanitizer.bypassSecurityTrustResourceUrl(source);
    this.picList.unshift({
      url,
      remark: '',
      name: new Date().getTime().toString() + '.png'
    });
    this.picListChange.emit(this.picList);
  }

  /** 删除照片 */
  deletePic(item: any): void {
    this.picList.splice(this.picList.findIndex(i => item.name === i.name), 1);
    this.picListChange.emit(this.picList);
  }

}
