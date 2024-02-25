Playwright Amazon Test Automation Project:

This README outlines the organization and usage of a Playwright project designed for automating functionalities on the Amazon website. The project structure is divided into three main directories: webData, webPageObjects, and webTests, facilitating a clean separation of concerns and making the test suite easier to maintain and scale.

Project Structure:

webData/: Contains JSON files with test data. This directory is used to store data required for tests, such as user credentials, search keywords, and product details, keeping the test scripts clean and data-driven.
webPageObjects/: Houses the Page Object Models (POM). Each file within this directory corresponds to a page or a component on the Amazon website, encapsulating all locators and functions related to that page/component. This abstraction enhances test maintenance and readability.
webTests/: Contains the test case scripts. These scripts utilize the Page Objects from webPageObjects/ and the test data from webData/ to define the test flows. The tests are structured to reflect user scenarios on the Amazon website.

Run All Tests:

To execute all tests within your project, use the following command:
npx playwright test



