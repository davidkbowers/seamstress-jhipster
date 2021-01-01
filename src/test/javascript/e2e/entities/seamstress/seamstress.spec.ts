import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SeamstressComponentsPage, SeamstressDeleteDialog, SeamstressUpdatePage } from './seamstress.page-object';

const expect = chai.expect;

describe('Seamstress e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let seamstressComponentsPage: SeamstressComponentsPage;
  let seamstressUpdatePage: SeamstressUpdatePage;
  let seamstressDeleteDialog: SeamstressDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Seamstresses', async () => {
    await navBarPage.goToEntity('seamstress');
    seamstressComponentsPage = new SeamstressComponentsPage();
    await browser.wait(ec.visibilityOf(seamstressComponentsPage.title), 5000);
    expect(await seamstressComponentsPage.getTitle()).to.eq('Seamstresses');
    await browser.wait(ec.or(ec.visibilityOf(seamstressComponentsPage.entities), ec.visibilityOf(seamstressComponentsPage.noResult)), 1000);
  });

  it('should load create Seamstress page', async () => {
    await seamstressComponentsPage.clickOnCreateButton();
    seamstressUpdatePage = new SeamstressUpdatePage();
    expect(await seamstressUpdatePage.getPageTitle()).to.eq('Create or edit a Seamstress');
    await seamstressUpdatePage.cancel();
  });

  it('should create and save Seamstresses', async () => {
    const nbButtonsBeforeCreate = await seamstressComponentsPage.countDeleteButtons();

    await seamstressComponentsPage.clickOnCreateButton();

    await promise.all([
      seamstressUpdatePage.setImageFileInput('imageFile'),
      seamstressUpdatePage.setDescriptionInput('description'),
      seamstressUpdatePage.setDateAddedInput('2000-12-31'),
      seamstressUpdatePage.setSortPositionInput('5'),
    ]);

    expect(await seamstressUpdatePage.getImageFileInput()).to.eq('imageFile', 'Expected ImageFile value to be equals to imageFile');
    expect(await seamstressUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await seamstressUpdatePage.getDateAddedInput()).to.eq('2000-12-31', 'Expected dateAdded value to be equals to 2000-12-31');
    expect(await seamstressUpdatePage.getSortPositionInput()).to.eq('5', 'Expected sortPosition value to be equals to 5');

    await seamstressUpdatePage.save();
    expect(await seamstressUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await seamstressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Seamstress', async () => {
    const nbButtonsBeforeDelete = await seamstressComponentsPage.countDeleteButtons();
    await seamstressComponentsPage.clickOnLastDeleteButton();

    seamstressDeleteDialog = new SeamstressDeleteDialog();
    expect(await seamstressDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Seamstress?');
    await seamstressDeleteDialog.clickOnConfirmButton();

    expect(await seamstressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
