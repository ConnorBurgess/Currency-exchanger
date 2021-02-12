import CurrencyService from './js/currency-service.js'
import $ from 'jquery';
import './css/styles.css';

async function getCall() {
  let currency1 = document.getElementById("currency1").value;
  let currency2 = document.getElementById("currency2").value;
  let amount = document.getElementById("amount").value;
  console.log(currency1);
  console.log(currency2);
  console.log(amount);
  try {

    const response = await CurrencyService.getCurrency(currency1, currency2, amount);
    console.log(response);
    if (response.result === "error") {
      throw Error(response["error-type"]);
    }

  //   const objList = await CurrencyService.getList();

  //   const objKeys = Object.keys(objList.conversion_rates)
  //  const objValues = Object.keys(objList.conversion_rates)

  //   for (let i = 0; i < Object.keys(objList.conversion_rates).length; i++) {
  //     document.getElementById("currency-list").innerHTML = document.getElementById("currency-list").innerHTML + `<option value="${objKeys[i]}"></option>`
  //     document.getElementById("currency-list2").innerHTML = document.getElementById("currency-list2").innerHTML + `<option value="${objKeys[i]}"></option>`

  //   }
  document.getElementById("output").innerHTML = `
  Converting from ${currency1} to ${currency2} . . . 
  The conversion rate is ${response.conversion_rate}. $${amount}${currency1} is equal to ${response.conversion_result}${currency2}.
  `
  console.log(response);
} catch (error) {
  document.getElementById("output").innerHTML = Error(error.message);
  return Error(error.message);
}
}


$(document).ready(function () {
  $('#convert').click(function (event) {
    getCall();
  })
});