import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class MessageUpdatePage {
  pageTitle: ElementFinder = element(by.id('demoJhReact973App.message.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#message-name'));
  emailInput: ElementFinder = element(by.css('input#message-email'));
  phoneInput: ElementFinder = element(by.css('input#message-phone'));
  messageInput: ElementFinder = element(by.css('textarea#message-message'));
  fileInput: ElementFinder = element(by.css('input#message-file'));
  cityInput: ElementFinder = element(by.css('input#message-city'));
  otherCountryInput: ElementFinder = element(by.css('input#message-otherCountry'));
  dateInput: ElementFinder = element(by.css('input#message-date'));
  subjectSelect: ElementFinder = element(by.css('select#message-subject'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setMessageInput(message) {
    await this.messageInput.sendKeys(message);
  }

  async getMessageInput() {
    return this.messageInput.getAttribute('value');
  }

  async setFileInput(file) {
    await this.fileInput.sendKeys(file);
  }

  async getFileInput() {
    return this.fileInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setOtherCountryInput(otherCountry) {
    await this.otherCountryInput.sendKeys(otherCountry);
  }

  async getOtherCountryInput() {
    return this.otherCountryInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async subjectSelectLastOption() {
    await this.subjectSelect.all(by.tagName('option')).last().click();
  }

  async subjectSelectOption(option) {
    await this.subjectSelect.sendKeys(option);
  }

  getSubjectSelect() {
    return this.subjectSelect;
  }

  async getSubjectSelectedOption() {
    return this.subjectSelect.element(by.css('option:checked')).getText();
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
    await this.setNameInput('name');
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('l=@^9~Ra.?&gt;D&lt;');
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneInput('.1637557315');
    await waitUntilDisplayed(this.saveButton);
    await this.setMessageInput('message');
    await waitUntilDisplayed(this.saveButton);
    await this.setFileInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setCityInput('city');
    await waitUntilDisplayed(this.saveButton);
    await this.setOtherCountryInput('otherCountry');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await this.subjectSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
