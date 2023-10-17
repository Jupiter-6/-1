import { Component, OnInit } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
@Component({
  selector: 'im-bluetooth',
  templateUrl: './bluetooth.component.html',
  styleUrls: ['./bluetooth.component.scss']
})
export class BluetoothComponent implements OnInit {

  constructor(
    private readonly ble: BluetoothCore
  ) { }

  ngOnInit(): void {
  }
  pointerup(event: any) {
  
  }
  getDevice() {
   
  }
}
