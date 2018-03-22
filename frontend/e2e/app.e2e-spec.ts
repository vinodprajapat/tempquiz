import { QuizappPage } from './app.po';

describe('quizapp App', function() {
  let page: QuizappPage;

  beforeEach(() => {
    page = new QuizappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
