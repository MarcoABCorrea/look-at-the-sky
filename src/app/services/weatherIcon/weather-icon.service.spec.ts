import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WeatherIconService } from './weather-icon.service';

describe('WeatherIconService', () => {
  let service: WeatherIconService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WeatherIconService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getIcon()', () => {
    it('should return an Observable<Blob>', () => {
      service.getIcon('10').subscribe((order) => {
        expect(order).not.toBe(null);
      });
      const req = httpMock.expectOne(
        'http://openweathermap.org/img/wn/10@2x.png'
      );
      expect(req.request.method).toBe('GET');
    });
  });
});
