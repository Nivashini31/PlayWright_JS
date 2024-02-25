const {test, expect} = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = 'input[title="Add to Shopping Cart"]';
        this.addedToCartMessage = '//div[@id="NATC_SMART_WAGON_CONF_MSG_SUCCESS"]//h1';
        this.proceedToCheckoutButton = 'input[name="proceedToRetailCheckout"]';
        this.emailInputSelector = 'input[id=ap_email]';
    }

    async addToCart() {
        await this.page.waitForSelector(this.addToCartButton, { state: 'visible', timeout: 60000 });
        await this.page.locator(this.addToCartButton).click();
    }

    async validateAddedToCart() {
        // Wait for the locator to be visible before attempting to get its text
        await this.page.waitForSelector(this.addedToCartMessage, { state: 'visible' });
        const addedToCartText = this.page.locator(this.addedToCartMessage);
        const expectedText = await addedToCartText.innerText();
        expect(expectedText.trim()).toContain("Added to Cart");
    }
    

    async proceedToCheckout() {
        await this.page.waitForSelector(this.proceedToCheckoutButton, { state: 'visible', timeout: 60000 });
        await this.page.locator(this.proceedToCheckoutButton).click();
    }

    async validateEmailInputVisible() {
        const emailInput = await this.page.locator(this.emailInputSelector);
        await emailInput.waitFor({ state: 'visible' });
       
    }
}

module.exports = { CartPage };
