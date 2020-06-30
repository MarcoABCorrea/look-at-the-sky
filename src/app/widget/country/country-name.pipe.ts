import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countryName',
})
export class CountryNamePipe implements PipeTransform {
  countries = require('@mockData/CountriesISO.json');

  transform(countryId: string): string {
    return this.countries[countryId];
  }
}
