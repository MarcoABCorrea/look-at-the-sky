import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the right year in copyright', () => {
    expect(component.year).toBe(new Date().getFullYear());
  });

  describe('#scrollToTop()', () => {
    it('should scroll page to the top', () => {
      spyOn(window, 'scroll');
      component.scrollToTop();
      expect(window.scroll).toHaveBeenCalled();
    });
  });
});
