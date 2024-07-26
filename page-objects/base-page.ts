import { Page, expect } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Confirms the visibility of the customer reference ID on the page.
   * If a customer reference ID is provided, it will use that; otherwise, it will use the value from the environment variable `CUSTOMER_REFERENCE_ID`.
   *
   * This functionality needs to be debugged further: …
   * … customer ref. ID could **not** be seen in the top-right during tests
   *
   * @param {string} [customerReferenceID] - The customer reference ID to confirm. Optional.
   * @returns {Promise<void>} A promise that resolves when the customer reference ID is confirmed to be visible.
   */
  async confirmCustomerReferenceID(
    customerReferenceID?: string,
  ): Promise<void> {
    await expect(
      this.page.getByText(
        customerReferenceID || process.env.CUSTOMER_REFERENCE_ID,
      ),
    ).toBeVisible();
  }

  /**
   * Navigates back to the previous page in the browser history.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async goBack() {
    await this.page.goBack();
  }
} //end of class
