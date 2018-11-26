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


const CoinDetails = ({coin: {
  id,
  symbol,
  name,
  website_slug,
  quotes: {
    USD: {
        price,
        volume_24h,
        percent_change_1h,
        percent_change_24h
    }
  }
}}) =>
  <List>
    <ListItem>id: {id}</ListItem>
    <ListItem>symbol: {symbol}</ListItem>
    <ListItem>name: {name}</ListItem>
    <ListItem>website slug: {website_slug}</ListItem>
    <ListItem>price: {price}$</ListItem>
    <ListItem>volume: {volume_24h}</ListItem>
    <ListItem>percent change 1h: {percent_change_1h}%</ListItem>
    <ListItem>percent change 24h: {percent_change_24h}%</ListItem>
  </List>;

export default CoinDetails;
