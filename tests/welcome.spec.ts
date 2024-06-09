import { BrowserContext, test } from "@playwright/test";
import { WelcomePage } from "../page-objects/welcome-page";

test.describe("Welcome page", () => {
  let context: BrowserContext;
  let welcomePage: WelcomePage;

  test.beforeAll(async({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    welcomePage = new WelcomePage(page);
  });

  // test.afterAll(async () => {
  //   await context.close();
  // });

  test('go past "Welcome" page', async () => {
    await welcomePage.goTo();
    await welcomePage.fillCustomerReferenceID();
    await welcomePage.clickContinue();
  });
});

