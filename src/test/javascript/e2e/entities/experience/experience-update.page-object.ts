import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class ExperienceUpdatePage {
  pageTitle: ElementFinder = element(by.id('demoJhReact973App.experience.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#experience-title'));
  companyInput: ElementFinder = element(by.css('input#experience-company'));
  descriptionInput: ElementFinder = element(by.css('textarea#experience-description'));
  logoCompanyInput: ElementFinder = element(by.css('input#experience-logoCompany'));
  inProgressInput: ElementFinder = element(by.css('input#experience-inProgress'));
  contractSelect: ElementFinder = element(by.css('select#experience-contract'));
  startDateInput: ElementFinder = element(by.css('input#experience-startDate'));
  endDateInput: ElementFinder = element(by.css('input#experience-endDate'));
  expertiseSelect: ElementFinder = element(by.css('select#experience-expertise'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setCompanyInput(company) {
    await this.companyInput.sendKeys(company);
  }

  async getCompanyInput() {
    return this.companyInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setLogoCompanyInput(logoCompany) {
    await this.logoCompanyInput.sendKeys(logoCompany);
  }

  async getLogoCompanyInput() {
    return this.logoCompanyInput.getAttribute('value');
  }

  getInProgressInput() {
    return this.inProgressInput;
  }
  async setContractSelect(contract) {
    await this.contractSelect.sendKeys(contract);
  }

  async getContractSelect() {
    return this.contractSelect.element(by.css('option:checked')).getText();
  }

  async contractSelectLastOption() {
    await this.contractSelect.all(by.tagName('option')).last().click();
  }
  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return this.endDateInput.getAttribute('value');
  }

  async expertiseSelectLastOption() {
    await this.expertiseSelect.all(by.tagName('option')).last().click();
  }

  async expertiseSelectOption(option) {
    await this.expertiseSelect.sendKeys(option);
  }

  getExpertiseSelect() {
    return this.expertiseSelect;
  }

  async getExpertiseSelectedOption() {
    return this.expertiseSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setTitleInput('Ef');
    await waitUntilDisplayed(this.saveButton);
    await this.setCompanyInput('IIY~Um');
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    await waitUntilDisplayed(this.saveButton);
    await this.setLogoCompanyInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    const selectedInProgress = await this.getInProgressInput().isSelected();
    if (selectedInProgress) {
      await this.getInProgressInput().click();
    } else {
      await this.getInProgressInput().click();
    }
    await waitUntilDisplayed(this.saveButton);
    await this.contractSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setStartDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setEndDateInput('01-01-2001');
    // this.expertiseSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
