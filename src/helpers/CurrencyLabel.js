export default class CurrencyLabel {

    static labelForCurrency(currencyCode) {
        if (currencyCode === "usd") {
            return "$"
        } else if (currencyCode === "eur") {
            return "€"
        } else {
            return "₽"
        }
    }
}