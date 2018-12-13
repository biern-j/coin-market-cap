import React, { Component } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import "./App.css";
import CoinInput from "./Components/coin-input";
import coinMarketCapData from "./app-coin-data-processing/coin-output";
import CoinDetails from "./Components/coin-tile/coin-details";
import { fetchAppData, getPostAppForCoin } from "./app-coin-data-processing/coin-data-fetching";
import CoinCompareInput from "./Components/CoinComparison/coin-compare-input";

const Container = styled.div`
  display: flex;
  // flex-direction: column;
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
    selectedCoinToCompare: {},
    coinsToCompare: [],
    selectedCoinToCompare1: {},
    selectedCoinToCompare2: {}
  };

  async componentDidMount() {
    this.setState({ coinsData: await fetchAppData(listings) });

    const data = localStorage.getItem("coinData");
    if (data) {
      this.setState({ coinsData: JSON.parse(data) });
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
    console.log("coin1", coin.name);
    if (this.state.selectedCoinToCompare1.name === undefined) {
      this.setState({selectedCoinToCompare1: coin, selectedCoinToCompare2: this.state.selectedCoinToCompare2, coinsToCompare: coin });
    }
    if (this.state.selectedCoinToCompare2.name === undefined) {
      this.setState({selectedCoinToCompare1: this.state.selectedCoinToCompare1, selectedCoinToCompare2: coin, coinsToCompare: coin});
    }
    if (this.state.selectedCoinToCompare1.name === coin.name) {
      this.setState({selectedCoinToCompare1: {}, selectedCoinToCompare2: this.state.selectedCoinToCompare2});
    }if (this.state.selectedCoinToCompare2.name === coin.name) {
      this.setState({selectedCoinToCompare1: this.state.selectedCoinToCompare1, selectedCoinToCompare2: {}});
    }
  };

  handleSelectedCoinToCompare = (coins) => {
    console.log("coin", coins);
    this.setState({coinsToCompare: coins})
  };

  render() {

    console.log("storage", this.state.selectedCoins );
    return (
      <Container>
        <Inputs>
          <CoinInputStyle onChange={this.handleSelectedCoin} />
          <CoinCompareInput
            coinToCompare1={this.state.selectedCoinToCompare1}
            coinToCompare2={this.state.selectedCoinToCompare2}
          />
        </Inputs>
        <CoinTiles>
          {this.state.selectedCoins !== {} ?
            Object.values(this.state.selectedCoins).map(item =>
              (<ThemeProvider key={item.id} theme={themeCoinPairTile}>
                  <CoinDetails coinToCompare={this.setCoinToCompare} onClick={this.updateSelectedCoin} coin={item} />
                </ThemeProvider>
              ))
            :
            {}}
        </CoinTiles>
      </Container>
    );
  }
}

export default App;
