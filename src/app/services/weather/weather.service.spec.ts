import { HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Params } from './shared/Parameters.model';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getWithLocation()', () => {
    it('should return an Observable<GetWeatherResponse>', () => {
      spyOn(service, 'appendParams').and.callThrough();

      service.getWithLocation('Germany', 'Berlin').subscribe((weather) => {
        expect(weather).not.toBe(null);
      });
      const req = httpMock.expectOne(
        'https://api.openweathermap.org/data/2.5/weather?q=Berlin'
      );
      expect(req.request.method).toBe('GET');
      expect(service.appendParams).toHaveBeenCalled();
    });
  });

  describe('#getWithLatLon()', () => {
    it('should return an Observable<GetWeatherResponse>', () => {
      service.getWithLatLon('10', '90').subscribe((weather) => {
        expect(weather).not.toBe(null);
      });
      const req = httpMock.expectOne(
        'https://api.openweathermap.org/data/2.5/weather?lat=10&lon=90'
      );
      expect(req.request.method).toBe('GET');
    });
  });

  describe('#appendParams()', () => {
    it('should return an HttpParams object', () => {
      const params = new Params().withCity('berlin');
      const res = service.appendParams(params);
      expect(res).not.toBe(null);
      expect(res instanceof HttpParams).toBeTruthy();
    });
  });
});
