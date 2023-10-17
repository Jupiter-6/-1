import { Component, Input, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
export interface FactoryInfo {
  name: string;
  value: string;
  unit: string;
  detail?: FactoryInfo[];
}
@Component({
  selector: 'im-factory-info-card',
  templateUrl: './factory-info-card.component.html',
  styleUrls: ['./factory-info-card.component.scss']
})
export class FactoryInfoCardComponent implements OnInit {
  @Input() clickable: boolean = false;
  @Input() data: any = {};

  status = [true, true, true, false, false, false];
  modalData?: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
    
   }

  showModal(event: MouseEvent, item: any, modal: ModalDirective) {
    event.stopPropagation();
    if (item.sensornos?.length > 1) {
      this.modalData = item;
      modal.show();
    }
  }
  close(event: MouseEvent, modal: ModalDirective) {
    event.stopPropagation();
    modal.hide();
  }
}
