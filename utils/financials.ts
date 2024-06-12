import exp from "constants";

/**
 * Calculates the fee based on a given dollar amount and fee percentage.
 * @param {number} [dollarNumber] - The dollar amount to calculate the fee from. Optional.
 * @param {number} [feeAsPercent] - The fee percentage to apply. Optional.
 * @returns {string} The calculated fee, rounded to two decimal places.
 */
export function feeCalculator(dollarNumber?: number, feeAsPercent?: number): string {
  let referenceNumber = dollarNumber || Number(process.env.MONETARY_AMOUNT_WITHOUT_FEE);
  let percentage = feeAsPercent || Number(process.env.FEE_PERCENT);
  return (percentage/100 * referenceNumber).toFixed(2);
}

/** The currency abbreviation from the environment variables. */
export const currencyAbbr = process.env.CURRENCY_ABBR;

/** The monetary amount without fee from the environment variables, rounded to two decimal places. */
export const monetaryAmountWithoutFee = parseFloat(process.env.MONETARY_AMOUNT_WITHOUT_FEE).toFixed(2);

/** The fee value text, formatted as a string. */
export const feeValueText = `\$${feeCalculator()} ${currencyAbbr} (${process.env.FEE_PERCENT}\% of amount)`;//e.g. "$0.20 USD (0.20% of amount)"

/** The amount without fee value text, formatted as a string. */
export const amountWithoutFeeValueText = `\$${monetaryAmountWithoutFee} ${currencyAbbr}`; //e.g. "$100 USD"

/** The amount with fee text, formatted as a string. */
export const amountWithFeeText = `\$${(parseFloat(feeCalculator()) + parseFloat(monetaryAmountWithoutFee)).toFixed(2)} ${currencyAbbr}`; //e.g. "$100.20 USD"

/** A map of crypto networks. */
export const cryptoNetworkMap = {
  'BTC':   'BTC',
  'ETH':   'ETH',
  'BCH':   'BCH',
  'LTC':   'LTC',
  'USDC':  'ETH',
  'MATIC': 'ETH',
  'SOL':   'SOL'
};
