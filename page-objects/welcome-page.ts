import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class WelcomePage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  /**
   * Gets the locator for the "Continue" button.
   * @returns {Locator} The locator for the "Continue" button.
   */
  get continueButton(): Locator {
    return this.page.getByRole("button", { name: "Continue" });
  }

  /**
   * Gets the locator for the "Enter Customer Reference ID" field.
   * @returns {Locator} The locator for the "Enter Customer Reference ID" field.
   */
  get customerReferenceIDField(): Locator {
    return this.page.getByLabel("Enter Customer Reference ID");
  }

  /**
   * Advances to the transaction details page.
   * @async
   */
  async fillCustomerRefIDAndAdvance() {
    await this._fillCustomerReferenceID();
    await this._clickContinue();
    await this._verifyHandOffToTransactionDetailsPage();
  }

  /**
   * Navigates to the welcome page URL.
   * @async
   */
  async goTo() {
    await this.page.goto(process.env.WELCOME_PAGE_URL);
  }

  /**
   * Fills the customer reference ID field.
   * @param {string} [customerReferenceID] - The customer reference ID to fill. Optional.
   * @private
   * @async
   */
  private async _fillCustomerReferenceID(customerReferenceID?: string) {
    const id = customerReferenceID || process.env.CUSTOMER_REFERENCE_ID;
    await this.customerReferenceIDField.fill(id);
  }

  /**
   * Clicks the "Continue" button.
   * @private
   * @async
   */
  private async _clickContinue() {
    await this.continueButton.click();
  }

  /**
   * Verifies the handoff to the transaction details page.
   * Waits for the login and KYC API calls to complete.
   * @private
   * @async
   */
  private async _verifyHandOffToTransactionDetailsPage() {
    // Wait for the login API call to complete
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/api/login") && response.status() === 200,
    );
    // Wait for the KYC API call to complete
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/kyc") && response.status() === 200,
    );
  }
} //end of class
