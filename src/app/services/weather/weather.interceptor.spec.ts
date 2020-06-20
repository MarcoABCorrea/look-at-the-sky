import { TestBed } from '@angular/core/testing';

import { WeatherInterceptor } from './weather.interceptor';

describe('WeatherInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      WeatherInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: WeatherInterceptor = TestBed.inject(WeatherInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
