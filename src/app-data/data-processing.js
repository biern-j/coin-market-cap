import fetch from "isomorphic-fetch";

export const  fetchAppData = async ({address, errorMessage}) => {
  console.log("address", address);
  try {
    const marketCapTicker = await fetch(address);
    return await marketCapTicker.json();
  } catch(err) {
    throw Error(errorMessage);
  }
};

export const findListingCoin = (coinToListing, coin) =>
  Object.values(coinToListing.data).find(item =>
    [item.symbol, item.name].includes(coin)
  );

export const getPostAppForCoin = (id) => `https://api.coinmarketcap.com/v2/ticker/${id}/`;

