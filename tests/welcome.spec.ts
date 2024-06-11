import { test } from "@playwright/test";
import { PaymentInstructionsPage } from "../page-objects/payment-instructions-page";
import { TransactionDetailsPage } from "../page-objects/transaction-details-page";
import { WelcomePage } from "../page-objects/welcome-page";

test.describe("Welcome page", () => {
  // TODO: clean-up
    // let browser: Browser;
    // let context: BrowserContext;
  let welcomePage: WelcomePage;
  let transactionDetailsPage: TransactionDetailsPage;
  let paymentInstructionsPage: PaymentInstructionsPage;

  test.beforeAll(async({ browser, browserName }) => {
    const context = await browser.newContext();
    if (browserName !== 'firefox') { //see https://github.com/microsoft/playwright/blob/main/tests/library/permissions.spec.ts#L155
      await context.grantPermissions(['clipboard-read']);
    }
    const page = await context.newPage();
    welcomePage = new WelcomePage(page);
    transactionDetailsPage = new TransactionDetailsPage(page);
    paymentInstructionsPage = new PaymentInstructionsPage(page);
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
    let cryptoAsset = 'USDT',
        network     = 'TRON';
    await transactionDetailsPage.makeAssetSelection(cryptoAsset, network);
    // await transactionDetailsPage.makeNetworkSelection('TRON');

    await transactionDetailsPage.advanceToPaymentInstructionsPage();
    await paymentInstructionsPage.confirmSuccessfulPageLoad();
  });

  test('clipboard', async ({ browserName }) => {
    test.skip(browserName === 'firefox', 'Clipboard permissions inaccessible in Firefox'); //see https://github.com/microsoft/playwright/blob/main/tests/library/permissions.spec.ts#L155
  });
});
