const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

export async function fetchCoins() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Network response was not ok");
    return await res.json();
  } catch (err) {
    throw err;
  }
}
