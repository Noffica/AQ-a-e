## Setup
1. This project has been written with Playwright under TypeScript.
1. At root directory level, run `npm install` to install all dependencies (incl. `playwright` and `dotenv`)
1. Create a file named `.env` in the root directory of the project
    * Set the following environment variables inside this `.env` file:
        * `CUSTOMER_REFERENCE_ID` (**mandatory**)
        * `FEE_PERCENT` (*optional* - defaults to 0.2)
        * `WELCOME_PAGE_URL` (**mandatory**)
        * `CURRENCY_ABBR` (**mandatory**)
        * `MONETARY_AMOUNT_WITHOUT_FEE` (**mandatory**)
        * `LOGIN_COOKIE_CUST_REF_ID_NAME` (**mandatory**)
        * `LOGIN_COOKIE_CUST_REF_ID_VALUE` (**mandatory**)
        * `LOGIN_COOKIE_DOMAIN` (**mandatory**)
        * `LOGIN_COOKIE_PATH` (**mandatory**)
    * If this project is shared via a code repository like GitHub then this file will need to be setup manually; if this project is shared as a `.zip` file then this file will be present.

## Run tests
* The tests inside each `.spec` file have been written according to certain flows ∴ the tests inside each `.spec` file should be run in series. Hence `test.describe.configure({ mode: "serial" })`.
* See https://playwright.dev/docs/running-tests#running-tests
* See following examples
    ```shell
    npx playwright test
    # Runs the end-to-end tests.

    npx playwright test --ui
    # Starts the interactive UI mode.

    npx playwright test --project=chromium
    # Runs the tests only on Desktop Chrome.

    npx playwright test exampleFile
    # Runs the tests in a specific file.

    npx playwright test --debug
    # Runs the tests in debug mode.

    npx playwright codegen
    # Auto generate tests with Codegen.

    npx playwright test initial.spec.ts --project=firefox --headed
    # runs tests/welcome.spec.ts file under Firefox only, in headed mode
    ```

## Concerns
#### Converted, equivalent amounts in crypto asset
* Converted, equivalent amounts in the selected crypto asset were no longer displayed ∴ functionality pertaining to that could be tested in very limited ways

#### Wallet addresses
* Similarly, address for wallets for crypto assets were also no longer generated. This also affected the QR code generated for the wallet addresses, which yielded `undefined`. This too was **not** tested.
#### … and clipboard
* Tests about copying the wallet address to clipboard were also left un-tested. **Note**: the Firefox browser does *not* have permissions to clipboard. See https://github.com/microsoft/playwright/blob/main/tests/library/permissions.spec.ts#L155
* Otherwise, those tests could be started with
```ts
test("Clipboard has contents when icon clicked", async ({ browserName, context }) => {
    test.skip(browserName === "firefox", "Firefox does not have permissions to clipboard");

    await context.grantPermissions(["clipboard-read"]);
// ...
```
#### Customer Reference ID in the top-right
* This was seen on the screen at times and *not* at others ∴ this was left un-tested.

#### Hong Kong Jet
* When jumping directly to pages beyond Welcome, the brand logo of this entity is observed in the top-left.
* This is noted here and otherwise ignored.

## Deficiencies
* Parallelisation support has **not** yet been implemented properly.
* Whilst abbreviations for fiat currencies have been accounted for, currency symbols have not (e.g. `€`, `£` etc.)

## Further tests
* **Welcome page**:
    * Confirmation (alert) message upon login/authorisation
    * Non-existent customer ref. ID prevents advancement
    * Blank customer ref. ID field prevents advancement
* **All pages beyond Welcome**:
    * Attempts to navigate to them directly via URL (without login/authorisation from Welcome) and potential re-directs or error messages
        * incl. setting crypto, network or both in the URL
        * setting incorrect or mismatched crypto + network in the URL
* **Expired Payment** e.g.
    * View Payment Status → Payment Status page
    * Refresh Payment → Transaction Details page
* **Transaction details**
    * Refresh the page and check if the timer has reset
* **Visual layout**
    * Arrangement of elements on the page (relative to one another) and further formatting characteristics are deemed unsuitable for automated tests of simulated user behaviour (Selenium, Cypress, Playwright etc.)
        * These are deemed more appropriate for front-end component and front-end integration tests
