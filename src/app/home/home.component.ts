import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '@services/storage/storage.service';
import { GetWeatherResponse } from '@services/weather/shared/GetWeatherResponse.model';
import { WeatherService } from '@services/weather/weather.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Lat } from '../shared/Latitude.enum';
import { Lon } from '../shared/Longitude.enum';
import { Widget } from '../widget/widget.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  static maxTries: number = 5;
  country: string;
  city: string;
  showLoading: boolean = false;
  widgetData: Widget;

  constructor(
    private dialog: MatDialog,
    private weatherService: WeatherService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.widgetData = this.storageService.loadWeather();
  }

  search(event: any): void {
    event.stopPropagation();

    if (this.city) {
      this.showLoading = true;
      this.getWeatherWithLocation(this.country, this.city).subscribe(
        (res: GetWeatherResponse) => {
          this.showLoading = false;
          const widget = this.buildWidgetObject(res);
          this.updateData(widget);
        },
        () => this.showError(),
      );
    }
  }

  randomWeather(): void {
    this.showLoading = true;
    this.findRandomCity().subscribe(
      (res: GetWeatherResponse) => {
        this.showLoading = false;
        const widget = this.buildWidgetObject(res);
        this.updateData(widget);
      },
      (message) => {
        message.subscribe(null, (error) => this.showError(error)); // TODO why is it being returned an Observable
      },
    );
  }

  buildWidgetObject(res: GetWeatherResponse): Widget {
    return {
      city: res.name,
      countryId: res.sys.country,
      temperature: res.main.temp,
      lat: res.coord.lat,
      lon: res.coord.lon,
      description: res.weather[0].description,
      humidity: res.main.humidity,
      windSpeed: this.convertMPSToKMH(res.wind.speed),
      timezone: res.timezone,
      icon: res.weather[0].icon,
    };
  }

  updateData(widget: Widget): void {
    this.storageService.saveWeather(widget);
    this.widgetData = widget;
  }

  /**
   * Keep trying until finds a valid city
   * maxTries default 5
   */
  findRandomCity(maxTries: number = 0): any {
    return this.getWeather().pipe(
      map((weather) => {
        if (weather.name === '') {
          throw throwError(null);
        }
        return weather;
      }),
      catchError(() => {
        maxTries++;
        if (maxTries === HomeComponent.maxTries) {
          throw throwError(
            `Number of tries exceeded! ${HomeComponent.maxTries} times`,
          );
        }
        return this.findRandomCity(maxTries);
      }),
    );
  }

  getWeatherWithLocation(
    country: string,
    city: string,
  ): Observable<GetWeatherResponse> {
    return this.weatherService.getWithLocation(country, city);
  }

  getWeather(): Observable<GetWeatherResponse> {
    const latitude = this.getRandomCoordinate(Lat.FROM, Lat.TO);
    const longitude = this.getRandomCoordinate(Lon.FROM, Lon.TO);

    return this.weatherService.getWithLatLon(latitude, longitude);
  }

  getRandomCoordinate(from: number, to: number): string {
    return (Math.random() * (to - from) + from).toFixed(3);
  }

  convertMPSToKMH(mps: number): string {
    return ((mps / 1000) * 3600).toFixed(1);
  }

  showError(message: string = 'Error connecting to the servers!'): void {
    this.showLoading = false;
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
    });
  }
}
