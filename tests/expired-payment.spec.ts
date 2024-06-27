import { test } from "@playwright/test";

test.describe("Expired payment", () => {
  test.describe.configure({ mode: "serial" });

  async function setupContextAndPage(browser) {
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
    await page.goto(`${process.env.WELCOME_PAGE_URL}/payment/expired`);
    return { context, page };
  }

  test.beforeAll(async ({ browser }) => {
    await setupContextAndPage(browser);
  });

  // Allow execution of all spec files
    test.afterAll(async({ browser }) => {
      await browser.close();
    });

  test.skip('goes to "View Payment Status"', async() => {
    // Test is skipped as it is considered unrealistic to wait for 10 minutes to arrive at this scenario
  });
  test.skip('checks "Refresh Payment"', async() => {
    // Test is skipped as it is considered unrealistic to wait for 10 minutes to arrive at this scenario
  });
});
