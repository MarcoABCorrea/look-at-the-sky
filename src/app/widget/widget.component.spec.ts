import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherIconService } from '@services/weatherIcon/weather-icon.service';
import { of } from 'rxjs';
import { WidgetComponent } from './widget.component';

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;
  let weatherIconService: WeatherIconService;

  const widget = require('@mockData/Widget.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: WeatherIconService,
          useValue: {
            getIcon: () => of(),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    weatherIconService = TestBed.get(WeatherIconService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#updateData()', () => {
    it('should set data on widget', () => {
      spyOn(weatherIconService, 'getIcon').and.callThrough();
      component.updateData(widget);
      fixture.detectChanges();
      expect(weatherIconService.getIcon).toHaveBeenCalled();
    });
  });

  describe('#createImageFromBlob()', () => {
    it('should create an image from response', () => {
      spyOn(component, 'createImageFromBlob');
      spyOn(weatherIconService, 'getIcon').and.returnValue(of({}));
      component.updateData(widget);
      fixture.detectChanges();
      expect(component.createImageFromBlob).toHaveBeenCalled();
    });
  });
});
