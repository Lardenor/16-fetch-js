const url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5';

async function privatbank(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const eur = data[0];
    const usd = data[1];

    const tableBody = document.getElementById('exchange-table');
    tableBody.innerHTML = '';
    const eurRow = document.createElement('tr');
    const eurCurrencyCell = document.createElement('td');
    eurCurrencyCell.innerText = eur.ccy;
    eurRow.appendChild(eurCurrencyCell);
    const eurBuyCell = document.createElement('td');
    eurBuyCell.innerText = parseFloat(eur.buy).toFixed(2);
    eurRow.appendChild(eurBuyCell);
    const eurSaleCell = document.createElement('td');
    eurSaleCell.innerText = parseFloat(eur.sale).toFixed(2);
    eurRow.appendChild(eurSaleCell);
    tableBody.appendChild(eurRow);

    const usdRow = document.createElement('tr');
    const usdCurrencyCell = document.createElement('td');
    usdCurrencyCell.innerText = usd.ccy;
    usdRow.appendChild(usdCurrencyCell);
    const usdBuyCell = document.createElement('td');
    usdBuyCell.innerText = parseFloat(usd.buy).toFixed(2);
    usdRow.appendChild(usdBuyCell);
    const usdSaleCell = document.createElement('td');
    usdSaleCell.innerText = parseFloat(usd.sale).toFixed(2);
    usdRow.appendChild(usdSaleCell);
    tableBody.appendChild(usdRow);

    // передаємо дані у функцію convertCurrency()
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const currency = document.getElementById('currency').value;
  const buySellSelect = document.getElementById('buy-sell-select');
  const buyOrSell = buySellSelect.value;

  try {
    const data = await privatbank(url); // отримуємо дані з API
    let exchangeRate;
    if (currency === 'usd') {
      if (buyOrSell === 'buy') {
        exchangeRate = data[1].buy;
      } else {
        exchangeRate = data[1].sale;
      }
    } else if (currency === 'eur') {
      if (buyOrSell === 'buy') {
        exchangeRate = data[0].buy;
      } else {
        exchangeRate = data[0].sale;
      }
    }

    const result = amount * exchangeRate;
    document.getElementById('result').innerText = result.toFixed(2) + ' UAH';
  } catch (error) {
    console.log(error);
  }
}

privatbank(url); // запускаємо запит до API при завантаженні сторінки

document.getElementById('convert-btn').addEventListener('click', convertCurrency);



// !Homework CODE 111111111111111111111111
// !Homework CODE 111111111111111111111111
// !Homework CODE 111111111111111111111111
const url2 = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=01.12.2014';
const table = document.querySelector('.table');
const tableBody = document.getElementById('more-exchange');
const showBtn = document.getElementById('show-more-btn');
const closeBtn = document.getElementById('close-btn');

showBtn.addEventListener('click', async () => {
  try {
    const response = await fetch(url2);
    const data = await response.json();
    
    // Видаляємо клас "hidden", щоб зробити таблицю видимою
    table.classList.remove('hidden');
     tableBody.innerHTML = '';
    
  // Перебираємо доступні курси валют з API та створюємо рядки таблиці
    data.exchangeRate.forEach(currency => {
      const row = document.createElement('tr');
      
      const currencyCell = document.createElement('td');
      currencyCell.textContent = currency.currency;
      row.appendChild(currencyCell);
      
      const buyCell = document.createElement('td');
      buyCell.textContent = currency.purchaseRateNB;
      row.appendChild(buyCell);
      
      const saleCell = document.createElement('td');
      saleCell.textContent = currency.saleRateNB;
      row.appendChild(saleCell);
      
      tableBody.appendChild(row);
    });

    // Відображаємо кнопку "Закрити таблицю"
    closeBtn.classList.remove('hidden');
  } catch (error) {
    console.log(error);
  }
});

closeBtn.addEventListener('click', () => {
  // Додаємо клас "hidden", щоб зробити таблицю невидимою
  table.classList.add('hidden');



  // Додаємо клас "hidden", щоб зробити кнопку "Закрити таблицю" невидимою
  closeBtn.classList.add('hidden');
});
// !Homework CODE 111111111111111111111111
// !Homework CODE 111111111111111111111111
// !Homework CODE 111111111111111111111111
// !Homework CODE 111111111111111111111111
