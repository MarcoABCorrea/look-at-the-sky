import { Injectable } from '@angular/core';
import { Widget } from 'src/app/widget/widget.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private static KEY_WEATHER = 'sky_weather';

  public saveWeather(currentWeather: Widget): void {
    localStorage.removeItem(StorageService.KEY_WEATHER);
    localStorage.setItem(
      StorageService.KEY_WEATHER,
      JSON.stringify(currentWeather)
    );
  }

  public loadWeather(): Widget {
    return JSON.parse(localStorage.getItem(StorageService.KEY_WEATHER));
  }
}
