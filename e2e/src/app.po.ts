import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphPageTitle() {
    return element(by.css('#look-at-the-sky-app .mat-toolbar span')).getText();
  }
}
