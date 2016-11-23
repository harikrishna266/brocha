import { BrochaPage } from './app.po';

describe('brocha App', function() {
  let page: BrochaPage;

  beforeEach(() => {
    page = new BrochaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
