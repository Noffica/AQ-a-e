import { Locator, Page, expect } from "@playwright/test";
import * as financials from "../utils/financials";
import { BasePage } from "./base-page";

export class TransactionDetailsPage extends BasePage
{
  readonly page: Page;

  constructor(page: Page)
  {
    super(page);
    this.page = page;
  }

  /**
   * This method returns the locator for the "Continue" button.
   *
   * @returns {Locator} The locator for the "Continue" button.
   */
  get continueButton(): Locator {
    return this.page.getByRole('button', { name: "Continue" });
  }

  async jumpTo() {
    await this.page.goto(`${process.env.WELCOME_PAGE_URL}/payment/method`);
  }

  /**
   * This method confirms the successful loading of the transaction details page.
   * It checks for the visibility of certain elements on the page which are deemed most relevant to the function of the page.
   * It also checks for specific attributes in some of these elements.
   *
   * @async
   */
  async confirmSuccessfulPageLoad() {
    // Confirm the 'Continue' button is disabled upon initial load/arrival
    expect(
      await this.continueButton.getAttribute('class')
    ).toContain('Mui-disabled');
    expect(
      await this.continueButton.getAttribute('disabled')
    ).not.toBeNull();

    // Financial info.
    let feeValueText              = financials.feeValueText,
        amountWithoutFeeValueText = financials.amountWithoutFeeValueText,
        amountWithFeeText         = financials.amountWithFeeText

    // Only elements containing logic-dependent info. are asserted
    await Promise.all([
      expect(this.page.getByRole('heading', { name: feeValueText })).toBeVisible(), //e.g. "$0.20 USD (0.20% of amount)"
      expect(this.page.getByRole('heading', { name: amountWithoutFeeValueText })).toBeVisible(), //e.g. "$100 USD"
      expect(this.page.getByRole('heading', { name: amountWithFeeText })).toBeVisible() //e.g. "$100.20 USD"
    ]);
  }

  /**
   * This method selects the asset and network type on the transaction details page.
   * It first clicks on the asset dropdown and selects the asset by its abbreviation.
   * If the asset is 'USDT', it also clicks on the network dropdown and selects the network by its abbreviation.
   *
   * @param {string} assetAbbreviation - The abbreviation of the asset to select.
   * @param {string} [networkAbbreviation] - The abbreviation of the network to select. Optional.
   * @async
   */
  async makeAssetSelection(assetAbbreviation: string, networkAbbreviation?: string) {
    await this.page.locator('#mui-component-select-cryptoType').click();
    // await this.page.getByLabel('Select asset').click();
    await this.page.getByRole('option', { name: assetAbbreviation }).click();

    if (assetAbbreviation === 'USDT') {
      await this.page.locator('#mui-component-select-networkType').click();
      await this.page.getByRole('option', { name: networkAbbreviation }).click();
    }
  }

  /**
   * This method advances the user to the payment instructions page.
   * It first clicks the continue button, then waits for two specific API responses to ensure the page has loaded correctly.
   * The first response is from the '/api/bill' endpoint and the second is from the '/payment/status' endpoint.
   * Both responses must return a status of 200 to indicate success.
   *
   * Note: The commented out code at the end of the method was intended to check the URL of the page to ensure it ends with the correct parameters.
   * This could be used as an additional check to ensure the user has been directed to the correct page.
   *
   * @async
   */
  async advanceToPaymentInstructionsPage() {
    await this.continueButton.click();

    await this.page.waitForResponse(response =>
      response.url().includes('/api/bill') && response.status() === 200
    );
    await this.page.waitForResponse(response =>
      response.url().includes('/payment/instructions') && response.status() === 200
    );

    // let URLEnd: string;
    // if (asset === 'USDT') {
    //   URLEnd = `/payment/instructions?cryptoType=${asset}&networkType=${network?.toLowerCase()}`
    // } else {
    //   URLEnd = `/payment/instructions?cryptoType=${asset}`
    // }
    // expect(this.page.url().endsWith(URLEnd)).toBe(true);
  }
} // end of class
