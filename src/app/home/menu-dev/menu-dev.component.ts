import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { accordionGroup } from '@shared/data/accordion-group.data';
import { AccordionGroup } from '@shared/entities/accordion-group.type';
import { DatabaseService } from '@shared/services/_database.service';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'im-dev-menu',
  templateUrl: './menu-dev.component.html',
  styleUrls: ['./menu-dev.component.scss']
})
export class MenuDevComponent implements OnInit {
  /** With animation */
  isAnimated: boolean = true;
  /** Open only one at a time */
  closeOthers: boolean = true;
  accordionGroup: AccordionGroup[] = [];
  openedIndex?: number;
  environment = environment;
  app = {} as any;
  constructor(
    private homeService: HomeService,
    private httpClient: HttpClient,
    private databaseService: DatabaseService
  ) {
    this.openedIndex = homeService.openedIndex;
  }

  ngOnInit() {
    const appStr = localStorage.getItem('app');
    if (appStr) { this.app = JSON.parse(appStr); }
    if (!environment.production) {
      this.accordionGroup = accordionGroup;
      return false;
    }
    this.httpClient.get<AccordionGroup[]>('assets/data/menu-data.json')
      .subscribe((accordionGroup) => {
        this.accordionGroup = accordionGroup;
      })
    
    return true;
  }

  isOpenChange(open: boolean, index: number): void | boolean {
    if (!open) { return false };
    this.setIndex(index);
  }
  setIndex(index: number) {
    this.openedIndex = index;
    this.homeService.openedIndex = index;
  }
  goChat() {
    const { id, token } = this.databaseService.user;
    window.location.replace(`${this.app.chat_address}?token=${token}&userid=${id}`);
  }
}
