import React from "react";
import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  font-size: 200%;
  padding: 5%;
`;


const CoinDetails = ({coin}) => {
  // const {name, symbol, quotes} = coin;

  return (
    <List>
      <ListItem>{coin.symbol}</ListItem>
      <ListItem>{coin.name}</ListItem>
      {/*<ListItem>price: {coin.quotes.USD.price}$</ListItem>*/}
      {/*<ListItem>percent change 7d: {coin.quotes.USD.percent_change_7d}%</ListItem>*/}
      {/*<ListItem>percent change 24h: {coin.quotes.USD.percent_change_24h}%</ListItem>*/}
    </List>
  );
};

export default CoinDetails;

