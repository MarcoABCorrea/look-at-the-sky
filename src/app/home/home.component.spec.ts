import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WeatherService } from '@services/weather/weather.service';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dialog: MatDialog;
  let weatherService: WeatherService;

  const widgetMock = require('@mockData/Widget.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule],
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getWithLocation: (country: string, city: string) => of(),
            getWithLatLon: (lat: string, lon: string) => of()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    dialog = TestBed.get(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#search()', () => {
    it('should search for weather based on city', () => {
      spyOn(component, 'updateData').and.returnValue({});
      component.city = 'Berlin';
      spyOn(component, 'getWeatherWithLocation').and.callThrough();
      spyOn(component, 'showError').and.callThrough();
      fixture.detectChanges();
      component.search({ stopPropagation: () => {} });
      expect(component.getWeatherWithLocation).toHaveBeenCalled();
      expect(component.showError).not.toHaveBeenCalled();
    });
  });

  describe('#randomWeather()', () => {
    it('should return weather from random city', () => {
      spyOn(component, 'updateData').and.returnValue({});
      spyOn(component, 'getWeather').and.callThrough();
      spyOn(component, 'showError').and.callThrough();
      fixture.detectChanges();
      component.randomWeather();
      expect(component.getWeather).toHaveBeenCalled();
      expect(component.showError).not.toHaveBeenCalled();
    });
  });

  describe('#getRandomCoordinate()', () => {
    it('should return random value in giver range', () => {
      const ran = component.getRandomCoordinate(1, 10);
      expect(ran).not.toBe(null);
      const num: number = +ran;
      expect(num > 0).toBeTruthy();
      expect(num < 10).toBeTruthy();
    });
  });
});
