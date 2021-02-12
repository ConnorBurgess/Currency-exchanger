import CurrencyService from './js/currency-service.js'
import $ from 'jquery';
import './css/styles.css';

async function getCall() {
  const response = await CurrencyService.getCurrency();
  
    console.log(response.statusText)
    console.log(response)
    const objArr = Object.keys(response.conversion_rates)
    console.log(objArr);
    console.log(response.conversion_rates[3])
    console.log(response.conversion_rates.JPY)
    for (let i = 0; i < Object.keys(response.conversion_rates).length; i++) {
      document.getElementById("currency").innerHTML = document.getElementById("currency").innerHTML + `<option value="${objArr[i]}"></option>`
    }
}


$(document).ready(function() { 
  $('#convert').click(function(event) {
    const currency1 = document.getElementById("currency1").value;
    getCall();
  })
});