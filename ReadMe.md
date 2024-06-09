## Setup
1. Run `npm install` to install all dependencies (incl. `playwright` and `dotenv`)
    * Note: `dotenv` is used to store sensitive data (e.g. API keys) in a separate file from the code
1. Create a file named `.env` in the root directory of the project
    * Set the following environment variables inside this `.env` file:
        * `CUSTOMER_REFERENCE_ID` (**mandatory**)
        * `FEE_PERCENT` (*optional* - defaults to 0.2)
