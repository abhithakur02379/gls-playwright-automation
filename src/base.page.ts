import { Browser, BrowserContext, Locator, Page } from '@playwright/test'

export class BasePage {

    protected page: Page
    protected context: BrowserContext
    protected acceptAllButton: Locator  

    constructor(page: Page, context: BrowserContext) {
        this.page = page
        this.context = context
        this.acceptAllButton = page.getByRole('button', {name: 'Accept all'})

    }

    async launchApplication() {

        await this.context.clearCookies()
        await this.page.goto('https://www.gls-pakete.de/en/private-customers/parcel-shipping/parcel-configuration')
        await this.acceptCookies()

    }
    

    async acceptCookies() {

        await this.acceptAllButton.click()

    }

}
    

