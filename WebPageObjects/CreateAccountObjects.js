const {test, expect} = require('@playwright/test');
class CreateAccountObjects{
constructor(page) {
    this.page = page;
    this.userNameInput = page.locator('input[id="ap_customer_name"]');
    this.userPhoneNumberInput = page.locator('input[id="ap_phone_number"]');
    this.continueButton = page.locator('input[id="continue"]');
    this.invalidPhoneNumberMessage = page.locator('#auth-phoneNumber-invalid-phone-alert div .a-alert-content');
    this.emptyPasswordMessage = page.locator('#auth-password-missing-alert div .a-alert-content');
}

async fillUserName(name) {
    await this.userNameInput.fill(name);
}

async fillUserPhoneNumber(phoneNumber) {
    await this.userPhoneNumberInput.fill(phoneNumber);
}

async clickContinue() {
    await this.continueButton.click();
}

async getInvalidPhoneNumberMessage() {
    return this.invalidPhoneNumberMessage.innerText();
}

async getEmptyPasswordMessage() {
    return this.emptyPasswordMessage.innerText();
}
}

module.exports = {CreateAccountObjects};