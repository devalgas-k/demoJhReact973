import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ExpertiseComponentsPage from './expertise.page-object';
import ExpertiseUpdatePage from './expertise-update.page-object';
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

describe('Expertise e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let expertiseComponentsPage: ExpertiseComponentsPage;
  let expertiseUpdatePage: ExpertiseUpdatePage;
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
    expertiseComponentsPage = new ExpertiseComponentsPage();
    expertiseComponentsPage = await expertiseComponentsPage.goToPage(navBarPage);
  });

  it('should load Expertise', async () => {
    expect(await expertiseComponentsPage.title.getText()).to.match(/Expertise/);
    expect(await expertiseComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Expertise', async () => {
    const beforeRecordsCount = (await isVisible(expertiseComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(expertiseComponentsPage.table);
    expertiseUpdatePage = await expertiseComponentsPage.goToCreateExpertise();
    await expertiseUpdatePage.enterData();
    expect(await isVisible(expertiseUpdatePage.saveButton)).to.be.false;

    expect(await expertiseComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(expertiseComponentsPage.table);
    await waitUntilCount(expertiseComponentsPage.records, beforeRecordsCount + 1);
    expect(await expertiseComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await expertiseComponentsPage.deleteExpertise();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(expertiseComponentsPage.records, beforeRecordsCount);
      expect(await expertiseComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(expertiseComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
