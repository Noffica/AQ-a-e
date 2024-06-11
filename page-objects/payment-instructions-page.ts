import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class PaymentInstructionsPage extends BasePage
{
  readonly page: Page;
  // readonly pageHeadingIdentifier: [string, { name: string }] = ['heading', { name: 'Payment instructions' }];
  readonly pageHeadingElement: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    // this.pageHeadingIdentifier = ['heading', { name: 'Payment instructions' }];
    this.pageHeadingElement = page.getByRole('heading', { name: 'Payment instructions' });
  }

  async confirmSuccessfulPageLoad() {
    // await expect(this.page.getByRole(...this.pageHeadingIdentifier)).toBeVisible();
    await expect(this.pageHeadingElement).toBeVisible();
  }
} //end of class

