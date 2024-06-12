import { Locator, Page, expect } from "@playwright/test";
import * as financials from "../utils/financials";
import { BasePage } from "./base-page";

export class PaymentStatusPage extends BasePage
{
  constructor(page: Page)
  {
    super(page);
  }

  /**
   * This method confirms the successful loading of the payment status page.
   * It checks for the visibility of various elements on the page such as headings, alerts, and icons.
   * It also checks for specific text in some of these elements.
   *
   * The 'Amount remaining' and 'Outstanding amount' do *not* have unique identifiers…
   * … therefore, they cannot be asserted under any recommended practice…
   * … See https://playwright.dev/docs/locators#works-fine-with-multiple-elements
   *
   * The test for the 'alert' element expects it to be the earlier element in the DOM as it is in the header
   *
   * @async
   */
  async confirmSuccessfulPageLoad() {
    // await this.confirmCustomerReferenceID();
    await Promise.all([
      expect(
        this.page.getByRole('heading', { name: 'Payment status' })
      ).toBeVisible(),
      expect(
        this.page.getByRole('alert').first()
      ).toHaveText('There is a balance owing on your account. Please make a payment to complete this transaction.'),
      expect(
        this.page.getByTestId('payment-status')
      ).toHaveText('Unpaid'),
      // expect(
      //   this.page.getByRole('heading', { name: financials.amountWithFeeText })
      // ).toBeVisible(), //this will clash and needs unique identifiers for 'Amount remaining' and 'Invoice amount'
      expect(
        this.page.getByRole('heading', { name: `$0.00 ${financials.currencyAbbr}` })
      ).toBeVisible(),
      expect(
        this.page.getByText('No payment history')
      ).toBeVisible(),
      expect(
        this.page.locator('svg[data-icon="circle-exclamation"]')
      ).toBeVisible()
    ]);
  }

  /**
   * Returns the locator for the "Make a payment" button.
   *
   * @returns {Locator} The locator for the "Make a payment" button.
   */
  getMakeAPaymentButton(): Locator {
    return this.page.getByRole('button', { name: 'Make a payment' });
  }

  /**
   * This method clicks the "Make a payment" button to initiate the payment process.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the click action is complete.
   */
  async makeAPayment(): Promise<void> {
    await this.getMakeAPaymentButton().click();
  }

  async verifyHandOffToTransactionDetailsPage() {
    await this.page.waitForResponse(response =>
      response.url().includes('/payment/method') && response.status() === 200
    );
  }
} //end of class
