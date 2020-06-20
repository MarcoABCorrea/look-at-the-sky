import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { Observable } from 'rxjs';
import { Units } from './shared/units.enum';

@Injectable()
export class WeatherInterceptor implements HttpInterceptor {
  private static API_KEY: string = environment.API_KEY;
  private static APP_ID: string = 'appid';
  private static UNTIS: string = 'units';

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf(environment.BASE_URL) === -1) {
      return next.handle(request);
    }
    const req = request.clone({
      params: request.params
        .set(WeatherInterceptor.APP_ID, WeatherInterceptor.API_KEY)
        .set(WeatherInterceptor.UNTIS, Units.CELSIUS)
    });
    return next.handle(req);
  }
}
