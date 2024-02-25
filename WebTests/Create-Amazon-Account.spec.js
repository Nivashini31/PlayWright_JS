
const {test,expect} =require('@playwright/test');
const {AllPageManager} = require('../WebPageObjects/AllPageManager');
const testData = require('../WebData/AmazonAppData.json');

test.use({
  launchOptions: {
    headless: false, // Run the browser in non-headless mode
  },
});

test.describe('Amazon Account', () => {
  let page;
  let context;
  let allPageManager;

  test.beforeAll(async ({ browser }) => {
  
    context = await browser.newContext();
   page = await context.newPage();
   allPageManager = new AllPageManager(page);
  });

  //Go to google and Click amazon registration link
  test('Click Amazon Registration link', async ({  }) => {
  
  const commonPage = allPageManager.getCommonPageObjects();
  await commonPage.goTo(testData.commonData.url);
  await commonPage.handlePopUp();
  await commonPage.enterValue('searchButton',testData.createAccountData.searchGoogleOption);
  await commonPage.findAmazonSearchLink("link");
  await commonPage.navigateToCreateAccountLink("registration")
  
 
  });

  //Validate the error message when phone number is not valid & when the password field is empty
  test('Create Account in Amazon - Validate Error Message', async ({  }) => {
    const createAccountPage = allPageManager.getCreateAccountObjects();

    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');

    await createAccountPage.fillUserName(testData.createAccountData.userName);
    await createAccountPage.fillUserPhoneNumber(testData.createAccountData.userPhoneNumber);
    await createAccountPage.clickContinue();

    const actualInvalidPhoneNumberMessage = await createAccountPage.getInvalidPhoneNumberMessage();
    expect(actualInvalidPhoneNumberMessage.trim()).toContain(testData.createAccountData.expectedInvalidPhoneNumberMessage);

    const actualEmptyPasswordMessage = await createAccountPage.getEmptyPasswordMessage();
    expect(actualEmptyPasswordMessage.trim()).toContain(testData.createAccountData.expectedEmptyPasswordMessage);


    });

 
});


