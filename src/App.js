import React, { Component } from 'react';
import styled from "styled-components";
import './App.css';
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

const CoinInputStyle = styled(CoinInput)`

`;

const POST_APP_listings = {
  address:  "https://api.coinmarketcap.com/v2/listings/",
  errorMessage: "Error Listings"
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = { selectedCoinDetails: "", coinsData: {}, counter: 0, selectedCoins: [] };
    this.handleSelectedCoin = this.handleSelectedCoin.bind(this);
  }

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

  handleSelectedCoin = async (coin) => {
    if (this.state.counter >= 5) {
      this.setState({ coinsData: await fetchAppData(POST_APP_listings) });
    }
    const result = await coinMarketCapData(coin, this.state.coinsData);
    this.setState({
      selectedCoinDetails: result,
      counter: this.state.counter + 1,
      selectedCoins: [...this.state.selectedCoins, result.coinTicker]
    });

    localStorage.setItem("coinData", JSON.stringify(this.state.coinsData));
    localStorage.setItem("selectedCoinsList", JSON.stringify(this.state.selectedCoins));
  };

  render() {
    console.log("coin list", this.state.selectedCoins, "all data", this.state.coinsData);
    return (
      <Container>
        <CoinInputStyle onChange={this.handleSelectedCoin}/>
        <SelectedCoins>
          {this.state.selectedCoins !== [] ?
            this.state.selectedCoins.map(item => <CoinDetails key={item.id} coin={item}/>)
            :
            ""
          }
        </SelectedCoins>
      </Container>
    );
  }
}

export default App;
