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

  test('advances from "Welcome" to "Transaction details" page', async() => {
    await welcomePage.advanceToTransactionDetailsPage();
    await transactionDetailsPage.confirmSuccessfulPageLoad();
  });

  test.describe('Select first crypto asset with which to pay', () => {
    test.afterAll(async() => {
      await paymentInstructionsPage.goBack();
    });

    let cryptoAsset = 'USDT',
        network     = 'TRON';

    test('makes first asset selection', async() => {
      await transactionDetailsPage.makeAssetSelection(cryptoAsset, network);
      // await transactionDetailsPage.makeNetworkSelection('TRON');

      await transactionDetailsPage.advanceToPaymentInstructionsPage();
      await paymentInstructionsPage.confirmSuccessfulPageLoad();
    });

    test.describe('Missing: crypto amount, wallet address. Present: crypto symbol, network', async() => {
      test.skip('equivalent value in selected crypto asset appears on "Payment instructions" page', async() => {
        // equivalent crypto amount does not appear; functionality is non-operational.
      });

      test('crypto and network symbols appear', async() => {
        await paymentInstructionsPage.cryptoAndNetworkSymbolsAppear(cryptoAsset, network);
      });

      test('QR code for wallet address appears', async() => {
        await paymentInstructionsPage.walletAddressQRCodeAppears();
      });

      test.skip('QR code for wallet corresponds to address', async() => {
        // generation of wallet address and corresponding QR code is non-operational.
      });
    });
  });

  test.skip('Clipboard permissions inaccessible in Firefox', async ({ browserName }) => {
    browserName === 'firefox' //see https://github.com/microsoft/playwright/blob/main/tests/library/permissions.spec.ts#L155
  });
});
