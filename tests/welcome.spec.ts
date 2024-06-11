import { test } from "@playwright/test";
import { TransactionDetailsPage } from "../page-objects/transaction-details-page";
import { WelcomePage } from "../page-objects/welcome-page";

test.describe("Welcome page", () => {
  // TODO: clean-up
    // let browser: Browser;
    // let context: BrowserContext;
  let welcomePage: WelcomePage;
  let transactionDetailsPage: TransactionDetailsPage;

  test.beforeAll(async({ browser, browserName }) => {
    const context = await browser.newContext();
    if (browserName !== 'firefox') { //see https://github.com/microsoft/playwright/blob/main/tests/library/permissions.spec.ts#L155
      await context.grantPermissions(['clipboard-read']);
    }
    const page = await context.newPage();
    welcomePage = new WelcomePage(page);
    transactionDetailsPage = new TransactionDetailsPage(page);
  });

  // TODO: remove if un-needed
    // test.afterAll(async () => {
    //   await context.close();
    // });

  test('advances from "Welcome" to "Transaction details" page', async () => {
    await welcomePage.advanceToTransactionDetailsPage();
    await transactionDetailsPage.confirmSuccessfulPageLoad();
  });

  test('makes first asset selection', async () => {
    await transactionDetailsPage.makeAssetSelection('USDC');
    // await transactionDetailsPage.makeNetworkSelection('TRON');

    await transactionDetailsPage.advanceToPaymentInstructionsPage();
  });

  test('clipboard', async ({ browserName }) => {
    test.skip(browserName === 'firefox', 'Clipboard permissions inaccessible in Firefox'); //see https://github.com/microsoft/playwright/blob/main/tests/library/permissions.spec.ts#L155
  });
});
