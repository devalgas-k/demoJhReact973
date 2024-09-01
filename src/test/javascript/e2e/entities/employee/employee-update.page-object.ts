import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class EmployeeUpdatePage {
  pageTitle: ElementFinder = element(by.id('demoJhReact973App.employee.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  firstNameInput: ElementFinder = element(by.css('input#employee-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#employee-lastName'));
  emailInput: ElementFinder = element(by.css('input#employee-email'));
  phoneNumberInput: ElementFinder = element(by.css('input#employee-phoneNumber'));
  hireDateInput: ElementFinder = element(by.css('input#employee-hireDate'));
  salaryInput: ElementFinder = element(by.css('input#employee-salary'));
  commissionPctInput: ElementFinder = element(by.css('input#employee-commissionPct'));
  levelInput: ElementFinder = element(by.css('input#employee-level'));
  contractSelect: ElementFinder = element(by.css('select#employee-contract'));
  cvInput: ElementFinder = element(by.css('input#employee-cv'));
  managerSelect: ElementFinder = element(by.css('select#employee-manager'));
  departmentSelect: ElementFinder = element(by.css('select#employee-department'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return this.phoneNumberInput.getAttribute('value');
  }

  async setHireDateInput(hireDate) {
    await this.hireDateInput.sendKeys(hireDate);
  }

  async getHireDateInput() {
    return this.hireDateInput.getAttribute('value');
  }

  async setSalaryInput(salary) {
    await this.salaryInput.sendKeys(salary);
  }

  async getSalaryInput() {
    return this.salaryInput.getAttribute('value');
  }

  async setCommissionPctInput(commissionPct) {
    await this.commissionPctInput.sendKeys(commissionPct);
  }

  async getCommissionPctInput() {
    return this.commissionPctInput.getAttribute('value');
  }

  async setLevelInput(level) {
    await this.levelInput.sendKeys(level);
  }

  async getLevelInput() {
    return this.levelInput.getAttribute('value');
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
  async setCvInput(cv) {
    await this.cvInput.sendKeys(cv);
  }

  async getCvInput() {
    return this.cvInput.getAttribute('value');
  }

  async managerSelectLastOption() {
    await this.managerSelect.all(by.tagName('option')).last().click();
  }

  async managerSelectOption(option) {
    await this.managerSelect.sendKeys(option);
  }

  getManagerSelect() {
    return this.managerSelect;
  }

  async getManagerSelectedOption() {
    return this.managerSelect.element(by.css('option:checked')).getText();
  }

  async departmentSelectLastOption() {
    await this.departmentSelect.all(by.tagName('option')).last().click();
  }

  async departmentSelectOption(option) {
    await this.departmentSelect.sendKeys(option);
  }

  getDepartmentSelect() {
    return this.departmentSelect;
  }

  async getDepartmentSelectedOption() {
    return this.departmentSelect.element(by.css('option:checked')).getText();
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
    await this.setFirstNameInput('firstName');
    await waitUntilDisplayed(this.saveButton);
    await this.setLastNameInput('lastName');
    await waitUntilDisplayed(this.saveButton);
    await this.setEmailInput('l@8RG.e');
    await waitUntilDisplayed(this.saveButton);
    await this.setPhoneNumberInput('phoneNumber');
    await waitUntilDisplayed(this.saveButton);
    await this.setHireDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    await waitUntilDisplayed(this.saveButton);
    await this.setSalaryInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCommissionPctInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setLevelInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.contractSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setCvInput(absolutePath);
    await this.managerSelectLastOption();
    await this.departmentSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
