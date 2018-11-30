import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import CoinInput from "./Components/coinInput";
import coinMarketCapData from "./app-data/coin-checker";
import CoinDetails from "./Components/coin-details";
import { fetchAppData } from "./app-data/data-processing";

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

const POST_APP_listings = {
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
    this.setState({ coinsData: await fetchAppData(POST_APP_listings) });

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
        this.setState({ coinsData: await fetchAppData(POST_APP_listings) });
      }
      const result = await coinMarketCapData(coin, this.state.coinsData);
      debugger;
      this.setState(
        state => ({
          selectedCoinDetails: result,
          counter: state.counter + 1,
          selectedCoins: [...state.selectedCoins, result]
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
      this.state.coinsData
    );
    return (
      <Container>
        <CoinInputStyle onChange={this.handleSelectedCoin} />
        <SelectedCoins>
          {/*{this.state.selectedCoins !== [] ?*/}
          {/*(this.state.selectedCoinDetails instanceof Error ?*/}
          {/*this.state.selectedCoinDetails.toString() :*/}
          {/*this.state.selectedCoins.map(item => <CoinDetails coin={item}/>))*/}
          {/*:*/}
          {/*""*/}
          {/*}*/}
          {this.state.selectedCoins !== []
            ? this.state.selectedCoins.map((item, index) => (
                <CoinDetails key={index} coin={item} />
              ))
            : ""}
        </SelectedCoins>
      </Container>
    );
  }
}

export default App;
