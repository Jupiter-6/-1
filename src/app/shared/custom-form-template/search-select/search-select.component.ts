import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, of, Subscriber } from 'rxjs';
import { concatAll, filter, map, mergeMap, tap } from 'rxjs/operators';

export interface SearchOption {
  label: string;
  value: string;
}

@Component({
  selector: 'im-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss']
})
export class SearchSelectComponent extends FieldType implements OnInit {
  asyncSelected: string = '';
  dataSource: Observable<SearchOption[]>;
  constructor() {
    super();
    this.dataSource = new Observable((observer: Subscriber<string>) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    })
      .pipe(
        mergeMap((token: string) => this.getStatesAsObservable(token))
      );
  }
  ngOnInit(): void {
    this.getStatesAsObservable('').subscribe((data) => {
      const option = data.find(i => i.value === this.formControl.value);
      option && (this.asyncSelected = option.label);
    })
    this.formControl.valueChanges.subscribe((data) => {
      if (!data) {
        this.asyncSelected = '';
      }
    })
  }
  getStatesAsObservable(token: string): Observable<SearchOption[]> {
    const query = new RegExp(token, 'i');
    const isObservable = this.to.options instanceof Observable;
    if (isObservable) {
      return (this.to.options as Observable<SearchOption[]>).pipe(
        map(i => {
          return i.filter((item: SearchOption) => {
            return query.test(item.label);
          })
        })
      )
    }
    return new Observable(sub => {
      const option = (this.to.options as SearchOption[] || []).filter((item: SearchOption) => {
        return query.test(item.label);
      })
      sub.next(option);
    });
  }

  onSelect(event: TypeaheadMatch): void {
    this.formControl.setValue(event.item.value);
    this.to.change && this.to.change(this.field);
  }
  onblur() {
    setTimeout(() => {
      if (!this.asyncSelected) {
        this.formControl.setValue(null);
        this.to.change && this.to.change(this.field);
        this.formControl.markAllAsTouched();
      }
    });
  }
  get placeholder() {
    return this.to.placeholder || '请选择';
  }
  get disabled() {
    return this.to.disabled || false;
  }
  get typeaheadOptionsLimit() {
    return this.to.typeaheadOptionsLimit || 20;
  }
}
