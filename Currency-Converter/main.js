const button = document.getElementById("button");

const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const amountInput = document.getElementById("amount");

let result = document.getElementById("result");

setOptions();

async function getData() {
  let req = await fetch(
    "https://v6.exchangerate-api.com/v6/08ddf872e5a8fab9ae8893db/latest/AFN",
  );
  let data = await req.json();
  return data.conversion_rates;
}

async function getCountry(country) {
  let req = await fetch(
    `https://v6.exchangerate-api.com/v6/08ddf872e5a8fab9ae8893db/latest/${country}`,
  );
  let data = await req.json();
  return data.conversion_rates;
}

async function setOptions() {
  let countryOptions = await getData();

  let options = "";

  for (country in countryOptions) {
    options += ` <option value="${country}">${country}</option>`;
  }

  fromInput.innerHTML = options;
  toInput.innerHTML = options;
}

async function convert() {
  if (amountInput.value.trim() === "") {
    result.textContent = "Please Enter Amount";
  } else {
    let country = await getCountry(fromInput.value);
    let res = (country[toInput.value] * amountInput.value).toFixed(2);
    result.textContent = `From ${amountInput.value} ${fromInput.value} to ${res} ${toInput.value}`;
  }
}

button.addEventListener("click", convert);
