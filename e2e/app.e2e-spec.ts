import { CreditCardCheckerPage } from './app.po';

describe('credit-card-checker App', () => {
  let page: CreditCardCheckerPage;

  beforeEach(() => {
    page = new CreditCardCheckerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
