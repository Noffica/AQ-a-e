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

  // TODO: remove if un-needed
  // test.afterAll(async () => {
  //   await context.close();
  // });

  test('advances from "Welcome" to "Transaction details" page', async () => {
    // TODO: check for confirmation (alert) message upon _login_
    await welcomePage.advanceToTransactionDetailsPage();
    await transactionDetailsPage.confirmSuccessfulPageLoad();
  });

  test.describe("Select first crypto asset with which to pay", () => {
    let cryptoAsset = "USDT",
        network     = "TRON";

    test("makes first asset selection", async () => {
      await transactionDetailsPage.makeAssetSelection(cryptoAsset, network);
      // await transactionDetailsPage.makeNetworkSelection('TRON');

      await transactionDetailsPage.advanceToPaymentInstructionsPage();
      await paymentInstructionsPage.confirmSuccessfulPageLoad();
    });

    test.describe("Missing: crypto amount, wallet address. Present: crypto symbol, network", async () => {
      // Please see comments of paymentInstructionsPage.confirmSuccessfulPageLoad()
      test.skip('converted value in selected crypto asset appears on "Payment instructions" page', async () => {
        paymentInstructionsPage.convertedCryptoAmountAppears();
      });

      test("confirms crypto and network symbols appear", async () => {
        await paymentInstructionsPage.cryptoAndNetworkSymbolsAppear(cryptoAsset, network);
      });

      test.skip("confirms QR code on page for wallet corresponds to address", async () => {
        await paymentInstructionsPage.generatedQRCodeMatchesWalletAddress();
      });
    });

    test.afterAll(async () => {
      await paymentInstructionsPage.goBack();
    });
  });

  test.describe("Change decision and select another crypto asset", () => {
    let cryptoAsset = "USDC";

    test("makes another asset selection and then moves forward", async () => {
      await transactionDetailsPage.makeAssetSelection(cryptoAsset);
      await transactionDetailsPage.advanceToPaymentInstructionsPage();
      await paymentInstructionsPage.confirmSuccessfulPageLoad();
      await paymentInstructionsPage.cryptoAndNetworkSymbolsAppear(cryptoAsset);
    });
  });

  test.describe("Moving on to viewing payment status", () => {
    test("ps p", async () => {
      await paymentInstructionsPage.advanceToPaymentStatusPage();
      await paymentStatusPage.confirmSuccessfulPageLoad();
      await paymentStatusPage.makeAPayment();
      await paymentStatusPage.verifyHandOffToTransactionDetailsPage();
      await transactionDetailsPage.confirmSuccessfulPageLoad();
    });
  });

  //see https://github.com/microsoft/playwright/blob/main/tests/library/permissions.spec.ts#L155
    // test("Clipboard has contents when icon clicked", async ({ browserName, context }) => {
    //   test.skip(browserName === "firefox", "Firefox does not have permissions to clipboard");

    //   await context.grantPermissions(["clipboard-read"]);
    //   //<div role="presentation" class="MuiSnackbar-root MuiSnackbar-anchorOriginBottomCenter mui-1ozswge"><div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-standardSuccess MuiAlert-standard mui-df3o7i" role="alert" style="opacity: 1; transform: none; transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;" direction="up"><div class="MuiAlert-icon mui-1l54tgj"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-check" class="svg-inline--fa fa-circle-check " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="22"><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"></path></svg></div><div class="MuiAlert-message mui-1xsto0d">Copied to clipboard</div><div class="MuiAlert-action mui-1mzcepu"><button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit MuiIconButton-sizeSmall mui-q28n79" tabindex="0" type="button" aria-label="Close" title="Close"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall mui-1k33q06" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg><span class="MuiTouchRipple-root mui-w0pj6f"></span></button></div></div></div>
    // });
});
