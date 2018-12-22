import React from "react";
import { CompareCoin, Container, Result } from "./style";

const CoinComparisonResult = ({ coinBase, coinQuote }) =>
  <Container>
  <CompareCoin>{coinBase.name}/{coinQuote.name}:</CompareCoin>
    <Result>{coinBase.quotes.USD.price / coinQuote.quotes.USD.price }$</Result>
  </Container>;

export default CoinComparisonResult;