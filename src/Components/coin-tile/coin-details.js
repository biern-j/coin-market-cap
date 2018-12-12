import React from "react";
import { Icon } from 'react-icons-kit';
import {loop2} from 'react-icons-kit/icomoon/loop2'
import {
  Mask,
  CoinName,
  PriceChangeCoin,
  FiatPrice,
  CoinBox,
  FirstRow,
  SecondRow,
  PriceChangeBox,
  PriceChangeTitle,
  SinglePriceChange
} from "./style";

const CoinDetails = ({coinToCompare, onClick, coin }) =>
      <Mask onClick={() => coinToCompare(coin)}>
        <CoinBox>
          <FirstRow>
            <CoinName>
              {coin.name}
            </CoinName>
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
              <Icon onClick={() => onClick(coin.id)} icon={loop2}/>
            </PriceChangeBox>
          </FirstRow>
          <SecondRow>
            <FiatPrice>{coin.quotes.USD.price}$</FiatPrice>
          </SecondRow>
        </CoinBox>
      </Mask>;

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