import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class JobUpdatePage {
  pageTitle: ElementFinder = element(by.id('demoJhReact973App.job.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  jobTitleInput: ElementFinder = element(by.css('input#job-jobTitle'));
  minSalaryInput: ElementFinder = element(by.css('input#job-minSalary'));
  maxSalaryInput: ElementFinder = element(by.css('input#job-maxSalary'));
  subSalaryInput: ElementFinder = element(by.css('input#job-subSalary'));
  totalSalaryInput: ElementFinder = element(by.css('input#job-totalSalary'));
  dateInput: ElementFinder = element(by.css('input#job-date'));
  codeCodeInput: ElementFinder = element(by.css('input#job-codeCode'));
  profilInput: ElementFinder = element(by.css('input#job-profil'));
  taskSelect: ElementFinder = element(by.css('select#job-task'));
  employeeSelect: ElementFinder = element(by.css('select#job-employee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setJobTitleInput(jobTitle) {
    await this.jobTitleInput.sendKeys(jobTitle);
  }

  async getJobTitleInput() {
    return this.jobTitleInput.getAttribute('value');
  }

  async setMinSalaryInput(minSalary) {
    await this.minSalaryInput.sendKeys(minSalary);
  }

  async getMinSalaryInput() {
    return this.minSalaryInput.getAttribute('value');
  }

  async setMaxSalaryInput(maxSalary) {
    await this.maxSalaryInput.sendKeys(maxSalary);
  }

  async getMaxSalaryInput() {
    return this.maxSalaryInput.getAttribute('value');
  }

  async setSubSalaryInput(subSalary) {
    await this.subSalaryInput.sendKeys(subSalary);
  }

  async getSubSalaryInput() {
    return this.subSalaryInput.getAttribute('value');
  }

  async setTotalSalaryInput(totalSalary) {
    await this.totalSalaryInput.sendKeys(totalSalary);
  }

  async getTotalSalaryInput() {
    return this.totalSalaryInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setCodeCodeInput(codeCode) {
    await this.codeCodeInput.sendKeys(codeCode);
  }

  async getCodeCodeInput() {
    return this.codeCodeInput.getAttribute('value');
  }

  async setProfilInput(profil) {
    await this.profilInput.sendKeys(profil);
  }

  async getProfilInput() {
    return this.profilInput.getAttribute('value');
  }

  async taskSelectLastOption() {
    await this.taskSelect.all(by.tagName('option')).last().click();
  }

  async taskSelectOption(option) {
    await this.taskSelect.sendKeys(option);
  }

  getTaskSelect() {
    return this.taskSelect;
  }

  async getTaskSelectedOption() {
    return this.taskSelect.element(by.css('option:checked')).getText();
  }

  async employeeSelectLastOption() {
    await this.employeeSelect.all(by.tagName('option')).last().click();
  }

  async employeeSelectOption(option) {
    await this.employeeSelect.sendKeys(option);
  }

  getEmployeeSelect() {
    return this.employeeSelect;
  }

  async getEmployeeSelectedOption() {
    return this.employeeSelect.element(by.css('option:checked')).getText();
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
    await this.setJobTitleInput('jobTitle');
    await waitUntilDisplayed(this.saveButton);
    await this.setMinSalaryInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setMaxSalaryInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setSubSalaryInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setTotalSalaryInput('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setDateInput('01-01-2001');
    await waitUntilDisplayed(this.saveButton);
    await this.setCodeCodeInput('64c99148-3908-465d-8c4a-e510e3ade974');
    await waitUntilDisplayed(this.saveButton);
    await this.setProfilInput(absolutePath);
    // this.taskSelectLastOption();
    await this.employeeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
  }
}
