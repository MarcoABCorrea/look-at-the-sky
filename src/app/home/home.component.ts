import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '@services/storage/storage.service';
import { GetWeatherResponse } from '@services/weather/shared/GetWeatherResponse.model';
import { WeatherService } from '@services/weather/weather.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Lat } from '../shared/Latitude.enum';
import { Lon } from '../shared/Longitude.enum';
import { WidgetComponent } from '../widget/widget.component';
import { Widget } from '../widget/widget.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(WidgetComponent)
  private widgetChild: WidgetComponent;
  country: string;
  city: string;
  showLoading: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const widget = this.storageService.loadWeather();
    this.updateData(widget);
    this.cdr.detectChanges(); // Prevent error due child view update
  }

  search(event: any) {
    event.stopPropagation();

    if (this.city) {
      this.showLoading = true;
      this.getWeatherWithLocation(this.country, this.city).subscribe(
        (res: GetWeatherResponse) => {
          this.showLoading = false;
          const widget = this.buildWidgetObject(res);
          this.updateData(widget);
        },
        () => this.showError()
      );
    }
  }

  randomWeather() {
    this.showLoading = true;
    this.findRandomCity().subscribe(
      (res: GetWeatherResponse) => {
        this.showLoading = false;
        const widget = this.buildWidgetObject(res);
        this.updateData(widget);
      },
      () => this.showError()
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
      icon: res.weather[0].icon
    };
  }

  updateData(widget: Widget) {
    this.storageService.saveWeather(widget);
    this.widgetChild.updateData(widget);
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

  getWeatherWithLocation(country: string, city: string) {
    return this.weatherService.getWithLocation(country, city);
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
    this.showLoading = false;
    this.dialog.open(ErrorDialogComponent, {
      data: { message: 'Error connecting to the servers!' }
    });
  }
}
