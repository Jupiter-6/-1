import { Component, OnInit } from '@angular/core';
import { LazyService } from '@delon/util';
import { environment } from '@env/environment';

declare const zhouliutong: any;

@Component({
  selector: 'im-lazy-load',
  templateUrl: './lazy-load.component.html',
  styleUrls: ['./lazy-load.component.scss']
})
export class LazyLoadComponent implements OnInit {
  zhouliutong: string = '';
  constructor(
    private lazy: LazyService,
  ) { }

  ngOnInit(): void { }

  lazyLoad() {
    this.lazy.load([environment.assets_prefix + `/assets/js/lazy.js`]).then(() => {
      this.zhouliutong = zhouliutong.name + zhouliutong.getZhouLiutongAge();
    });
  }
}
