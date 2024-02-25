const {test, expect} = require('@playwright/test');

class CommonPageObjects
{
constructor(page)
{
    this.page = page;
    this.searchButton = page.locator('textArea[aria-label="Search"]', { exact: true });
    this.suggestions= page.locator('ul[role="listbox"] li');
    this.amazonShoppingLink = page.locator("//span[contains(text(),'Shop online at Amazon')]");
    this.amazonRegistrationLink=page.locator('//a[contains(@href,"https://www.amazon.in/ap/register")]');
    this.popupSelector=page.frameLocator('iframe[name="callout"]');

}

async findAmazonSearchLink(searchValue)
{
  
    await this.page.waitForSelector('ul[role="listbox"] li', { state: 'visible' });
    const suggestcount=await this.suggestions.count();
    for (let i = 1; i < suggestcount; i++) {
        const suggestionValue = await this.suggestions.nth(i).getAttribute("data-entityname");
        console.log(suggestionValue);
        if (suggestionValue && suggestionValue.includes(searchValue)) {
          await this.suggestions.nth(i).click(); 
          break; 
        }
      }

}
getUrlWait(urlValue)
{
  return this.page.waitForURL(`**/*${urlValue}*`);
}

async navigateToShoppingLink(urlContainsText)
{
    await this.getUrlWait(urlContainsText);
    await this.amazonShoppingLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    //await this.page.waitForLoadState('networkidle');


}
async navigateToCreateAccountLink(urlContainsText)
{
    await this.getUrlWait(urlContainsText);
    await this.amazonRegistrationLink.click();

}

async goTo(url)
{
    await this.page.goto(url);
}
async handlePopUp(){
    let popupExists = false;
  try {
    await this.page.waitForSelector('iframe[name="callout"]', { timeout: 3000 }); 
    popupExists = true;
  } catch (error) {
    console.log('Popup did not appear within timeout.');
  }
  if (popupExists) {
    await this.popupSelector.getByLabel('Stay signed out').click();
  }
}
async enterValue(locator,text){
  if (this[locator]) {
    await this[locator].fill(text);
}
}
 

}
module.exports = {CommonPageObjects};