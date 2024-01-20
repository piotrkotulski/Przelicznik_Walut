export class CurrencyConverter {
    constructor() {
        this.apiEndpoint = 'https://api.nbp.pl/api/exchangerates/rates/a/';
    }

    convertFromPLN(currencyTo, amountPLN, callback) {
        if (currencyTo === 'pln') {
            callback(amountPLN.toFixed(2));
            return;
        }

        fetch(`${this.apiEndpoint}${currencyTo}/`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Brak danych');
                }
                return res.json();
            })
            .then(data => {
                const rate = data.rates[0].mid;
                const result = (amountPLN / rate).toFixed(2);
                callback(result);
            })
            .catch(error => this.handleError(error));
    }

    handleError(error) {
        console.error('Error:', error);
        alert(`Wystąpił błąd podczas przetwarzania wymiany walut: ${error.message}`);
    }
}