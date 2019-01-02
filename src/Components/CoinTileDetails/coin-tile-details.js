import React from "react";
import { Icon } from 'react-icons-kit';
import {loop2} from 'react-icons-kit/icomoon/loop2';
import { handlePriceChange } from './price-change-handler';

import {
  Mask,
  CoinName,
  PriceChangeCoin,
  FiatPrice,
  FirstRow,
  PriceChangeBox,
  PriceChangeTitle,
  SinglePriceChange
} from "./style";


const CoinDetails = ({onClick, coinToCompare, coins, coinToBold}) =>
  Object.values(coins).map(item => (
    <Mask key={item.id} chosenCoin={item === coinToBold[0] || item === coinToBold[1]} onClick={() => {
      coinToCompare(item);
    }}>
      <CoinName>
        {item.name}
      </CoinName>
      <FiatPrice>{item.quotes.USD.price}$</FiatPrice>
      <FirstRow>
        <PriceChangeBox>
          <SinglePriceChange>
            <PriceChangeTitle>7d:</PriceChangeTitle>
            <PriceChangeCoin changeType={handlePriceChange(item.quotes.USD.percent_change_7d)} >
              {item.quotes.USD.percent_change_7d}%</PriceChangeCoin>
          </SinglePriceChange>
          <SinglePriceChange>
            <PriceChangeTitle> 24h:</PriceChangeTitle>
            <PriceChangeCoin changeType={handlePriceChange(item.quotes.USD.percent_change_24h)} >
              {item.quotes.USD.percent_change_24h}%</PriceChangeCoin>
          </SinglePriceChange>
          <Icon onClick={() => onClick(item.id)} icon={loop2}/>
        </PriceChangeBox>
      </FirstRow>
    </Mask>
  ));

export default CoinDetails;