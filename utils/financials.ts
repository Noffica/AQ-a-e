export function feeCalculator(dollarNumber?: number, feeAsPercent?: number): string {
  let referenceNumber = dollarNumber || Number(process.env.MONETARY_AMOUNT_WITHOUT_FEE);
  let percentage = feeAsPercent || Number(process.env.FEE_PERCENT);
  return (percentage/100 * referenceNumber).toFixed(2);
}

export const currencyAbbr: string = process.env.CURRENCY_ABBR;
export const monetaryAmountWithoutFee: string = parseFloat(process.env.MONETARY_AMOUNT_WITHOUT_FEE).toFixed(2);
