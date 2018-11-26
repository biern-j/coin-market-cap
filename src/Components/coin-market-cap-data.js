import fetch from "isomorphic-fetch";

async  function coinMarketCapData(coin, listings) {

  if (listings instanceof Error) {
    return listings;
  }

  const foundListingCoin = findListingCoin(listings, coin);
  if (foundListingCoin === undefined) {
    return Error("No such coin in a Listings");
  }

   const foundTickerCoin = await fetchTickers(foundListingCoin.id);
  if (foundTickerCoin instanceof Error) {
    return foundTickerCoin;
  }

  return {
    coinTicker: foundTickerCoin.data
  };
}

const findListingCoin = (coinToListing, coin) =>
  Object.values(coinToListing.data).find(item =>
  [item.symbol, item.symbol.toLowerCase(), item.name, item.website_slug].includes(coin)
  );

const fetchTickers = async (coinID) => {
  try {
    const marketCapTicker = await fetch( "https://api.coinmarketcap.com/v2/ticker/"+`${coinID}`+"S/");
    return await marketCapTicker.json();
  } catch(err) {
    return Error("Error Ticker");
  }
};

export default coinMarketCapData;



