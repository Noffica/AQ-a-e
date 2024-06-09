import { expect, Locator, Page } from "@playwright/test";
// import { config } from "dotenv";

export class WelcomePage
{
  readonly page: Page;
  readonly continueButton: Locator;
  readonly customerReferenceIDField: Locator;
  readonly pageURL: string = "https://checkout-dev.aquanow.io/rowan/3eb00b7e727b41218bc4964635fc2288";

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.customerReferenceIDField = page.locator('input#customerReferenceId[name="customerReferenceId"]');
  }

  async goTo() {
    await this.page.goto(this.pageURL);
  }

  async fillCustomerReferenceID(customerReferenceID?: string) {
    const id = customerReferenceID || process.env.CUSTOMER_REFERENCE_ID;
    await this.customerReferenceIDField.fill(id);
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}

