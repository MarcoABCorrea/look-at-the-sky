import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  const KEY_WEATHER = 'sky_weather';

  const widgetMock = require('@mockData/Widget.json');

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#saveWeather()', () => {
    it('should add a weather to localStorage', () => {
      service.saveWeather(widgetMock);

      const storedWidget = localStorage.getItem(KEY_WEATHER);
      expect(storedWidget).not.toBe(null);

      const widget = JSON.parse(storedWidget);
      expect(widget).not.toBe(null);
      expect(widget.city).toBe('Berlin');
      expect(widget.countryId).toBe('DE');
      expect(widget.temperature).toBe(10);
      expect(widget.lat).toBe(123);
      expect(widget.lon).toBe(456);
      expect(widget.description).toBe('Cloudy');
      expect(widget.humidity).toBe(20);
      expect(widget.windSpeed).toBe('10');
      expect(widget.timezone).toBe(7200);
      expect(widget.icon).toBe('10d');
    });
  });

  describe('#loadWeather()', () => {
    it('should load a previous saved weather from localStorage', () => {
      localStorage.setItem(KEY_WEATHER, JSON.stringify(widgetMock));

      const widget = service.loadWeather();
      expect(widget).not.toBe(null);
      expect(widget.city).toBe('Berlin');
      expect(widget.countryId).toBe('DE');
      expect(widget.temperature).toBe(10);
      expect(widget.lat).toBe(123);
      expect(widget.lon).toBe(456);
      expect(widget.description).toBe('Cloudy');
      expect(widget.humidity).toBe(20);
      expect(widget.windSpeed).toBe('10');
      expect(widget.timezone).toBe(7200);
      expect(widget.icon).toBe('10d');
    });
  });
});
