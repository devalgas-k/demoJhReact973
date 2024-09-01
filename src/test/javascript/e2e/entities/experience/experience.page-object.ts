import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ExperienceUpdatePage from './experience-update.page-object';

const expect = chai.expect;
export class ExperienceDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('demoJhReact973App.experience.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-experience'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ExperienceComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('experience-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('experience');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateExperience() {
    await this.createButton.click();
    return new ExperienceUpdatePage();
  }

  async deleteExperience() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const experienceDeleteDialog = new ExperienceDeleteDialog();
    await waitUntilDisplayed(experienceDeleteDialog.deleteModal);
    expect(await experienceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/demoJhReact973App.experience.delete.question/);
    await experienceDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(experienceDeleteDialog.deleteModal);

    expect(await isVisible(experienceDeleteDialog.deleteModal)).to.be.false;
  }
}
