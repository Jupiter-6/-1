import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'im-details-navbar',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsNavBarComponent implements OnInit {
  @Input() title = '';
  houseid: string = '';
  NavBarList = [
    { name: '运行', link: '/monitoring/house-runing/' },
    { name: '数据', link: '/monitoring/real-time-data/' },
    { name: '运维', link: '/monitoring/inspection-records/' },
    { name: '档案', link: '/monitoring/house-records/' },
    { name: '位置', link: '/monitoring/house-location/' },
  ]

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe((data: any) => {
        this.houseid = data.params.houseid
      })
  }
}
