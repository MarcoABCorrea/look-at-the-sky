import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherIconService } from '@services/weatherIcon/weather-icon.service';
import { Widget } from './widget.model';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
})
export class WidgetComponent implements OnChanges {
  isImageLoading: boolean = true;
  icon: any;

  @Input()
  data: Widget;

  constructor(private weatherIconService: WeatherIconService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateData(changes.data.currentValue);
  }

  updateData(widget: Widget) {
    this.data = widget;

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
