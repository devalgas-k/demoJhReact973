import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SubjectComponentsPage from './subject.page-object';
import SubjectUpdatePage from './subject-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Subject e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subjectComponentsPage: SubjectComponentsPage;
  let subjectUpdatePage: SubjectUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    subjectComponentsPage = new SubjectComponentsPage();
    subjectComponentsPage = await subjectComponentsPage.goToPage(navBarPage);
  });

  it('should load Subjects', async () => {
    expect(await subjectComponentsPage.title.getText()).to.match(/Subjects/);
    expect(await subjectComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Subjects', async () => {
    const beforeRecordsCount = (await isVisible(subjectComponentsPage.noRecords)) ? 0 : await getRecordsCount(subjectComponentsPage.table);
    subjectUpdatePage = await subjectComponentsPage.goToCreateSubject();
    await subjectUpdatePage.enterData();
    expect(await isVisible(subjectUpdatePage.saveButton)).to.be.false;

    expect(await subjectComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(subjectComponentsPage.table);
    await waitUntilCount(subjectComponentsPage.records, beforeRecordsCount + 1);
    expect(await subjectComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await subjectComponentsPage.deleteSubject();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(subjectComponentsPage.records, beforeRecordsCount);
      expect(await subjectComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(subjectComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
