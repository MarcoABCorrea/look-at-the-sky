import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetWeatherResponse } from '@services/weather/shared/GetWeatherResponse.model';
import { WeatherService } from '@services/weather/weather.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Lat } from '../shared/Latitude.enum';
import { Lon } from '../shared/Longitude.enum';
import { WidgetComponent } from '../widget/widget.component';
import { Widget } from '../widget/widget.model';

const countries = require('@mockData/CountriesISO.json');

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(WidgetComponent)
  private widgetChild: WidgetComponent;

  constructor(
    private dialog: MatDialog,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {}

  randomWeather() {
    this.findRandomCity().subscribe(
      (res: GetWeatherResponse) => {
        const widget: Widget = {
          city: res.name,
          countryId: res.sys.country,
          temperature: res.main.temp,
          lat: res.coord.lat,
          lon: res.coord.lon,
          description: res.weather[0].description,
          humidity: res.main.humidity,
          windSpeed: this.convertMPSToKMH(res.wind.speed),
          timezone: res.timezone,
          icon: res.weather[0].icon
        };

        this.widgetChild.updateData(widget);
      },
      () => this.showError()
    );
  }

  /**
   * Keep trying until finds a valid city
   */
  findRandomCity() {
    return this.getWeather().pipe(
      map((weather) => {
        if (weather.name === '') {
          throw throwError(weather);
        }
        return weather;
      }),
      catchError(() => this.findRandomCity())
    );
  }

  getWeather(): Observable<GetWeatherResponse> {
    const latitude = this.getRandomCoordinate(Lat.FROM, Lat.TO);
    const longitude = this.getRandomCoordinate(Lon.FROM, Lon.TO);

    return this.weatherService.getWithLatLon(latitude, longitude);
  }

  getRandomCoordinate(from: number, to: number) {
    return (Math.random() * (to - from) + from).toFixed(3);
  }

  convertMPSToKMH(mps: number): string {
    return ((mps / 1000) * 3600).toFixed(1);
  }

  showError(): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: 'Error connecting to the servers!' }
    });
  }
}
