import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
@Component({
  selector: 'im-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  model: any = null;

  constructor(
    private activatedRouter: ActivatedRoute,
    private service: EventService,
  ) { }

  ngOnInit(): void {
    this.model = this.service.curItem;
    console.log('123')
  }



}
