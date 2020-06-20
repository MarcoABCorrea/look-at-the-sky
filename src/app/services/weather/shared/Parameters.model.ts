export class Params {
  lat: string;
  lon: string;

  withLat(lat: string) {
    this.lat = lat;
    return this;
  }

  withLon(lon: string) {
    this.lon = lon;
    return this;
  }
}
