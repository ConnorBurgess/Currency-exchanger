import CurrencyService from './js/currency-service.js'
import $ from 'jquery';
import './css/styles.css';

async function getCall() {
  let currency1 = document.getElementById("currency1").value;
  let currency2 = document.getElementById("currency2").value;
  let amount = document.getElementById("amount").value;
  try {
    const response = await CurrencyService.getCurrency(currency1, currency2, amount);
    console.log(response);
    if (response.result === "error") {
      throw Error(response["error-type"]);
    }
    document.getElementById("output").innerHTML =
    `
    Converting from ${currency1} to ${currency2} . . . 
    The conversion rate is ${response.conversion_rate}. $${amount}${currency1} is equal to ${response.conversion_result}${currency2}.
    `
    console.log(response);
  } catch (error) {
    document.getElementById("output").innerHTML = Error(error.message);
    document.getElementById("output").innerHTML === "Error: malformed-request" ? document.getElementById("output").innerHTML += `. <strong>Please input valid currencies and amount. </strong>`
      : Error(error.message);
  }
}

async function getDropDown() {
  const objList = await CurrencyService.getList();
  const objKeys = Object.keys(objList.conversion_rates)
  const objValues = Object.keys(objList.conversion_rates)

  for (let i = 0; i < Object.keys(objList.conversion_rates).length; i++) {
    document.getElementById("currency-list").innerHTML = document.getElementById("currency-list").innerHTML + `<option value="${objKeys[i]}"></option>`
    document.getElementById("currency-list2").innerHTML = document.getElementById("currency-list2").innerHTML + `<option value="${objKeys[i]}"></option>`
  }
}

$(document).ready(function () {
  $("#new-search").fadeIn(7000);
  //Animated intro (https://codepen.io/kazed972/pen/bQOQGR)
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
  // Animated intro end

  $('#convert').click(function (event) {
    getCall()
  })

  document.getElementById("clear-input").onclick = function () {
    document.getElementById("currency1").value = "";
    document.getElementById("currency2").value = "";
    document.getElementById("amount").value = "";
  }

  document.getElementById("new-search").onclick = function () {
    console.log("button clicked")
    $("#main-word").fadeOut(1000);
    $("#new-search").fadeOut();
    $("#button-area, #output").fadeIn(2000);
    getDropDown();
  }
});