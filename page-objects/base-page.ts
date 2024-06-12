import { Locator, Page } from "@playwright/test";

export class BasePage
{
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

      // async areAllElementsVisible(): Promise<boolean> {
      //   let visibilityChecks = [];

      //   // Use reflection to iterate over the properties of the sub-class instance
      //   // for (let property in this) {
      //   //   if (this[property] && typeof (this[property] as Locator).isVisible === 'function') {
      //   //     visibilityChecks.push(((this[property] as Locator)).isVisible());
      //   //   }
      //   // }

      //   for (let property in this) {
      //     console.log(`Property: ${property}, Value: ${this[property]}`); // Add this line
      //     if ((this[property]) && (typeof (this[property] as Locator).isVisible === 'function')) {
      //       visibilityChecks.push(await ((this[property] as Locator)).isVisible());
      //     }
      //   }

      //   let visibilityResults = await Promise.all(visibilityChecks);
      //   return visibilityResults.every(result =>
      //     result === true
      //   );
      // }

      // async doesElementInteractionChangeDOM(element: Locator): Promise<boolean> {
      //   // initial DOM
      //   const initialPageDOM = await this.page.content();
      //   // click element to no effect
      //   await element.click();
      //   // check for no change
      //   return (await this.page.content() !== initialPageDOM);
      // }

  async goBack() {
    await this.page.goBack();
  }
}
