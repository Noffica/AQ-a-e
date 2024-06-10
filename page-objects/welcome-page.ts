import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { TransactionDetailsPage } from "./transaction-details-page";

export class WelcomePage extends BasePage
{
  readonly continueButton: Locator;
  readonly customerReferenceIDField: Locator;

  constructor(page: Page) {
    super(page);

    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.customerReferenceIDField = page.getByLabel('Enter Customer Reference ID');
  }

  async advanceToTransactionDetailsPage() {
    this._goTo();
    this._fillCustomerReferenceID();
    this._clickContinue();
    this._verifyHandOffToTransactionDetailsPage();
  }

  private async _goTo() {
    await this.page.goto(process.env.WELCOME_PAGE_URL);
  }

  private async _fillCustomerReferenceID(customerReferenceID?: string) {
    const id = customerReferenceID || process.env.CUSTOMER_REFERENCE_ID;
    await this.customerReferenceIDField.fill(id);
  }

  private async _clickContinue() {
    await this.continueButton.click();
  }

  private async _verifyHandOffToTransactionDetailsPage() {
    // Wait for the login API call to complete
    await this.page.waitForResponse(response =>
      response.url().includes('/api/login')
      &&
      response.status() === 200
    );
    // Wait for the KYC API call to complete
    await this.page.waitForResponse(response =>
      response.url().includes('/kyc')
      &&
      response.status() === 200
    );

    const transactionDetailsPage = new TransactionDetailsPage(this.page);

    // Confirm the 'Continue' button is disabled
    expect(
      await transactionDetailsPage.continueButton.getAttribute('class')
    ).toContain('Mui-disabled');
    expect(
      await transactionDetailsPage.continueButton.getAttribute('disabled')
    ).not.toBeNull();
  }
}
