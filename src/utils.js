// define the currency formatting based on Intl class

// SET the FORMAT
// default value - first parameter is undefined
// second param is OPTIONS
export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
    minimumFractionDigits: 0,  // to Not add a fractions (e.g. 0.02) after number
})