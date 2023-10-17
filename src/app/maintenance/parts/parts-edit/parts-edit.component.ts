import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MaintenancePart } from '@shared/entities/maintenance.type';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'im-parts-edit',
  templateUrl: './parts-edit.component.html',
  styleUrls: ['./parts-edit.component.scss']
})
export class PartsEditComponent implements OnInit, OnChanges {
  @ViewChild(ModalDirective) modal!: ModalDirective;
  @ViewChild(FormGroupDirective) form!: FormGroupDirective;
  // toggle webcam on/off
  @Input() show = false;
  @Input() model?: MaintenancePart = {};
  @Output() showChange = new EventEmitter<boolean>();
  @Output() onSeclected = new EventEmitter<MaintenancePart>();

  formGroup: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      key: 'partname',
      type: 'input',
      templateOptions: {
        label: '配件名称',
        placeholder: '输入配件名称',
        required: true,
      }
    },
    {
      key: 'unitname',
      type: 'input',
      templateOptions: {
        label: '配件单位',
        placeholder: '输入配件单位',
        required: true,
      }
    },
    {
      key: 'quantity',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: '配件数量',
        placeholder: '输入配件数量',
        required: true,
      }
    },
    {
      key: 'remark',
      type: 'textarea',
      templateOptions: {
        label: '备注',
        placeholder: '请输入备注',
        required: false,
        rows: 5
      },
    },
  ];


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    const { show } = changes;
    if (show && show.currentValue) {
      this.modal.show();
    }
  }
  ngOnInit(): void { }

  onHidden() {
    this.show = false;
    this.showChange.emit(false);
    this.modal.hide();
    this.form.resetForm();
  }
  onSubmit(model: any) {
    if (this.form.invalid) {
      return false;
    }
    this.onSeclected.emit({
      ...model,
      id: new Date().getTime(),
      partno: '',
      unitno: '',
      itemid: '',
      status: 0
    });
    this.onHidden();
    return true;
  }
}
