import React from "react";

import {
  Mask,
  CoinPair,
  PriceChangeCoin,
  FiatPrice,
  CoinBox,
  Container,
  FirstRow,
  SecondRow,
  PriceChangeBox,
  PriceChangeTitle,
  ButtonRefresh
} from "./style";

class CoinDetails extends React.Component{
  render() {
  return (
  <Container>
      <Mask >
        <CoinBox>
          <FirstRow>
            <CoinPair>
              {this.props.coin.name}
            </CoinPair>
            <PriceChangeBox>
              <ButtonRefresh onClick={() => this.props.onClick(this.props.coin.id)}>refresh</ButtonRefresh>
              <PriceChangeTitle>7d:</PriceChangeTitle>
            <PriceChangeCoin changeType={handlePriceChange(this.props.coin.quotes.USD.percent_change_7d)} >
              {this.props.coin.quotes.USD.percent_change_7d}%</PriceChangeCoin>
              <PriceChangeTitle> 24h:</PriceChangeTitle>
            <PriceChangeCoin changeType={handlePriceChange(this.props.coin.quotes.USD.percent_change_24h)} >
             {this.props.coin.quotes.USD.percent_change_24h}%</PriceChangeCoin>
            </PriceChangeBox>
          </FirstRow>
          <SecondRow>
            <FiatPrice>{this.props.coin.quotes.USD.price}$</FiatPrice>
          </SecondRow>
        </CoinBox>
      </Mask>
  </Container>
);}}

function handlePriceChange(change) {
  if (change > 0) {
    return "rise";
  }
  if (change < 0) {
    return "fall"
  }
  return "constant";
}

export default CoinDetails;