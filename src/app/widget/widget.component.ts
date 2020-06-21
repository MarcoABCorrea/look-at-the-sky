import { Component, OnInit } from '@angular/core';
import { IconService } from '@services/icon/icon.service';
import * as moment from 'moment';
import { Widget } from './widget.model';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {
  countries = require('@mockData/CountriesISO.json');
  isImageLoading: boolean = true;
  prefix: string = 'flag-icon-';
  country: string;
  flag: string;
  date: string;
  icon: any;
  data: Widget;

  private static DATE_FORMAT = 'dddd, MMMM DD, LT';
  constructor(private iconService: IconService) {}

  ngOnInit(): void {}

  updateData(widget: Widget) {
    this.data = widget;
    this.date = moment()
      .utcOffset(widget.timezone / 60)
      .format(WidgetComponent.DATE_FORMAT);

    this.country = this.countries[widget.countryId];
    this.flag = this.prefix + widget.countryId.toLocaleLowerCase();

    let iconName = widget.icon;
    this.iconService.getIcon(iconName).subscribe(
      (data: any) => {
        this.createImageFromBlob(data);
      },
      null,
      () => (this.isImageLoading = false)
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.icon = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
