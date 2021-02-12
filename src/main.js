import CurrencyService from './js/currency-service.js'
import $ from 'jquery';
import './css/styles.css';

async function getCall() {
  const response = await CurrencyService.getCurrency();
  
    console.log(response.statusText)
    console.log(response)
    const objKeys = Object.keys(response.conversion_rates)
    const objValues = Object.keys(response.conversion_rates)

    for (let i = 0; i < Object.keys(response.conversion_rates).length; i++) {
      document.getElementById("currency").innerHTML = document.getElementById("currency").innerHTML + `<option value="${objKeys[i]}"></option>`
      document.getElementById("currency2").innerHTML = document.getElementById("currency2").innerHTML + `<option value="${objKeys[i]}"></option>`
 
    }
}


$(document).ready(function() { 
  $('#convert').click(function(event) {
    const currency1 = document.getElementById("currency1").value;
    const currency2 = document.getElementById("currency2").value;
    getCall();
  })
});