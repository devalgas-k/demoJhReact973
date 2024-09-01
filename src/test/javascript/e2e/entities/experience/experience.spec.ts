import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ExperienceComponentsPage from './experience.page-object';
import ExperienceUpdatePage from './experience-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Experience e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let experienceComponentsPage: ExperienceComponentsPage;
  let experienceUpdatePage: ExperienceUpdatePage;
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
    experienceComponentsPage = new ExperienceComponentsPage();
    experienceComponentsPage = await experienceComponentsPage.goToPage(navBarPage);
  });

  it('should load Experiences', async () => {
    expect(await experienceComponentsPage.title.getText()).to.match(/Experiences/);
    expect(await experienceComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Experiences', async () => {
    const beforeRecordsCount = (await isVisible(experienceComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(experienceComponentsPage.table);
    experienceUpdatePage = await experienceComponentsPage.goToCreateExperience();
    await experienceUpdatePage.enterData();
    expect(await isVisible(experienceUpdatePage.saveButton)).to.be.false;

    expect(await experienceComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(experienceComponentsPage.table);
    await waitUntilCount(experienceComponentsPage.records, beforeRecordsCount + 1);
    expect(await experienceComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await experienceComponentsPage.deleteExperience();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(experienceComponentsPage.records, beforeRecordsCount);
      expect(await experienceComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(experienceComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
