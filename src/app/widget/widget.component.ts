import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherIconService } from '@services/weatherIcon/weather-icon.service';
import * as moment from 'moment';
import { Widget } from './widget.model';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnChanges {
  isImageLoading: boolean = true;
  date: string;
  icon: any;

  @Input()
  data: Widget;

  private static DATE_FORMAT = 'dddd, MMMM DD, LT';
  constructor(private weatherIconService: WeatherIconService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateData(changes.data.currentValue);
  }

  updateData(widget: Widget) {
    this.data = widget;
    this.date = moment()
      .utcOffset(widget.timezone / 60)
      .format(WidgetComponent.DATE_FORMAT);

    this.weatherIconService.getIcon(widget.icon).subscribe(
      (data: Blob) => {
        this.createImageFromBlob(data);
      },
      null,
      () => (this.isImageLoading = false),
    );
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.icon = reader.result;
      },
      false,
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
