import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CustomerOrderComponentsPage, CustomerOrderDeleteDialog, CustomerOrderUpdatePage } from './customer-order.page-object';

const expect = chai.expect;

describe('CustomerOrder e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let customerOrderComponentsPage: CustomerOrderComponentsPage;
  let customerOrderUpdatePage: CustomerOrderUpdatePage;
  let customerOrderDeleteDialog: CustomerOrderDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CustomerOrders', async () => {
    await navBarPage.goToEntity('customer-order');
    customerOrderComponentsPage = new CustomerOrderComponentsPage();
    await browser.wait(ec.visibilityOf(customerOrderComponentsPage.title), 5000);
    expect(await customerOrderComponentsPage.getTitle()).to.eq('Customer Orders');
    await browser.wait(
      ec.or(ec.visibilityOf(customerOrderComponentsPage.entities), ec.visibilityOf(customerOrderComponentsPage.noResult)),
      1000
    );
  });

  it('should load create CustomerOrder page', async () => {
    await customerOrderComponentsPage.clickOnCreateButton();
    customerOrderUpdatePage = new CustomerOrderUpdatePage();
    expect(await customerOrderUpdatePage.getPageTitle()).to.eq('Create or edit a Customer Order');
    await customerOrderUpdatePage.cancel();
  });

  it('should create and save CustomerOrders', async () => {
    const nbButtonsBeforeCreate = await customerOrderComponentsPage.countDeleteButtons();

    await customerOrderComponentsPage.clickOnCreateButton();

    await promise.all([
      customerOrderUpdatePage.setDescriptionInput('description'),
      customerOrderUpdatePage.setPlacedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      customerOrderUpdatePage.setPromisedDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      customerOrderUpdatePage.setTotalPriceInput('5'),
      customerOrderUpdatePage.setTotalPaidInput('5'),
      customerOrderUpdatePage.customerSelectLastOption(),
    ]);

    expect(await customerOrderUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await customerOrderUpdatePage.getPlacedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected placedDate value to be equals to 2000-12-31'
    );
    expect(await customerOrderUpdatePage.getPromisedDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected promisedDate value to be equals to 2000-12-31'
    );
    expect(await customerOrderUpdatePage.getTotalPriceInput()).to.eq('5', 'Expected totalPrice value to be equals to 5');
    expect(await customerOrderUpdatePage.getTotalPaidInput()).to.eq('5', 'Expected totalPaid value to be equals to 5');

    await customerOrderUpdatePage.save();
    expect(await customerOrderUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await customerOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last CustomerOrder', async () => {
    const nbButtonsBeforeDelete = await customerOrderComponentsPage.countDeleteButtons();
    await customerOrderComponentsPage.clickOnLastDeleteButton();

    customerOrderDeleteDialog = new CustomerOrderDeleteDialog();
    expect(await customerOrderDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Customer Order?');
    await customerOrderDeleteDialog.clickOnConfirmButton();

    expect(await customerOrderComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
