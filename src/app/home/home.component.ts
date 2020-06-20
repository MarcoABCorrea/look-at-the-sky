import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GetWeatherResponse } from '@services/weather/shared/GetWeatherResponse.model';
import { WeatherService } from '@services/weather/weather.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Lat } from '../shared/Latitude.enum';
import { Lon } from '../shared/Longitude.enum';

const countries = require('@mockData/CountriesISO.json');

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  prefix: string = 'flag-icon-';
  flag: string;
  city: string;
  country: string;
  temperature: number;
  show: boolean;
  latitude: string;
  longitude: string;
  icon: any;
  isImageLoading: boolean = true;

  current: any = {}; // TODO new pojo

  constructor(
    private dialog: MatDialog,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.show = false;
    this.findRandomCity().subscribe((weather: GetWeatherResponse) =>
      this.setCurrentWeather(weather)
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

  setCurrentWeather(res: GetWeatherResponse) {
    console.log(res);
    this.convertMPSToKMH(res.wind.speed);

    this.show = true;

    this.current = {
      city: res.name,
      temperature: res.main.temp,
      lat: res.coord.lat,
      lon: res.coord.lon,
      description: res.weather[0].description,
      humidity: res.main.humidity,
      windSpeed: this.convertMPSToKMH(res.wind.speed)
    };

    const countryID = res.sys.country;
    this.country = countries[countryID];
    this.flag = this.prefix + countryID.toLocaleLowerCase();

    this.weatherService.getIcon(res.weather[0].icon).subscribe(
      (data: any) => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      (error) => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }

  getRandomCoordinate(from: number, to: number) {
    return (Math.random() * (to - from) + from).toFixed(3);
  }

  convertMPSToKMH(mps: number): string {
    return ((mps / 1000) * 3600).toFixed(1);
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.current.icon = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  showError(): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message: 'Error connecting to the servers!' }
    });
  }
}
