import { Browser, BrowserContext, test } from "@playwright/test";
// import { TransactionDetailsPage } from "../page-objects/transaction-details-page";
import { WelcomePage } from "../page-objects/welcome-page";

test.describe("Welcome page", () => {
  let browser: Browser;
  let context: BrowserContext;
  let welcomePage: WelcomePage;
  // let transactionDetailsPage: TransactionDetailsPage;

  test.beforeAll(async({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    welcomePage = new WelcomePage(page);
  });

  // TODO: remove if un-needed
  // test.afterAll(async () => {
  //   await context.close();
  // });

  test('go past "Welcome" page', async () => {
    await welcomePage.goTo();
    await welcomePage.fillCustomerReferenceID();
    await welcomePage.clickContinue();
    await welcomePage.verifyHandOffToTransactionDetailsPage();
    // transactionDetailsPage = new TransactionDetailsPage(welcomePage.page);
    // await transactionDetailsPage.confirmSuccessfulPageLoad();
  });
});

