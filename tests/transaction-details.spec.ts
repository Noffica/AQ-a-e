import { test } from "@playwright/test";
import { PaymentInstructionsPage } from "../page-objects/payment-instructions-page";
import { PaymentStatusPage } from "../page-objects/payment-status-page";
import { TransactionDetailsPage } from "../page-objects/transaction-details-page";
import { WelcomePage } from "../page-objects/welcome-page";

test.describe("'Transaction details' → 'Payment instructions'", () => {
  test.describe.configure({ mode: "serial" });

  let welcomePage: WelcomePage,
      transactionDetailsPage: TransactionDetailsPage,
      paymentInstructionsPage: PaymentInstructionsPage,
      paymentStatusPage: PaymentStatusPage;

  test.beforeAll(async ({ browser, browserName }) => {
    const context = await browser.newContext();
    await context.addCookies([
      {
        name: process.env.LOGIN_COOKIE_CUST_REF_ID_NAME,
        value: process.env.LOGIN_COOKIE_CUST_REF_ID_VALUE,
        domain: process.env.LOGIN_COOKIE_DOMAIN,
        path: process.env.LOGIN_COOKIE_PATH
      }
    ]);
    const page = await context.newPage();

    welcomePage = new WelcomePage(page);
    transactionDetailsPage = new TransactionDetailsPage(page);
    paymentInstructionsPage = new PaymentInstructionsPage(page);
    paymentStatusPage = new PaymentStatusPage(page);
  });

  // Allow execution of all spec files
    // test.afterAll(async({ browser }) => {
    //   await browser.close();
    // });

  test.describe("Select first crypto asset with which to pay", () => {
    let cryptoAsset = "USDT",
        network     = "TRON";

    test('makes first asset selection', async() => {
      await transactionDetailsPage.jumpTo();

      await transactionDetailsPage.makeAssetSelection(cryptoAsset, network);

      await transactionDetailsPage.advanceToPaymentInstructionsPage();
      await paymentInstructionsPage.confirmSuccessfulPageLoad();
    });

    test.describe("Missing: crypto amount, wallet address. Present: crypto symbol, network", async () => {
      // Please see comments of paymentInstructionsPage.confirmSuccessfulPageLoad()

      test.skip('checks converted value in selected crypto asset appears on "Payment instructions" page', async () => {
        paymentInstructionsPage.convertedCryptoAmountAppears();
      });

      test('confirms crypto and network symbols appear', async () => {
        await paymentInstructionsPage.cryptoAndNetworkSymbolsAppear(cryptoAsset, network);
      });

      test.skip('confirms QR code on page for wallet corresponds to address', async () => {
        await paymentInstructionsPage.generatedQRCodeMatchesWalletAddress();
      });
    });

    test.afterAll(async () => {
      await paymentInstructionsPage.goBack();
    });
  });

  test.describe("Change decision and select another crypto asset", () => {
    let cryptoAsset = "USDC";

    test('makes another asset selection and then moves forward', async() => {
      await transactionDetailsPage.makeAssetSelection(cryptoAsset);
      await transactionDetailsPage.advanceToPaymentInstructionsPage();
      await paymentInstructionsPage.confirmSuccessfulPageLoad();
      await paymentInstructionsPage.cryptoAndNetworkSymbolsAppear(cryptoAsset);
    });
  });
});
