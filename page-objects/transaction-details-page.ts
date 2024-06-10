import { Locator, Page, expect } from "@playwright/test";
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
    this.page = page;
    this.continueButton = page.getByRole('button', { name: "Continue" });
    this.totalAmountDueValue = page.locator('h2:has-text("$100.20 USD")');
    this.amountWithoutFeeLabel = page.locator('p:has-text("Amount without fee")');
    this.amountWithoutFeeValue = page.locator('h2:has-text("$100.00 USD")');
    this.feeLabel = page.locator('p:text-is("Fee")');
    // this.feeLabel = page.getByRole('paragraph').filter({ hasText: "Fee", exact: true });
    this.feeValue = page.locator('h2:has-text("$0.20 USD (0.20% of amount)")');
  }

  async confirmSuccessfulPageLoad() {
    // expect(
    //   await this.totalAmountDueValue.isVisible()
    // ).toBe(true);
    // expect(
      await Promise.all([
        this.totalAmountDueValue.waitFor(),
        this.amountWithoutFeeLabel.waitFor(),
        this.amountWithoutFeeValue.waitFor(),
        this.feeLabel.waitFor(),
        this.feeValue.waitFor()
      ]);
    // ).toBe(true);
    // expect(
    //   await this.amountWithoutFeeValue.isVisible()
    // ).toBe(true);
  }
}
