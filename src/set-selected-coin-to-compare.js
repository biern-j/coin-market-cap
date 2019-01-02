export const setSelectedCoinToCompare = (state, coin) => {
  let baseCoinState;
  let quoteCoinState;

  if(state.baseCoin.name === undefined) {
    baseCoinState = coin;
    quoteCoinState = state.quoteCoin;
  }
  if(state.quoteCoin.name === undefined) {
    baseCoinState = state.baseCoin;
    quoteCoinState = coin;
  }
  if(state.baseCoin.name === coin.name) {
    baseCoinState = {};
    quoteCoinState = state.quoteCoin;
  }
  if(state.quoteCoin.name === coin.name) {
    baseCoinState = state.baseCoin;
    quoteCoinState = {};
  }
  if (state.baseCoin.name !== undefined &&
    state.quoteCoin.name !== undefined &&
    coin.name !== state.quoteCoin.name &&
    coin.name !== state.baseCoin.name) {
    baseCoinState = coin;
    quoteCoinState = state.quoteCoin;
  }
  return {
    baseCoinState,
    quoteCoinState
  }

};