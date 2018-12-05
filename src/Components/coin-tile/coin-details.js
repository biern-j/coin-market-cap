import React from "react";

import {
  Mask,
  CoinPair,
  PriceChange,
  FiatPrice,
  CoinBox,
  Container,
  FirstRow,
  SecondRow
} from "./style";

const CoinDetails = ({ coin }) => (
  <Container>
      <Mask >
        <CoinBox>
          <FirstRow>
            <CoinPair>
              {coin.name}
            </CoinPair>
            <PriceChange changeType={handlePriceChange(coin.quotes.USD.percent_change_7d)} >
              7d: {coin.quotes.USD.percent_change_7d}%</PriceChange>
            <PriceChange changeType={handlePriceChange(coin.quotes.USD.percent_change_24h)} >
              24h: {coin.quotes.USD.percent_change_24h}%</PriceChange>
          </FirstRow>
          <SecondRow>
            <FiatPrice>{coin.quotes.USD.price}$</FiatPrice>
          </SecondRow>
        </CoinBox>
      </Mask>
  </Container>
);

function handlePriceChange(change) {
  console.log("price", change);
  if (change > 0) {
    return "rise";
  }
  if (change < 0) {
    return "fall"
  }
  return "constant";
}

export default CoinDetails;