import { CountryNamePipe } from './country-name.pipe';

describe('CountryNamePipe', () => {
  let pipe: CountryNamePipe;

  beforeEach(() => {
    pipe = new CountryNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should translate "BR" key to "Brazil"', () => {
    expect(pipe.transform('BR')).toBe('Brazil');
  });
  it('should translate "DE" key to "Germany"', () => {
    expect(pipe.transform('DE')).toBe('Germany');
  });
  it('should translate "US" key to "United States"', () => {
    expect(pipe.transform('US')).toBe('United States');
  });
});
