import { test } from "@playwright/test";
import { PaymentStatusPage } from "../page-objects/payment-status-page";
import { TransactionDetailsPage } from "../page-objects/transaction-details-page";

test.describe("Payment status", () => {
  test.describe.configure({ mode: "serial" });

  let transactionDetailsPage: TransactionDetailsPage,
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

    transactionDetailsPage = new TransactionDetailsPage(page);
    paymentStatusPage = new PaymentStatusPage(page);
  });

  // Allow execution of all spec files
    // test.afterAll(async({ browser }) => {
    //   await browser.close();
    // });

  test('arrives at "Payment status"', async() => {
    await paymentStatusPage.jumpTo();
    await paymentStatusPage.confirmSuccessfulInitialPageLoad();
  });

  test('attempts to make a payment → navigates to "Transaction details"', async() => {
    await paymentStatusPage.makeAPayment();
    await transactionDetailsPage.confirmSuccessfulPageLoad();
  });
});
