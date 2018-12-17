import React from "react";
import { Coin } from "./style";

const CoinComparisonResult = ({ coinBase, coinQuote }) =>
  <Coin
    placeholder={`
    ${coinBase / coinQuote}
      :
      ${coinBase.quotes.USD.price / coinQuote.quotes.USD.price }
      $
      `}
  />;

export default CoinComparisonResult;