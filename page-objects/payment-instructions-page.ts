import { Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class PaymentInstructionsPage extends BasePage
{
  readonly page: Page;
  readonly pageHeadingElement: [string, { name: string }] = ['heading', { name: 'Payment instructions' }];

  constructor(page: Page) {
    super(page);
    this.page = page;
    // this.pageHeadingElement = ['heading', { name: 'Payment instructions' }];
  }

  async confirmSuccessfulPageLoad() {
    await expect(this.page.getByRole(...this.pageHeadingElement)).toBeVisible();
  }
} //end of class

