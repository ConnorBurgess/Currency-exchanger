import CurrencyService from './js/currency-service.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

async function getCall() {
  let currency1 = document.getElementById("currency1").value;
  let currency2 = document.getElementById("currency2").value;
  let amount = document.getElementById("amount").value;
  try {
    const response = await CurrencyService.getCurrency(currency1, currency2, amount);
    if (response.result !== "success") {
      throw Error(response.statusText);
    }
    response.conversion_result === undefined ? document.getElementById("output").innerHTML +=
      `<li>
      The current conversion rate from ${currency1} to ${currency2} is ${response.conversion_rate}.
      Please input an amount in order to perform a conversion.
      </li>`
      : document.getElementById("output").innerHTML +=
      `<li>
      Converting from ${currency1} to ${currency2} . . . 
      The conversion rate is ${response.conversion_rate}. ${amount}${currency1} is equal to ${response.conversion_result}${currency2}.
      </li>`;
  } catch (error) {

    document.getElementById("output").innerHTML === "Error: Failed to fetch" ? document.getElementById("output").innerHTML += `. <strong>Please input valid currency codes and numerical amount. </strong>`
      : document.getElementById("output").innerHTML += `<li>Error: Failed to retrieve conversion. Please ensure currencies exist in dropdown list and review syntax.</li>`;
    return Error(error.message);
  }
}

async function getDropDown() {
  try {
    const objList = await CurrencyService.getList();
    const objKeys = Object.keys(objList.conversion_rates);
    const key = "listKey";
    sessionStorage.setItem(key, JSON.stringify(objList));
    for (let i = 0; i < Object.keys(objList.conversion_rates).length; i++) {
      document.getElementById("currency-list").innerHTML = document.getElementById("currency-list").innerHTML + `<option value="${objKeys[i]}"></option>`;
      document.getElementById("currency-list2").innerHTML = document.getElementById("currency-list2").innerHTML + `<option value="${objKeys[i]}"></option>`;
    }

  } catch (error) {
    document.getElementById("output").innerHTML = Error(error.message) + ". Please verify API keys are correct.";
    return Error(error.message);
  }
}

$(document).ready(function () {
  setTimeout(() => {
    $("#sub-word").slideDown(1000);
  }, 3000);
  setTimeout(() => {
    $("#third-word").slideDown(1000);
  }, 4000);
  setTimeout(() => {
    $("#new-search").slideDown(1000);
  }, 5500);

  //Title animation (https://codepen.io/kazed972/pen/bQOQGR)
  var text = document.getElementById('main-word');
  var newDom = '';
  var animationDelay = 95;
  for (let i = 0; i < text.innerText.length; i++) {
    newDom += '<span class="char">' + (text.innerText[i] == ' ' ? '&nbsp;' : text.innerText[i]) + '</span>';
  }
  text.innerHTML = newDom;
  var length = text.children.length;
  for (let i = 0; i < length; i++) {
    text.children[i].style['animation-delay'] = animationDelay * i + 'ms';
  }

  $('#convert').click(function () {
    getCall();
  });

  document.getElementById("clear-input").onclick = function () {
    document.getElementById("currency1").value = "";
    document.getElementById("currency2").value = "";
    document.getElementById("amount").value = "";
  };

  document.getElementById("new-search").onclick = function () {
    $("#main-word, #sub-word, #third-word, #new-search").fadeOut(1000);
    $("#button-area, #output").slideDown(2000);
    getDropDown();
  };
});