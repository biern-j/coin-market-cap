import React, { Component } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

import CoinInput from "./Components/coin-input";
import coinMarketCapData from "./app-coin-data-processing/coin-output";
import CoinDetails from "./Components/CoinTileDetails/coin-tile-details";
import { fetchAppData, getPostAppForCoin } from "./app-coin-data-processing/coin-data-fetching";
import CoinCompareInput from "./Components/CoinComparison/coin-compare-input";
import CoinComparisonResult from "./Components/CoinComparison/coin-comparison-result";

const Container = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinTiles = styled.div`
  display: flex;
  flex-wrap: wrap;
 flex-basis: fit-content;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const themeCoinPairTile = {
  fontSize: {
    large: "1.625em",
    middle: "1.1875em",
    smaller: "1em",
    small: "0.875em"
  },
  color: {
    rise: "rgb(0,128,0)",
    fall: "rgb(255,69,92)",
    constant: "rgb(47,79,79)",
    primary: "rgb(255,255,255)",
    secondary: "rgb(254,255,184)"
  }
};


const CoinInputStyle = styled(CoinInput)``;

const listings = {
  address: "https://api.coinmarketcap.com/v2/listings/",
  errorMessage: "Error Listings"
};

function saveLocal(...toSave) {
  for (const [key, value] of toSave) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

function getLocal(...toRetrieve) {
  return toRetrieve.reduce(
    (acc, key) => [...acc, localStorage.getItem(key)],
    []
  );
}

class App extends Component {
  state = {
    selectedCoinDetails: "",
    coinsData: {},
    counter: 0,
    selectedCoins: {},
    baseCoin: {},
    quoteCoin: {}
  };

  async componentDidMount() {
    const data = localStorage.getItem("coinData");
    if (data) {
      this.setState({ coinsData: JSON.parse(data) });
    } else {
      this.setState({ coinsData: await fetchAppData(listings) });
    }

    const selectedCoins = localStorage.getItem("selectedCoinsList");
    if (selectedCoins) {
      this.setState({ selectedCoins: JSON.parse(selectedCoins) });
    }
  }

  handleSelectedCoin = async coin => {
    try {
      if (this.state.counter >= 5) {
        this.setState({ coinsData: await fetchAppData(listings) });
      }

      const result = await coinMarketCapData(coin, this.state.coinsData);

      const uniqueStorageCoin = Object.values(this.state.selectedCoins).find(item =>
        item.id === result.coinTicker.id);

      this.setState(
        state => (
          {
            selectedCoinDetails: result,
            counter: state.counter + 1,
            selectedCoins: uniqueStorageCoin ?
              state.selectedCoins : {...state.selectedCoins, [result.coinTicker.id]: result.coinTicker}
          }),
        () => {
          saveLocal(
            ["coinData", this.state.coinsData],
            ["selectedCoinsList", this.state.selectedCoins]
          );
        }
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  updateSelectedCoin = async id => {
    const fetchParams = {
      address: getPostAppForCoin(id),
      errorMessage: ""
    };
    const data = await fetchAppData(fetchParams);

    const resultUpdate = Object.values(this.state.selectedCoins).map(item => {
      if (item.id === id) {
        item = data.data;
      }
      return item;
    });
    this.setState({ selectedCoins: resultUpdate });
  };

  setCoinToCompare = (coin) => {
    this.setState(state => {
      const { baseCoinState, quoteCoinState } = setSelectedCoinToCompare(state, coin);

    return ({
        baseCoin: baseCoinState,
        quoteCoin: quoteCoinState,
    });
    });
  };

  render() {
    return (
      <Container>
        <Inputs>
          <CoinInputStyle onChange={this.handleSelectedCoin} />
          <CoinCompareInput
            coinBase={this.state.baseCoin}
            coinQuote={this.state.quoteCoin}

          />
          {
            this.state.baseCoin.name && this.state.quoteCoin.name ?
              (<CoinComparisonResult
                coinBase={this.state.baseCoin}
                coinQuote={this.state.quoteCoin}
              />)
              :
              ""
          }
        </Inputs>
        <CoinTiles>
          {
            this.state.selectedCoins !== {} ?
              (<ThemeProvider theme={themeCoinPairTile}>
                  <CoinDetails
                    coinToCompare={this.setCoinToCompare}
                    onClick={this.updateSelectedCoin}
                    coin={this.state.selectedCoins}
                  />
                </ThemeProvider>
              )
            :
            {}
          }
        </CoinTiles>
      </Container>
    );
  }
}

const setSelectedCoinToCompare = (state, coin) => {
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

export default App;
