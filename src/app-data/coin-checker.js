import { fetchAppData, getPostAppForCoin, findListingCoin } from "./data-processing";

async  function coinMarketCapData(coin, listings) {

  if (listings instanceof Error) {
    return listings;
  }

  const foundListingCoin = findListingCoin(listings, coin);
  if (foundListingCoin === undefined) {
    return Error("No such coin in a Listings");
  }

  const POST_APP_ticker = {
      address: getPostAppForCoin(foundListingCoin.id),
    errorMessage:  "Error Ticker"
  };

   const foundTickerCoin = await fetchAppData(POST_APP_ticker);
  if (foundTickerCoin instanceof Error) {
    return foundTickerCoin;
  }

  return {
    coinTicker: foundTickerCoin.data
  };
}

export default coinMarketCapData;



