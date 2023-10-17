import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'im-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {

  @Input() item: any = {};

  @Input() key_head: any = {};

  heads: string[] = [];

  keys: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.keys = Object.keys(this.key_head);
    this.heads = Object.values(this.key_head);
  }

}
