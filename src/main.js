import CurrencyService from './js/currency-service.js'
import $ from 'jquery';
import './css/styles.css';

async function getCall() {
  const response = await CurrencyService.getCurrency();
  
    console.log(response)
}


$(document).ready(function() { 
  $('#convert').click(function(event) {
    const currency1 = document.getElementById("currency1").value;
    getCall();
  })
});