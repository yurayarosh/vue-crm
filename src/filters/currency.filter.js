export default function currencyFilter(value, currency = 'EUR') {
  return new Intl.NumberFormat('ua-UA', {
    style: 'currency',
    currency
  }).format(value)
}
