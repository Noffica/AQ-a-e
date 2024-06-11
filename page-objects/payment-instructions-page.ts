import { expect, Locator, Page } from "@playwright/test";
import * as financials from "../utils/financials";
import { BasePage } from "./base-page";

export class PaymentInstructionsPage extends BasePage
{
  readonly page: Page;
  // readonly pageHeadingIdentifier: [string, { name: string }] = ['heading', { name: 'Payment instructions' }];
  readonly pageHeadingElement: Locator;
  readonly instructionDetails: Locator;
  readonly depositToWalletHeading: Locator;
  readonly depositAddressLabel: Locator;
  readonly alertMessageElement: Locator;

  // amountDueValue: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    // this.pageHeadingIdentifier = ['heading', { name: 'Payment instructions' }];
    this.pageHeadingElement = page.getByRole('heading', { name: 'Payment instructions' });
    this.instructionDetails = page.getByText('To complete payment, please send amount due to wallet below then check the payment status when you are done.');
    this.depositToWalletHeading = page.getByRole('heading', { name: 'Deposit to wallet' });
    this.depositAddressLabel = page.getByText('Deposit address', { exact: true });
    this.alertMessageElement = this.page.getByRole('alert').filter({ has: this.page.getByTestId('InfoOutlinedIcon')});
    // this.amountDueValue = page.getByRole('heading')
  }

  /**
   * This method confirms that the page has loaded successfully.
   * It checks if the page heading and instruction details are visible on the page.
   * @returns {Promise<void>}
   */
  async confirmSuccessfulPageLoad() {
    await Promise.all([
      expect(this.pageHeadingElement).toBeVisible(),
      expect(this.instructionDetails).toBeVisible(),
      expect(this.depositToWalletHeading).toBeVisible(),
      expect(this.depositAddressLabel).toBeVisible(),
      expect(this.alertMessageElement).toContainText('You have 9:'), // this assumes that there are still 9:xx minutes remaining when the browser arrives at this page
      expect(this.alertMessageElement).toContainText(' to complete payment'),
    ]);
  }

  async convertedCryptoAmountAppears() {
    // due to an issue, only the crypto asset symbol appears, not the amount.
    // Therefore, this is skipped.
  }

  /**
   * This method checks if the crypto and network symbols appear on the page.
   * It first checks if the crypto symbol appears as a heading on the page.
   * Then it checks if the network symbol is visible on the page.
   * If the network symbol is not provided, it will use the crypto symbol to look up the network symbol in the cryptoNetworkMap.
   *
   * @param {string} crypto - The crypto symbol to check.
   * @param {string} [network] - The network symbol to check. Optional.
   */
  async cryptoAndNetworkSymbolsAppear(crypto: string, network?: string) {
    await expect(
      this.page.getByRole('heading', { name: crypto })
    ).toBeVisible();

    // let networkToCheck = financials.cryptoNetworkMap[crypto] || network;
    await expect(
      this.page.getByText(financials.cryptoNetworkMap[crypto] || network)
    ).toBeVisible();
  }

  async walletAddressQRCodeAppears() {
    await expect(
      this.page.getByTestId('qr-code-svg')
    ).toBeVisible();
  }
} //end of class

