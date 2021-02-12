export default class CurrencyService {
  static async getCurrency() {
  const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    return Error(error.message);
  }
}
}