import { Component, OnInit } from '@angular/core';
import { CacheService } from '@delon/cache';

@Component({
  selector: 'im-cache',
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.scss']
})
export class CacheComponent implements OnInit {
  value: any = '';
  constructor(
    private cacheService: CacheService,
  ) { }

  ngOnInit(): void { }

  getByHttp(): void {
    this.cacheService.get(`https://randomuser.me/api/?results=1&_allow_anonymous`).subscribe((res: any) => {
      this.value = res;
    });
  }

  clear() {
    this.value = '';
  }

  go() {
    window.open('https://ng-alain.com/cache/service/zh');
  }
}
