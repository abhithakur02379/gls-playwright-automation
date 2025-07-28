import { expect, Locator, Page, BrowserContext } from '@playwright/test'
import { BasePage } from '../src/base.page'
import testdata from '../data/testdata.json'


export class BuyParcelPage extends BasePage {

    protected parcelCheckOutHeading: Locator
    protected parcelSizeSelected: Locator
    protected saveSenderAddressButton: Locator
    protected creditCardOption: Locator
    protected cardNumber: Locator
    protected expirationDate: Locator
    protected cvvNumber: Locator
    protected buyNowButton: Locator
    protected paymentError: Locator


    constructor(page: Page, context: BrowserContext){
        
        super(page, context)
        this.parcelCheckOutHeading = page.getByText('Checkout')
        this.parcelSizeSelected = page.getByTestId('parcelSizeLabel-L')
        this.saveSenderAddressButton = page.getByTestId('saveSenderAddressButton')
        this.creditCardOption = page.locator('//div[@class="braintree-option braintree-option__card"]')
        this.cardNumber = page.frameLocator('[title="Secure Credit Card Frame - Credit Card Number"]').locator('input[name="credit-card-number"]')
        this.expirationDate = page.frameLocator('[title="Secure Credit Card Frame - Expiration Date"]').locator('input[name="expiration"]')
        this.cvvNumber = page.frameLocator('[title="Secure Credit Card Frame - CVV"]').locator('input[name="cvv"]')
        this.buyNowButton = page.getByTestId('buyNowButton')
        this.paymentError = page.getByTestId('payment-error')


    }


    async verifyUserIsOnCheckOutPage() {

        await expect(this.page).toHaveURL(/.*checkout/);
    
        expect(this.page.getByTestId('buyNowButton')).toBeVisible()


    }

    async saveUserDetails(){

        await this.saveSenderAddressButton.click()

    }

    async makePaymentFromCard(){

        await this.creditCardOption.click()
        await this.cardNumber.fill(testdata.creditCardNumber)
        await this.expirationDate.fill(testdata.expiration)
        await this.cvvNumber.fill(testdata.cvv)

    }

    async paymentErrorFromCard(){


        this.page.getByTestId('buyNowButton').click()

        await this.buyNowButton.click()

        await this.paymentError.scrollIntoViewIfNeeded()

        await this.paymentError.isVisible()

        expect(this.paymentError).toHaveText('Please select a payment method')

    }

}






