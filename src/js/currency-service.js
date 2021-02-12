export default class CurrencyService {
  static async getCurrency(currency1, currency2, amount) {
    const sessionData = sessionStorage.getItem('savedData')
    if (!savedData) {
      const savedData = "savedcurrencykey";
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${currency1}/${currency2}/${amount}`
      try {
        const response = await fetch(url);
        sessionStorage.setItem('savedData', JSON.stringify(response))
        console.log(savedData + "this is savedData");
        console.log(sessionData + "this is sessiondata")
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      } catch (error) {
        document.getElementById("output").innerHTML = Error(error.message);
        return Error(error.message);
      }
    } else {
      console.log('no api hit')
      return JSON.parse(sessionData)
    }

  }


  static async getList() {
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`
    try {
      const objList = await fetch(url);
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
