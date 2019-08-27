export const currency = (number, currency = "GBP") => (
  new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(number)
)

export default {
  currency
}
