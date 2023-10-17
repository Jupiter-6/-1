import { Component, Input, OnInit } from '@angular/core';
import { Inspection, InspectionDevice } from '@shared/entities/database.type';

@Component({
  selector: 'im-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit {
  @Input() item = {} as InspectionDevice;
  @Input() inspection = {} as Inspection;

  constructor() { }

  ngOnInit(): void {  }
}
