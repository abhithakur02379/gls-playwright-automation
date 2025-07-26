import { expect, Locator, Page, BrowserContext } from '@playwright/test'
import { BasePage } from '../src/base.page'
import testdata from '../data/testdata.json'


export class AddParcelPage extends BasePage {

    protected firstName:Locator
    protected lastName:Locator
    protected street:Locator
    protected houseNumber:Locator
    protected postCode:Locator
    protected city:Locator
    protected email:Locator
    protected parcelSizeToBeSelected:Locator
    protected parcelSizeSelected:Locator
    protected parcelConfigurationHeading: Locator


    constructor(page: Page, context: BrowserContext){
        
        super(page, context)
        this.parcelConfigurationHeading = page.getByText('Parcel configuration')
        this.firstName = page.locator('//input[@name="firstName"]')
        this.lastName = page.locator('//input[@name="lastName"]')
        this.street = page.locator('//input[@name="street"]')
        this.houseNumber = page.locator('//input[@name="houseNumber"]')
        this.postCode = page.locator('//input[@name="postcode"]')
        this.city = page.locator('//input[@name="city"]')
        this.email = page.locator('//input[@name="email"]')
        this.parcelSizeToBeSelected = page.getByTestId('parcelSizeLabel-L')
        this.parcelSizeSelected = page.getByTestId('cartItemParcelSize')
    }


    async selectParcelSize() {
    
        await expect(this.parcelConfigurationHeading).toBeVisible()

        await this.parcelSizeToBeSelected.click()

    }

    async fillPersonalInformation(){

        await this.firstName.fill(testdata.firstName)
        await this.lastName.fill(testdata.lastName)
        await this.street.fill(testdata.street)
        await this.houseNumber.fill(testdata.houseNumber)
        await this.postCode.fill(testdata.postCode)
        await this.city.fill(testdata.city)
        await this.email.fill(testdata.email)

    }

    async addParcelToBag(){

        await this.page.getByTestId('addToCartButton').click()

    }

    async validateParcelIsAdded(){

        const popup = this.page.locator('._heading_1nd49_151')
        await expect(popup).toBeVisible()
        const message = await popup.textContent()
        expect(message).toMatch('Parcel label has been added to your cart')

        await this.page.waitForLoadState('networkidle')

        expect(this.parcelSizeSelected).toHaveText(testdata.parcelSize)

        expect(this.page.getByTestId('toCheckoutButton')).toBeVisible()

    }

    async clickCheckOut(){

        expect(this.page.getByTestId('toCheckoutButton')).toBeVisible()

        this.page.getByTestId('toCheckoutButton').click()

        await this.page.waitForTimeout(3000)

    }

}






