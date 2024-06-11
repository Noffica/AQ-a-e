import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import * as financials from "../utils/financials";

export class TransactionDetailsPage extends BasePage
{
  readonly page: Page;
  readonly totalAmountDueValue: Locator; //h2
  // readonly amountWithoutFeeLabel: Locator; //p
  readonly amountWithoutFeeValue: Locator; //h2
  // readonly feeLabel: Locator; //p
  readonly feeValue: Locator; //h2
  // readonly continueButton: Locator;
  // readonly selectPaymentAssetMessage: Locator; //p[text=Select an asset to pay for this service]


  constructor(page: Page) {
    super(page);
    this.page = page;
    // this.continueButton = page.getByRole('button', { name: "Continue" });
    // this.totalAmountDueValue = page.locator('h2:has-text("$100.20 USD")');
    // this.amountWithoutFeeLabel = page.locator('p:has-text("Amount without fee")');
    // this.amountWithoutFeeValue = page.locator('h2:has-text("$100.00 USD")');
    // this.feeLabel = page.locator('p:text-is("Fee")');
    // this.feeLabel = page.getByRole('paragraph').filter({ hasText: "Fee", exact: true });
    // this.feeValue = page.locator('h2:has-text("$0.20 USD (0.20% of amount)")');
  }

  async confirmSuccessfulPageLoad() {
    // Confirm the 'Continue' button is disabled upon initial load/arrival
    let continueButton: Locator = this.page.getByRole('button', { name: "Continue" });
    expect(
      await continueButton.getAttribute('class')
    ).toContain('Mui-disabled');
    expect(
      await continueButton.getAttribute('disabled')
    ).not.toBeNull();

    let currencyAbbr: string             = financials.currencyAbbr,//process.env.CURRENCY_ABBR,
        monetaryAmountWithoutFee: string = financials.monetaryAmountWithoutFee,//parseFloat(process.env.MONETARY_AMOUNT_WITHOUT_FEE).toFixed(2),
        feeValue: string                 = financials.feeCalculator(); //this.feeCalculator();
    let feeValueText              = `\$${feeValue} ${currencyAbbr} (${process.env.FEE_PERCENT}\% of amount)`, //e.g. "$0.20 USD (0.20% of amount)"
        amountWithoutFeeValueText = `\$${monetaryAmountWithoutFee} ${currencyAbbr}`, //e.g. "$100 USD"
        amountWithFee             = `\$${(parseFloat(feeValue) + parseFloat(monetaryAmountWithoutFee)).toFixed(2)} ${currencyAbbr}` //e.g. "$100.20 USD"

    // Only elements containing logic-dependent info. are asserted
    await Promise.all([
      // this.totalAmountDueValue.waitFor(),
      // this.amountWithoutFeeLabel.waitFor(),
      // this.amountWithoutFeeValue.waitFor(),
      // this.feeLabel.waitFor(),
      // this.feeValue.waitFor()
      // feeValueElement.waitFor()
      this.page.getByRole('heading', { name: feeValueText }).isVisible(), //e.g. "$0.20 USD (0.20% of amount)"
      this.page.getByRole('heading', { name: amountWithoutFeeValueText }).isVisible(), //e.g. "$100 USD"
      this.page.getByRole('heading', { name: amountWithFee }).isVisible() //e.g. "$100.20 USD"
    ]);
  }

  feeCalculator(dollarNumber?: number, feeAsPercent?: number): string {
    let referenceNumber = dollarNumber || Number(process.env.MONETARY_AMOUNT_WITHOUT_FEE);
    let percentage = feeAsPercent || Number(process.env.FEE_PERCENT);
    return (percentage/100 * referenceNumber).toFixed(2);
  }
} // end of class
