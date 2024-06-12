import { test } from "@playwright/test";
import { PaymentInstructionsPage } from "../page-objects/payment-instructions-page";
import { TransactionDetailsPage } from "../page-objects/transaction-details-page";
import { WelcomePage } from "../page-objects/welcome-page";
import { PaymentStatusPage } from "../page-objects/payment-status-page";

// TODO: mark tests as serial - do **not** rely on default behaviour
test.describe("Full flow from login to check of payment status", () => {
  test.describe.configure({ mode: "serial" });

  let welcomePage: WelcomePage,
      transactionDetailsPage: TransactionDetailsPage,
      paymentInstructionsPage: PaymentInstructionsPage,
      paymentStatusPage: PaymentStatusPage;

  test.beforeAll(async ({ browser, browserName }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    welcomePage = new WelcomePage(page);
    transactionDetailsPage = new TransactionDetailsPage(page);
    paymentInstructionsPage = new PaymentInstructionsPage(page);
    paymentStatusPage = new PaymentStatusPage(page);
  });

  test.afterAll(async({ browser }) => {
    await browser.close();
  });

  test('advances from "Welcome" to "Transaction details" page', async () => {
    // TODO: check for confirmation (alert) message upon _login_
    await welcomePage.advanceToTransactionDetailsPage();
    await transactionDetailsPage.confirmSuccessfulPageLoad();
  });

  test.describe("Select first crypto asset with which to pay", () => {
    let cryptoAsset = "USDT",
        network     = "TRON";

    test('makes first asset selection', async () => {
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

    test('makes another asset selection and then moves forward', async () => {
      await transactionDetailsPage.makeAssetSelection(cryptoAsset);
      await transactionDetailsPage.advanceToPaymentInstructionsPage();
      await paymentInstructionsPage.confirmSuccessfulPageLoad();
      await paymentInstructionsPage.cryptoAndNetworkSymbolsAppear(cryptoAsset);
    });
  });

  test.describe("Checking 'Payment status'", () => {
    test('arrives at "Payment status"', async () => {
      await paymentInstructionsPage.advanceToPaymentStatusPage();
      await paymentStatusPage.confirmSuccessfulInitialPageLoad();
    });

    test('attempts to make a payment → navigates to "Transaction details"', async() => {
      await paymentStatusPage.makeAPayment();
      await transactionDetailsPage.confirmSuccessfulPageLoad();
    });
  });

  test.describe("Expired payment", () => {
    test.skip('goes to "View Payment Status"', async() => {
      // Test is skipped as it is considered unrealistic to wait for 10 minutes to arrive at this scenario
    });
    test.skip('checks "Refresh Payment"', async() => {
      // Test is skipped as it is considered unrealistic to wait for 10 minutes to arrive at this scenario
    });
  });
});
