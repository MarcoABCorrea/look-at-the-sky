import { Component, Input } from '@angular/core';

@Component({
  selector: 'country-flag',
  templateUrl: './country-flag.component.html',
  styleUrls: ['./country-flag.component.scss'],
})
export class CountryFlagComponent {
  @Input()
  countryId: string;

  constructor() {}
}
