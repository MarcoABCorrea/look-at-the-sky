import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Subscription, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'current-date',
  template: `<div class="current-date">
    {{ formattedDate }}
  </div> `,
})
export class CurrentDateComponent implements OnChanges {
  static DATE_FORMAT = 'dddd, MMMM DD, HH:mm:ss';
  formattedDate: string;
  subscription: Subscription;

  @Input()
  timezone: number;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTime(changes.timezone.currentValue);
  }

  updateTime(timezone: number) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = timer(0, 1000)
      .pipe(
        map(() =>
          moment()
            .utcOffset(timezone / 60)
            .format(CurrentDateComponent.DATE_FORMAT),
        ),
      )
      .subscribe((date) => (this.formattedDate = date));
  }
}
