import exp from "constants";

export function feeCalculator(dollarNumber?: number, feeAsPercent?: number): string {
  let referenceNumber = dollarNumber || Number(process.env.MONETARY_AMOUNT_WITHOUT_FEE);
  let percentage = feeAsPercent || Number(process.env.FEE_PERCENT);
  return (percentage/100 * referenceNumber).toFixed(2);
}

export const currencyAbbr = process.env.CURRENCY_ABBR;
export const monetaryAmountWithoutFee = parseFloat(process.env.MONETARY_AMOUNT_WITHOUT_FEE).toFixed(2);
export const feeValueText = `\$${feeCalculator()} ${currencyAbbr} (${process.env.FEE_PERCENT}\% of amount)`;//e.g. "$0.20 USD (0.20% of amount)"
export const amountWithoutFeeValueText = `\$${monetaryAmountWithoutFee} ${currencyAbbr}`; //e.g. "$100 USD"
export const amountWithFeeText         = `\$${(parseFloat(feeCalculator()) + parseFloat(monetaryAmountWithoutFee)).toFixed(2)} ${currencyAbbr}`; //e.g. "$100.20 USD"

export const cryptoNetworkMap = {
  'BTC':   'BTC',
  'ETH':   'ETH',
  'BCH':   'BCH',
  'LTC':   'LTC',
  'USDC':  'ETH',
  'MATIC': 'ETH',
  'SOL':   'SOL'
};
