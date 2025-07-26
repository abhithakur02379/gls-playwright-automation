import { test as base, defineConfig } from '@playwright/test'
import { BasePage } from '../src/base.page'
import { AddParcelPage } from '../src/add-parcel'
import { BuyParcelPage } from '../src/buy-parcel'



type PageFixtures = {

    basePage: BasePage,
    addParcelPage: AddParcelPage
    buyParcelPage: BuyParcelPage

}

export const test = base.extend<PageFixtures>({
    
    basePage: async ({ page, context }, use) => {
        const basePage = new BasePage(page, context)
        await use(basePage)
    },

    addParcelPage: async ({ page, context }, use) => {
        const addParcelPage = new AddParcelPage(page, context)
        await use(addParcelPage)
    },

    buyParcelPage: async ({ page, context }, use) => {
        const buyParcelPage = new BuyParcelPage(page, context)
        await use(buyParcelPage)
    },

    

})