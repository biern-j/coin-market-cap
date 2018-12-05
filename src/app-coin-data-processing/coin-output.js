import {
  fetchAppData,
  getPostAppForCoin,
  findListingCoin
} from "./coin-data-fetching";

export default function coinMarketCapData(coin, listings) {
  const foundListingCoin = findListingCoin(listings, coin);
  console.log("coin from fond", foundListingCoin);
  const fetchParams = {
    address: getPostAppForCoin(foundListingCoin.id),
    errorMessage: ""
  };

  return fetchAppData(fetchParams)
    .then(foundTickerCoin => ({ coinTicker: foundTickerCoin.data }))
    .catch(error => {
      throw new Error(error.message);
    });
}
