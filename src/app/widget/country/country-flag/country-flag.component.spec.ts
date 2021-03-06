import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryNamePipe } from '../country-name.pipe';
import { CountryFlagComponent } from './country-flag.component';

describe('CountryFlagComponent', () => {
  let component: CountryFlagComponent;
  let fixture: ComponentFixture<CountryFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountryFlagComponent, CountryNamePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
