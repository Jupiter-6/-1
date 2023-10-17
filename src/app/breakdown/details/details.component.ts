import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreakdownService } from '../breakdown.service';

@Component({
  selector: 'im-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  itemid = '';

  model = null;
  constructor(
    private activatedRouter: ActivatedRoute,
    private service: BreakdownService,
  ) { }

  ngOnInit(): void {
    this.itemid = this.activatedRouter.snapshot.params.itemid;
    this.getEventItem();
  }

  /** 获取详情 */
  async getEventItem(): Promise<any> {
    const params = {
      item: { id: this.itemid }
    };
    await this.service.getEvent(params).then((data) => {
      this.model = data;
    });
  }

}
