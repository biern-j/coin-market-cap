import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import CoinInput from "./Components/coin-input";
import coinMarketCapData from "./app-coin-data-processing/coin-output";
import CoinDetails from "./Components/coin-details";
import { fetchAppData } from "./app-coin-data-processing/coin-data-fetching";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SelectedCoins = styled.div`
  color: #61dafb;
`;

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

      const reducer = (acc, current) => {
        return {...acc, [current.coinTicker.id]: current.coinTicker};
      };
      const reduceTest =this.state.selectedCoins.reduce(reducer,{});
      console.log("reducer", reduceTest);

      const result = await coinMarketCapData(coin, this.state.coinsData);
      const checkCoin = this.state.selectedCoins.find(item =>
        item.coinTicker.id === result.coinTicker.id);

      this.setState(
        state => (
          {
          selectedCoinDetails: result,
          counter: state.counter + 1,
          selectedCoins: checkCoin ? state.selectedCoins : [...state.selectedCoins, result]
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

  render() {
    console.log(
      "coin list",
      this.state.selectedCoins,
      "all data",
      this.state.coinsData,
      "coin details", this.state.selectedCoinDetails
    );

    return (
      <Container>
        <CoinInputStyle onChange={this.handleSelectedCoin} />
        <SelectedCoins>
          {this.state.selectedCoinDetails !== "" ?
            (<CoinDetails coin={this.state.selectedCoinDetails.coinTicker} />)
            :
            ""}
        </SelectedCoins>
        {this.state.selectedCoins !== [] ?
          this.state.selectedCoins.map(item =>
            (<CoinDetails key={item.coinTicker.id} coin={item.coinTicker} />))
          :
          []}
      </Container>
    );
  }
}

export default App;


// [{"coinTicker":{"id":1027,
//     "name":"Ethereum","symbol":"ETH",
//     "website_slug":"ethereum","rank":3,
//     "circulating_supply":103576437,
//     "total_supply":103576437,
//     "max_supply":null,
//     "quotes":{"USD":{"price":113.67611992,
//         "volume_24h":1794834913.61305,
//         "market_cap":11774167530,
//         "percent_change_1h":0,"percent_change_24h":-2.79,"percent_change_7d":1.92}},
//     "last_updated":1543848018}}]