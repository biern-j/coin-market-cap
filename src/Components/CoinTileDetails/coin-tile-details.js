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


class CoinDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boldChosenTile: false, checked: [] };
  }
  setBoldTile = () => {
    this.setState({ boldChosenTile: !this.state.boldChosenTile });
  };

  render(){
    const { coins } = this.props;
    const coinTiles = Object.values(coins).map(item => (
      <Mask chosenCoin={this.state.boldChosenTile} onClick={() => {
        this.props.coinToCompare(item);
        this.setBoldTile();
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
              <Icon onClick={this.props.onClick(() => item.id)} icon={loop2}/>
            </PriceChangeBox>
          </FirstRow>
      </Mask>
    ) );
    return coinTiles;
  };

};


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