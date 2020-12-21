import { element, by, ElementFinder } from 'protractor';

export class CustomerOrderComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-customer-order div table .btn-danger'));
  title = element.all(by.css('jhi-customer-order div h2#page-heading span')).first();
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

export class CustomerOrderUpdatePage {
  pageTitle = element(by.id('jhi-customer-order-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  descriptionInput = element(by.id('field_description'));
  placedDateInput = element(by.id('field_placedDate'));
  promisedDateInput = element(by.id('field_promisedDate'));
  totalPriceInput = element(by.id('field_totalPrice'));
  totalPaidInput = element(by.id('field_totalPaid'));

  customerSelect = element(by.id('field_customer'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setPlacedDateInput(placedDate: string): Promise<void> {
    await this.placedDateInput.sendKeys(placedDate);
  }

  async getPlacedDateInput(): Promise<string> {
    return await this.placedDateInput.getAttribute('value');
  }

  async setPromisedDateInput(promisedDate: string): Promise<void> {
    await this.promisedDateInput.sendKeys(promisedDate);
  }

  async getPromisedDateInput(): Promise<string> {
    return await this.promisedDateInput.getAttribute('value');
  }

  async setTotalPriceInput(totalPrice: string): Promise<void> {
    await this.totalPriceInput.sendKeys(totalPrice);
  }

  async getTotalPriceInput(): Promise<string> {
    return await this.totalPriceInput.getAttribute('value');
  }

  async setTotalPaidInput(totalPaid: string): Promise<void> {
    await this.totalPaidInput.sendKeys(totalPaid);
  }

  async getTotalPaidInput(): Promise<string> {
    return await this.totalPaidInput.getAttribute('value');
  }

  async customerSelectLastOption(): Promise<void> {
    await this.customerSelect.all(by.tagName('option')).last().click();
  }

  async customerSelectOption(option: string): Promise<void> {
    await this.customerSelect.sendKeys(option);
  }

  getCustomerSelect(): ElementFinder {
    return this.customerSelect;
  }

  async getCustomerSelectedOption(): Promise<string> {
    return await this.customerSelect.element(by.css('option:checked')).getText();
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

export class CustomerOrderDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-customerOrder-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-customerOrder'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
