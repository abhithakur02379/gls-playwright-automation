import { expect, Page } from '@playwright/test'
import testdata from '../data/testdata.json'
import { BasePage } from '../src/base.page'
import { AddParcelPage } from '../src/add-parcel'
import { test } from '../fixtures/fixture';

test.describe('Parcel Overview Flow', () => {

  // let basePage: BasePage

  test.beforeEach(async ({page, context}) => {

    let basePage = new BasePage(page, context)

    await basePage.launchApplication()

  });


  test('Verify user should be able to add a new parcel', {tag: ['@positive']}, async ({ addParcelPage }) => {


    await addParcelPage.selectParcelSize()

    await addParcelPage.fillPersonalInformation()

    await addParcelPage.addParcelToBag()

    await addParcelPage.validateParcelIsAdded()

  });

  test('Verify user should be able to buy a new parcel', {tag: ['@positive']}, async ({ addParcelPage, buyParcelPage }) => {


    await addParcelPage.selectParcelSize()

    await addParcelPage.fillPersonalInformation()

    await addParcelPage.addParcelToBag()

    await addParcelPage.validateParcelIsAdded()

    await addParcelPage.clickCheckOut()

    await buyParcelPage.verifyUserIsOnCheckOutPage()

    await buyParcelPage.saveUserDetails()

    await buyParcelPage.makePaymentFromCard()


  });

  test('Verify user does not select a payment method and click on buy', {tag: ['@negative']}, async ({ addParcelPage, buyParcelPage }) => {

    await addParcelPage.selectParcelSize()

    await addParcelPage.fillPersonalInformation()

    await addParcelPage.addParcelToBag()

    await addParcelPage.validateParcelIsAdded()

    await addParcelPage.clickCheckOut()

    await buyParcelPage.verifyUserIsOnCheckOutPage()

    await buyParcelPage.saveUserDetails()

    await buyParcelPage.paymentErrorFromCard()
    

  });



});

