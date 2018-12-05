import React, { Component } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import "./App.css";
import CoinInput from "./Components/coin-input";
import coinMarketCapData from "./app-coin-data-processing/coin-output";
import CoinDetails from "./Components/coin-tile/coin-details";
import { fetchAppData, getPostAppForCoin } from "./app-coin-data-processing/coin-data-fetching";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SelectedCoins = styled.div`
  color: #61dafb;
`;

const themeCoinPairTile = {
  fontSize: {
    large: "1.625em",
    middle: "1.1875em",
    smaller: "1em",
    small: "0.875em"
  },
  color: {
    rise: "rgb(28,179,145)",
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
    selectedCoins: []
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
      const uniqueStorageCoin = this.state.selectedCoins.find(item =>
        item.coinTicker.id === result.coinTicker.id);

      this.setState(
        state => (
          {
            selectedCoinDetails: result,
            counter: state.counter + 1,
            selectedCoins: uniqueStorageCoin ? state.selectedCoins : [...this.state.selectedCoins, result]
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

    const resultUpdate = this.state.selectedCoins.map(item => {
      if (item.coinTicker.id === id) {
        item.coinTicker = data.data;
      }
      return item;
    });
    this.setState({ selectedCoins: resultUpdate });
  };

  render() {
    console.log("storage", this.state.selectedCoins);
    return (
      <Container>
        <CoinInputStyle onChange={this.handleSelectedCoin} />
        {/*<SelectedCoins>*/}
        {/*{this.state.selectedCoinDetails !== "" ?*/}
        {/*(<ThemeProvider theme={themeCoinPairTile}>*/}
        {/*<CoinDetails*/}
        {/*coin={this.state.selectedCoinDetails.coinTicker} />*/}
        {/*</ThemeProvider>)*/}
        {/*:*/}
        {/*""}*/}
        {/*</SelectedCoins>*/}
        {this.state.selectedCoins !== [] ?
          this.state.selectedCoins.map(item =>
            (<ThemeProvider key={item.coinTicker.id} theme={themeCoinPairTile}>
                <CoinDetails  onClick={this.updateSelectedCoin} coin={item.coinTicker} />
              </ThemeProvider>
            ))
          :
          {}}
      </Container>
    );
  }
}
const reducer = (acc, current) => {
  return {...acc, [current.coinTicker.id]: current.coinTicker};
};
const storageCoinsID = (arr) => arr.reduce(reducer,{});

export default App;
