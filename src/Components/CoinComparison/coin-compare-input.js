import React from "react";

import { FormContainer, Inputs, Coin } from "./style";

const CoinCompareInput = ({ coinToCompare }) =>
  <FormContainer>
    <Inputs>
      <Coin
        disabled={true}
        placeholder={coinToCompare.base.name === undefined ? "Base" : coinToCompare.base.name}
      />
      <Coin
        disabled={true}
        placeholder={coinToCompare.quote.name === undefined ? "Quote" : coinToCompare.quote.name}
      />
    </Inputs>
  </FormContainer>;

export default CoinCompareInput;