import { test } from "@playwright/test";
import { TransactionDetailsPage } from "../page-objects/transaction-details-page";
import { WelcomePage } from "../page-objects/welcome-page";

test.describe("Full flow from login to check of payment status", () => {
  test.describe.configure({ mode: "serial" });

  let welcomePage: WelcomePage,
      transactionDetailsPage: TransactionDetailsPage;

  test.beforeAll(async ({ browser, browserName }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    welcomePage = new WelcomePage(page);
    transactionDetailsPage = new TransactionDetailsPage(page);
  });

  // Allow execution of all spec files
    // test.afterAll(async({ browser }) => {
    //   await browser.close();
    // });

  test.describe("Welcome", () => {
    test('advances from "Welcome" to "Transaction details" page', async () => {
      await welcomePage.goTo();
      await welcomePage.fillCustomerRefIDAndAdvance();
      await transactionDetailsPage.confirmSuccessfulPageLoad();
    });
  });

  test.describe("Negative tests", () => {
    // test.beforeAll(...)
    // await welcomePage.goTo()
    test.fixme('fails to advance IF customer reference ID is incorrect', async() => {});
    test.fixme('fails to advance IF customer reference ID is left blank', async() => {});
  });
});
