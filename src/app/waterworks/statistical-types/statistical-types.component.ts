import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Icons, StatisticalTypes, SType } from '@shared/data/statistical-types.data';

@Component({
  selector: 'im-statistical-types',
  templateUrl: './statistical-types.component.html',
  styleUrls: ['./statistical-types.component.scss']
})
export class StatisticalTypesComponent implements OnInit {
  @Output() selectedTypeChange = new EventEmitter<SType>();
  @Input() selectedType: SType | null = null;

  statisticalTypes = StatisticalTypes
  icons: { [key: string]: any } = {};


  constructor(
    private domSanitizer: DomSanitizer,
  ) {
    for (const key in Icons) {
      this.icons[key] = this.domSanitizer.bypassSecurityTrustResourceUrl(Icons[key] as string)
    }
  }

  ngOnInit(): void { }

  select(type: SType) {
    this.selectedType = type;
    this.selectedTypeChange.next(this.selectedType);
  }
}
