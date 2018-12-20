import React from "react";

import { FormContainer, Inputs, Coin } from "./style";

const CoinCompareInput = ({ coinBase, coinQuote }) =>
  <FormContainer>
    <Inputs>
      <Coin
        disabled={true}
        placeholder={`
        ${coinBase.name === undefined ?
          "Base" : coinBase.name} /
          ${coinQuote.name === undefined ?
          "Quote" : coinQuote.name}
          `}
      />
    </Inputs>
  </FormContainer>;

export default CoinCompareInput;