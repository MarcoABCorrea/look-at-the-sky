import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';
import { GetWeatherResponse } from './shared/GetWeatherResponse.model';
import { Params } from './shared/Parameters.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private basePath: string = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  public getWithLatLon(
    lat: string,
    lon: string
  ): Observable<GetWeatherResponse> {
    return this.http.get<GetWeatherResponse>(this.basePath, {
      params: this.buildParams(lat, lon)
    });
  }

  private buildParams(lat: string, lon: string): HttpParams {
    let params = new Params().withLat(lat).withLon(lon);

    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.append(key, params[key]);
    });

    return httpParams;
  }
}
