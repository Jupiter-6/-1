import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ResourceUrl } from '@shared/entities/inspection.type';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'multi-media-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss']
})
export class AudioListComponent implements OnInit {
  @Input() data: Array<ResourceUrl> = [];
  @Input() disabled: boolean = false; // 列表禁用
  @Output() ondelete = new EventEmitter<ResourceUrl>();

  willCleanImg!: ResourceUrl;
  modalRef?: BsModalRef;
  options = {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume']
  }
  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>, image: ResourceUrl) {
    this.model.remark = image.remark || '';
    this.willCleanImg = image;
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
  }

  openDeleteModal(modal: ModalDirective, image: ResourceUrl) {
    this.willCleanImg = image;
    modal.show();
  }

  form = new FormGroup({});
  model = { remark: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'remark',
      type: 'textarea',
      templateOptions: {
        label: '音频备注',
        placeholder: '输入音频备注',
        required: false,
        rows: 5
      },
    }
  ];

  onSubmit(model: any) {
    if (this.form.invalid) { return false; }
    this.willCleanImg.remark = model.remark;
    this.modalRef?.hide();
    return true;
  }

  confirm(modal: ModalDirective): void {
    modal.hide();
    this.ondelete.emit(this.willCleanImg);
  }

  decline(modal: ModalDirective): void {
    modal.hide();
  }
}
