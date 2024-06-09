import { Locator, Page, expect } from "@playwright/test";
import { TransactionDetailsPage } from "./transaction-details-page";
import { BasePage } from "./base-page";

export class WelcomePage extends BasePage
{
  readonly continueButton: Locator;
  readonly customerReferenceIDField: Locator;

  constructor(page: Page) {
    super(page);

    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.customerReferenceIDField = page.locator('input#customerReferenceId[name="customerReferenceId"]');
  }

  async goTo() {
    await this.page.goto(process.env.WELCOME_PAGE_URL);
  }

  async fillCustomerReferenceID(customerReferenceID?: string) {
    const id = customerReferenceID || process.env.CUSTOMER_REFERENCE_ID;
    await this.customerReferenceIDField.fill(id);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async verifyHandOffToTransactionDetailsPage() {
    // Wait for the login API call to complete
    await this.page.waitForResponse(response =>
      response.url() === 'https://checkout-dev.aquanow.io/api/login'
      &&
      response.status() === 200
    );
    // Wait for the KYC API call to complete
    await this.page.waitForResponse(response =>
      response.url() === 'https://checkout-dev.aquanow.io/rowan/3eb00b7e727b41218bc4964635fc2288/kyc?_rsc=efuaq'
      &&
      response.status() === 200
    );

    const transactionDetailsPage = new TransactionDetailsPage(this.page);

    // Confirm the 'Continue' button is disabled *and* that interaction with it has no effect
    expect(
      await transactionDetailsPage.continueButton.getAttribute('class')
    ).toContain('Mui-disabled');
    expect(
      await transactionDetailsPage.continueButton.getAttribute('disabled')
    ).not.toBeNull();
  }
}
