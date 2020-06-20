import { AppPage } from './app.po';

describe('Look at the sky App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title text', () => {
    page.navigateTo();
    expect(page.getParagraphPageTitle()).toEqual('Look at the sky!');
  });
});
