import { CurrencyConverter } from './components/CurrencyConverter.js';

const currencyConverter = new CurrencyConverter();
const amountPLN = document.querySelector(".amount1");
const currencyTo = document.querySelector("#currency2");
const amountConverted = document.querySelector(".amount2");
const exchangeButton = document.querySelector("#exchange");

amountPLN.addEventListener('input', (e) => {
    const value = e.target.value;
    if (!/^[0-9]*[.,]?[0-9]*$/.test(value)) {
        alert('Proszę wprowadzić tylko cyfry i separator dziesiętny (kropka lub przecinek)');
        e.target.value = value.slice(0, -1);
    }
});

const exchangeCurrency = () => {
    let amount = amountPLN.value.replace(',', '.');
    amount = parseFloat(amount);

    if (isNaN(amount) || amount <= 0) {
        alert('Proszę wprowadzić prawidłową kwotę');
        return;
    }

    const toCurrency = currencyTo.value;
    currencyConverter.convertFromPLN(toCurrency, amount, (result) => {
        amountConverted.value = result;
    });
};

exchangeButton.addEventListener("click", exchangeCurrency);
