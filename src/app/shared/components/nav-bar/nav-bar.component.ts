import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
interface RoutData {
  title?: string;
  icon?: string;
}
@Component({
  selector: 'im-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  /** 页面标题 */
  @Input() pageName: string = '';
  /** 路由默认标题 */
  routData: RoutData = {};

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe((data: RoutData) => {
        this.routData = data;
      });
  }
  backClicked() {
    // console.log('data?.firstPage = ', data?.firstPage);
    console.log('(window as any).javaobj = ', (window as any).javaobj);
    /** 修复在app中无法关闭的BUG */
    if ((window as any).javaobj) {
      (window as any).javaobj.goBack();
      // (window as any).javaobj.close();
    } else {
      this.location.back();
    }

  }



}
