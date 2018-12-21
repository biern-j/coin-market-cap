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
    this.state = {boldChosenTile: false, checked: []};
  }
  setBoldTile = (id) => {
    this.setState({ boldChosenTile: !this.state.boldChosenTile, checked: [...this.state.checked, id ]});
  };

  isDisabled = id => {
    return (
      this.state.checked.length > 2 && this.state.checked.indexOf(id) === -1
    );
  };

  render(){
    const { coin } = this.props;
    const coinTile = Object.values(coin).map(item => (
      <Mask chosenCoin={this.state.boldChosenTile} onClick={() => {
        this.props.coinToCompare(coin);
        this.setBoldTile(item.id);
        this.isDisabled(item.id);
      }}>
        <CoinBox>
          <FirstRow>
            <CoinName>
              {item.name}
            </CoinName>
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
          <SecondRow>
            <FiatPrice>{item.quotes.USD.price}$</FiatPrice>
          </SecondRow>
        </CoinBox>
      </Mask>
    ) );
    return coinTile;
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