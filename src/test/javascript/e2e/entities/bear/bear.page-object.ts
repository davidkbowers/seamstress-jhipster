import { element, by, ElementFinder } from 'protractor';

export class BearComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-bear div table .btn-danger'));
  title = element.all(by.css('jhi-bear div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class BearUpdatePage {
  pageTitle = element(by.id('jhi-bear-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  imageFileInput = element(by.id('field_imageFile'));
  descriptionInput = element(by.id('field_description'));
  dateAddedInput = element(by.id('field_dateAdded'));
  sortPositionInput = element(by.id('field_sortPosition'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setImageFileInput(imageFile: string): Promise<void> {
    await this.imageFileInput.sendKeys(imageFile);
  }

  async getImageFileInput(): Promise<string> {
    return await this.imageFileInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDateAddedInput(dateAdded: string): Promise<void> {
    await this.dateAddedInput.sendKeys(dateAdded);
  }

  async getDateAddedInput(): Promise<string> {
    return await this.dateAddedInput.getAttribute('value');
  }

  async setSortPositionInput(sortPosition: string): Promise<void> {
    await this.sortPositionInput.sendKeys(sortPosition);
  }

  async getSortPositionInput(): Promise<string> {
    return await this.sortPositionInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class BearDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-bear-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-bear'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
