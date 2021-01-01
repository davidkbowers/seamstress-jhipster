import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BearComponentsPage, BearDeleteDialog, BearUpdatePage } from './bear.page-object';

const expect = chai.expect;

describe('Bear e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bearComponentsPage: BearComponentsPage;
  let bearUpdatePage: BearUpdatePage;
  let bearDeleteDialog: BearDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Bears', async () => {
    await navBarPage.goToEntity('bear');
    bearComponentsPage = new BearComponentsPage();
    await browser.wait(ec.visibilityOf(bearComponentsPage.title), 5000);
    expect(await bearComponentsPage.getTitle()).to.eq('Bears');
    await browser.wait(ec.or(ec.visibilityOf(bearComponentsPage.entities), ec.visibilityOf(bearComponentsPage.noResult)), 1000);
  });

  it('should load create Bear page', async () => {
    await bearComponentsPage.clickOnCreateButton();
    bearUpdatePage = new BearUpdatePage();
    expect(await bearUpdatePage.getPageTitle()).to.eq('Create or edit a Bear');
    await bearUpdatePage.cancel();
  });

  it('should create and save Bears', async () => {
    const nbButtonsBeforeCreate = await bearComponentsPage.countDeleteButtons();

    await bearComponentsPage.clickOnCreateButton();

    await promise.all([
      bearUpdatePage.setImageFileInput('imageFile'),
      bearUpdatePage.setDescriptionInput('description'),
      bearUpdatePage.setDateAddedInput('2000-12-31'),
      bearUpdatePage.setSortPositionInput('5'),
    ]);

    expect(await bearUpdatePage.getImageFileInput()).to.eq('imageFile', 'Expected ImageFile value to be equals to imageFile');
    expect(await bearUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await bearUpdatePage.getDateAddedInput()).to.eq('2000-12-31', 'Expected dateAdded value to be equals to 2000-12-31');
    expect(await bearUpdatePage.getSortPositionInput()).to.eq('5', 'Expected sortPosition value to be equals to 5');

    await bearUpdatePage.save();
    expect(await bearUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await bearComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Bear', async () => {
    const nbButtonsBeforeDelete = await bearComponentsPage.countDeleteButtons();
    await bearComponentsPage.clickOnLastDeleteButton();

    bearDeleteDialog = new BearDeleteDialog();
    expect(await bearDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Bear?');
    await bearDeleteDialog.clickOnConfirmButton();

    expect(await bearComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
