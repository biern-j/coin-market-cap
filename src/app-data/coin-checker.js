import {
  fetchAppData,
  getPostAppForCoin,
  findListingCoin
} from "./data-processing";

export default function coinMarketCapData(coin, listings) {
  const foundListingCoin = findListingCoin(listings, coin);
  const fetchParams = {
    address: getPostAppForCoin(foundListingCoin.id),
    errorMessage: ""
  };

  return fetchAppData(fetchParams)
    .then(foundTickerCoin => ({ coinTicker: foundTickerCoin.data }))
    .catch(error => {
      throw new Error(error);
    });
}
