import React, { Component } from 'react';
import styled from "styled-components";
import './App.css';
import Crawler from "./Components/coin-crawler";
import coinMarketCapData from "./Components/coin-market-cap-data";
import CoinDetails from "./Components/coin-details";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinName = styled.div`
   color: #61dafb;
`;

const CrawlerStyle = styled(Crawler)`

`;

class App extends Component {
  constructor(props){
    super(props);
    this.state = { coinDetails: "", marketCapData: {}, counter: 0 };
    this.handleCrawledCoin = this.handleCrawledCoin.bind(this);
  }

 componentDidMount() {
    const data = localStorage.getItem("coinMarketData");
    if (data) {
      this.setState({ marketCapData: JSON.parse(data) });
    }
  }

 handleCrawledCoin = async (coin) => {
    if (this.state.counter === 0 || this.state.counter >= 5) {
      this.setState({ marketCapData: await fetchListings() });
    }

    const result = await coinMarketCapData(coin, this.state.marketCapData);
    this.setState({ coinDetails: result, counter: this.state.counter + 1 });

   localStorage.setItem("coinMarketData", JSON.stringify(this.state.marketCapData));
  };

  render() {
    return (
      <Container>
        <CrawlerStyle onChange={this.handleCrawledCoin}/>
        <CoinName>
            {this.state.coinDetails !== "" ?
              (this.state.coinDetails instanceof Error ?
                  this.state.coinDetails.toString() :
                  (<CoinDetails coin={this.state.coinDetails.coinTicker}/>)
              ) :
              ""
            }
          </CoinName>
      </Container>
    );
  }
}

const fetchListings = async () => {
  try {
    const marketCapListings = await
      fetch("https://api.coinmarketcap.com/v2/listings/");
    return await marketCapListings.json();
  } catch(err) {
    return Error("Error Listings");
  }
};

export default App;
