## Setup
1. Run `npm install` to install all dependencies (incl. `playwright` and `dotenv`)
1. Create a file named `.env` in the root directory of the project
    * Set the following environment variables inside this `.env` file:
        * `CUSTOMER_REFERENCE_ID` (**mandatory**)
        * `FEE_PERCENT` (*optional* - defaults to 0.2)
        * `WELCOME_PAGE_URL` (**mandatory**)
        * `CURRENCY_ABBR` (**mandatory**)
        * `MONETARY_AMOUNT_WITHOUT_FEE` (**mandatory**)
    * If this project is shared via a code repository like GitHub then this file will need to be setup manually; if this project is shared as a `.zip` file then this file will be present.

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
* This was seen on the screen at times and not at others ∴ this was left un-tested.
