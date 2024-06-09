import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class TransactionDetailsPage extends BasePage
{
  readonly page: Page;
  readonly totalAmountDueValue: Locator; //h2
  readonly amountWithoutFeeLabel: Locator; //p
  readonly amountWithoutFeeValue: Locator; //h2
  readonly feeLabel: Locator; //p
  readonly feeValue: Locator; //h2
  readonly continueButton: Locator;
  // readonly selectPaymentAssetMessage: Locator; //p[text=Select an asset to pay for this service]

  constructor(page: Page) {
    super(page);
    this.continueButton = page.getByRole('button', { name: "Continue" });
    this.totalAmountDueValue = page.locator('h2:has-text("$100.20 USD")');
    this.amountWithoutFeeLabel = page.locator('p:has-text("Amount without fee")');
    this.amountWithoutFeeValue = page.locator('h2:has-text("$100.00 USD")');
    this.feeLabel = page.locator('p:has-text("Fee")');
    this.feeValue = page.locator('h2:has-text("$0.20 USD (0.20% of amount)")');
  }

  confirmSuccessfulPageLoad() {
    expect(this.areAllElementsVisible).toBe(true);
  }
} // end of class
