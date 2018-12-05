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
  ButtonRefresh,
  SinglePriceChange
} from "./style";

const CoinDetails = ({onClick, coin }) =>

  <Container>
      <Mask >
        <CoinBox>
          <FirstRow>
            <CoinPair>
              {coin.name}
            </CoinPair>
            <PriceChangeBox>
              <SinglePriceChange>
              <PriceChangeTitle>7d:</PriceChangeTitle>
            <PriceChangeCoin changeType={handlePriceChange(coin.quotes.USD.percent_change_7d)} >
              {coin.quotes.USD.percent_change_7d}%</PriceChangeCoin>
              </SinglePriceChange>
              <SinglePriceChange>
              <PriceChangeTitle> 24h:</PriceChangeTitle>
            <PriceChangeCoin changeType={handlePriceChange(coin.quotes.USD.percent_change_24h)} >
             {coin.quotes.USD.percent_change_24h}%</PriceChangeCoin>
              </SinglePriceChange>
              {/*<Icon onClick={() => onClick(coin.id)} icon={refreshing}>refresh</Icon>*/}
              <li onClick={() => onClick(coin.id)} className="ion-refreshing" data-pack="default" data-tags="reload, renew, animation"
                  data-animation="true"></li>
            </PriceChangeBox>
          </FirstRow>
          <SecondRow>
            <FiatPrice>{coin.quotes.USD.price}$</FiatPrice>
          </SecondRow>
        </CoinBox>
      </Mask>
  </Container>;

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