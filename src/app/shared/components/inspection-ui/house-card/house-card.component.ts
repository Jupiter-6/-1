import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InspectionHouse } from '@shared/entities/database.type';

@Component({
  selector: 'im-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss']
})
export class HouseCardComponent implements OnInit {
  @Input() item = {} as InspectionHouse;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }
  go(event: MouseEvent) {
    event.stopPropagation();
    const { house_name, house_positionx, house_positiony } = this.item;
    this.router.navigate([`/inspection/pump-house/location`], {
      queryParams: {
        name: house_name, x: house_positionx, y: house_positiony
      }
    });
  }
}
