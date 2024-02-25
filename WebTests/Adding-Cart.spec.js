
const {test,expect} =require('@playwright/test');
const {AllPageManager} = require('../WebPageObjects/AllPageManager');
const testData = require('../WebData/AmazonAppData.json');
test.use({
  launchOptions: {
    headless: false, // To Run the browser in non-headless mode
  },
});

test.describe('Amazon Shopping Cart', () => {
  let page;
  let context;
  let cartPage;
  let allPageManager;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
   page = await context.newPage();
   allPageManager = new AllPageManager(page);
   
  });
//Go to google.com and click Amazon Shopping Link
  test('Click Amazon shopping link', async ({  }) => {
  const commonPage = allPageManager.getCommonPageObjects();
  await commonPage.goTo(testData.commonData.url);
  await commonPage.handlePopUp();
  await commonPage.enterValue('searchButton', testData.addCartItem.searchGoogleOption); 
  await commonPage.findAmazonSearchLink(testData.addCartItem.searchText);
  await commonPage.navigateToShoppingLink(testData.addCartItem.searchText);
  
  });

  //Search for the item and find the count of that item
  test('Get the products & display the count', async ({}) => {

    const addCartPage = allPageManager.getAddingCartObjects();
  
   await addCartPage.searchAndClickItem(testData.addCartItem.searchItem);
   await addCartPage.waitForLocatorVisible(testData.addCartItem.filterValue);
   await addCartPage.clickElement(testData.addCartItem.filterValue);
   await addCartPage.waitForLocatorVisible('productSelector');
   await addCartPage.getProductCount();
    
  });
  
//Click the favourite chocolate and add to cart
  test('Click the favourite chocolate and add to Cart', async ({  }) => {

    const productCartPage = allPageManager.getAddingCartObjects();
    cartPage = await productCartPage.navigateToFavoriteChocolate(testData.addCartItem.favChocolate);
    await cartPage.addToCart();

  });

//Validate the success message after adding to the cart
  test('Validate whether Added to cart message got displayed', async ({  }) => {

    await cartPage.validateAddedToCart();
    await cartPage.proceedToCheckout();
    await cartPage.validateEmailInputVisible();
      
  });
  
});


