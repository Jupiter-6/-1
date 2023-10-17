import { ApplicationRef, Component, DoCheck, EventEmitter, Input, IterableDiffers, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ResourceUrl } from '@shared/entities/inspection.type';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxViewerDirective } from 'ngx-viewer';
/**
 * 部分组件引用同一个 photo-list 组件实例，会导致多媒体功能失效，因此创建一个新的 photo-list 组件实例
 */
@Component({
  selector: 'multi-media-photo-list-new',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListNewComponent implements OnInit, DoCheck {
  @ViewChild(NgxViewerDirective) imageViewer!: NgxViewerDirective;
  @Input() data: Array<ResourceUrl> = [];
  @Input() disabled: boolean = false; // 列表禁用
  @Output() ondelete = new EventEmitter<ResourceUrl>();

  iterableDiffer: any
  willCleanImg!: ResourceUrl;

  form = new FormGroup({});
  model = { remark: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'remark',
      type: 'textarea',
      templateOptions: {
        label: '图片备注',
        placeholder: '输入图片备注',
        required: false,
        rows: 5
      },
    }
  ];

  constructor(
    private iterableDiffers: IterableDiffers,
    private appRef: ApplicationRef,
  ) {
    this.iterableDiffer = this.iterableDiffers.find([]).create();
  }
  /** 脏检查数组数据 */
  ngDoCheck(): void {
    let changes = this.iterableDiffer.diff(this.data);
    if (changes && this.imageViewer) {
      setTimeout(() => {
        this.imageViewer.instance.update();
      });
    }
  }

  ngOnInit(): void { }
  initFields() {
    this.fields = [
      {
        key: 'remark',
        type: 'textarea',
        templateOptions: {
          label: '图片备注',
          placeholder: '输入图片备注',
          required: false,
          rows: 5
        },
      }
    ]
  }
  openModal(modal: ModalDirective, image: ResourceUrl) {
    this.model.remark = image.remark || '';
    this.initFields();
    this.willCleanImg = image;
    modal.show();
  }
  openDeleteModal(modal: ModalDirective, image: ResourceUrl) {
    this.willCleanImg = image;
    modal.show();
  }

  onSubmit(modal: ModalDirective, model: any) {
    if (this.form.invalid) { return false; }
    this.willCleanImg.remark = model.remark;
    modal.hide();
    return true;
  }

  confirm(modal: ModalDirective): void {
    modal.hide();
    this.ondelete.emit(this.willCleanImg);
    setTimeout(() => {
      this.appRef.tick();
    });
  }

  decline(modal: ModalDirective): void {
    modal.hide();
  }
}
