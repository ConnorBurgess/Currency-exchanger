export default class CurrencyService {
  static async getCurrency(currency1, currency2, amount) {
    try {
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}/${amount}`
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      document.getElementById("output").innerHTML = Error(error.message);
      return Error(error.message);
    }
  }

  static async getList() {
    const key = "listKey";
    let objList = sessionStorage.getItem(key);
    if (objList) {
      return JSON.parse(objList);
    }
    else {
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`
      try {
        objList = await fetch(url);
        if (!objList.ok) {
          throw Error(objList.statusText);
        }
        return objList.json();
      } catch (error) {
        document.getElementById("output").innerHTML = Error(error.message);
        return Error(error.message);
      }
    }
  }
}