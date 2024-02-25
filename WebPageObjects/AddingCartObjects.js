const {test, expect} = require('@playwright/test');
const { CartPage } = require('./CartPage');
class AddingCartObjects
{
constructor(page)
{
    this.page = page;
    this.amazonSearchBox =  page.locator('input[id=twotabsearchtextbox]');
    this.fourStarFilter = 'section[aria-label="4 Stars & Up"]';
    this.productSelector='div[data-cy="title-recipe"] h2 a span';
    this.favChocolateSelector = (chocolateName) => `//a/span[contains(text(), '${chocolateName}')]`;
    this.products =page.locator('div[data-cy="title-recipe"] h2 a span');

}
async getPageLocator(locator){
    await this.getPageLocator(locator);
}
async searchAndClickItem(searchValue)
{
  
   await this.amazonSearchBox.fill(searchValue);
   await this.page.getByLabel('chocolate', { exact: true }).click();


}
async waitForLocatorVisible(locatorName) {
    await this.page.waitForSelector(this[locatorName], { state: 'visible' });
}

async getFavProduct(){
    const favProductSelector = `//a/span[contains(text(), '${favChocolate}')]`;
    const favProductElement = page.locator(favProductSelector);
    await favProductElement.scrollIntoViewIfNeeded();
}
async navigateToFavoriteChocolate(chocolateName) {
    const favChocolateElement = this.page.locator(this.favChocolateSelector(chocolateName));
    await favChocolateElement.scrollIntoViewIfNeeded();
    const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        favChocolateElement.click(),
    ]);
    return new CartPage(newPage); // Assuming you have a CartPage class defined similar to this
}

async clickElement(locatorName){
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.locator(this[locatorName]).click();
    

}
async getProductCount(){
    const productCount = await this.products.count();
    console.log(productCount);
}

async getUrlWait(urlValue)
{
    return  this.page.waitForURL("**/*'"+urlValue+"'*");
}

async navigateShoppingLink()
{
    await this.getUrlWait("shopping").waitFor;
    await this.amazonShoppingLink.click();

}

 

}
module.exports = {AddingCartObjects};