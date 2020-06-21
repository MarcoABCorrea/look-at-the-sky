export class Params {
  lat: string;
  lon: string;
  q: string;

  withLat(lat: string) {
    this.lat = lat;
    return this;
  }

  withLon(lon: string) {
    this.lon = lon;
    return this;
  }

  withCountry(country: string) {
    if (this.q) {
      this.q += ',' + country;
    } else {
      this.q = country;
    }
    return this;
  }

  withCity(city: string) {
    this.q = city;
    return this;
  }
}
