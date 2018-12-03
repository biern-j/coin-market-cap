import fetch from "isomorphic-fetch";

export const fetchAppData = async ({ address, errorMessage }) => {
  console.log("address", address);
  try {
    const marketCapTicker = await fetch(address);
    const json = await marketCapTicker.json();
    if (json.metadata.error) {
      throw new Error(json.metadata.error);
    }
    return json;
  } catch (e) {
    throw new Error(errorMessage + e);
  }
};

export const findListingCoin = (coinToListing, coin) => {
  const foundCoins = Object.values(coinToListing.data).find(item =>
    [item.symbol, item.symbol.toLowerCase, item.name].includes(coin)
  );
  return foundCoins ? foundCoins : { message: "No coins found" };
};
export const getPostAppForCoin = id =>
  `https://api.coinmarketcap.com/v2/ticker/${id}/`;
