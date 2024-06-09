## Setup
1. Run `npm install` to install all dependencies (incl. `playwright` and `dotenv`)
1. Create a file named `.env` in the root directory of the project
    * Set the following environment variables inside this `.env` file:
        * `CUSTOMER_REFERENCE_ID` (**mandatory**)
        * `FEE_PERCENT` (*optional* - defaults to 0.2)
        * `WELCOME_PAGE_URL` (**mandatory**)
    * If this project is shared via a code repository like GitHub then this file will need to be setup manually; if this project is shared as a `.zip` file then this file will be present.

### Assumptions
1. **Payment Instructions** :: **Amount due**
    * Since the conversion rates of the various crypto currencies are **not** displayed, nor is the source of the market data provider made known, the financial/mathematical value of the **Amount due** in the selected crypto currecy is asserted by…
      * checking if the value returned by `<xxx>`, a free, near-realtime, public provider of APIs for financial information about crypto-currencies, is within 5% of that provided by Aquanow
      * Note: 5% is generous margin in light of the magnitude of actual differences amongst rates across currency exchanges
