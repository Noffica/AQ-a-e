import { expect, Locator, Page } from "@playwright/test";
import * as financials from "../utils/financials";
import { BasePage } from "./base-page";

export class PaymentInstructionsPage extends BasePage {
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
    this.pageHeadingElement = page.getByRole("heading", { name: "Payment instructions" });
    this.instructionDetails = page.getByText("To complete payment, please send amount due to wallet below then check the payment status when you are done.");
    this.depositToWalletHeading = page.getByRole("heading", { name: "Deposit to wallet" });
    this.depositAddressLabel = page.getByText("Deposit address", { exact: true });
    this.alertMessageElement = page.getByRole("alert").filter({ has: page.getByTestId("InfoOutlinedIcon") });
    // this.amountDueValue = page.getByRole('heading')
  }

  getPageHeading(): Locator {
    return this.page.getByRole("heading", { name: "Payment instructions" });
  }

  getViewPaymentStatusButton(): Locator {
    return this.page.getByRole('button', { name: 'View payment status' });
  }

  /**
   * This method confirms that the page has loaded successfully.
   * It checks if the page heading and instruction details are visible on the page.
   *
   * Note: IF all converted crypto, wallet address and a proper QR code all appeared then…
   * … the followin methods such as `convertedCryptoAmountAppears()`, `cryptoAndNetworkSymbolsAppear()` etc.…
   * … would be rendered private, and be made part of this umbrella method
   * They are kept separate so as to highlight non-operational functionality in tests
   * @returns {Promise<void>}
   */
  async confirmSuccessfulPageLoad() {
    await Promise.all([
      expect(this.pageHeadingElement).toBeVisible(),
      expect(this.instructionDetails).toBeVisible(),
      expect(this.depositToWalletHeading).toBeVisible(),
      expect(this.depositAddressLabel).toBeVisible(),
      expect(this.alertMessageElement).toContainText("You have 9:"), // this assumes that there are still 9:xx minutes remaining when the browser arrives at this page
      expect(this.alertMessageElement).toContainText(" to complete payment"),
    ]);
  }

  /**
   * Due to an issue, only the crypto asset symbol appears, not the amount.
   * Only pseudo-code is provided as actual code cannot be confirmed as not/working since it can't be run.
   * 1. read text of element
   * 2. extract the number
   * 3. utilise a pre-approved library/API/package which offers conversion of fiat to crypto currencies
   * 4. convert 100.2 USD using that into the selected crypto
   * 5. compare with the extracted number from the page
   */
  async convertedCryptoAmountAppears() {}

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
      this.page.getByRole("heading", { name: crypto }),
    ).toBeVisible();

    // let networkToCheck = financials.cryptoNetworkMap[crypto] || network;
    await expect(
      this.page.getByText(network || financials.cryptoNetworkMap[crypto]),
    ).toBeVisible();
  }

  /**
   * Since the wallet address is *not* being generated, the QR code corresponds to nothing
   * Only pseudo-code is provided as actual code cannot be confirmed as not/working since it can't be run
   * 1. Read the SVG of the QR code
   * 2. Use a pre-approved library/package to parse it and extract the wallet address from it
   * 3. Compare it with the address read from the page
   */
  async generatedQRCodeMatchesWalletAddress() {}

  async advanceToPaymentStatusPage() {
    await this.getViewPaymentStatusButton().click();
    await this.page.waitForResponse(response =>
      response.url().includes('/payment/status') && response.status() === 200
    );
  }
} //end of class
