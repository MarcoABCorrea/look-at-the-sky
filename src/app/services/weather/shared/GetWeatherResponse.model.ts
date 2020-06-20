import { Clouds } from './Clouds.model';
import { Coordinates } from './Coordinates.model';
import { System } from './System.model';
import { Temperature } from './Temperature.model';
import { Weather } from './Weather.model';
import { Wind } from './Wind.model';

export interface GetWeatherResponse {
  coord: Coordinates;
  weather: Array<Weather>;
  base: string;
  main: Temperature;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: System;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
