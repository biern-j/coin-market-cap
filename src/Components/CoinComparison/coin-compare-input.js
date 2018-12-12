import React from "react";
import styled from "styled-components";
import {thickRight} from 'react-icons-kit/iconic/thickRight';
import { Icon } from 'react-icons-kit';

const Coin = styled.input`
  flex-grow: 1;
  color: #BFD2FF;
  font-size: 1.8rem;
  line-height: 2.4rem;
  vertical-align: middle;
  border-style: none;
  background: transparent;
  outline: none;
`;

const CoinSubmit = styled.button`
  color: #7881A1;
  font-size: 2.4rem;
  line-height: 2.4rem;
  vertical-align: middle;
  transition: color .25s; 
  padding: 0;
  background: none;
  border: none;
  outline: none;
`;

const FormContainer = styled.form`
  display: flex;
  align-content: center;
`;

const Inputs = styled.div`
 position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 400px;
  border-radius: 2px;
  padding: 1.4rem 2rem 1.6rem;
  background: $input-background;
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    height: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-position: 0% 0%;
    background: linear-gradient(to right, #B294FF, #57E6E6, #FEFFB8, #57E6E6, #B294FF, #57E6E6);
    background-size: 500% auto;
    animation: gradient 3s linear infinite;
  }
`;

const CoinCompareInput = ({ coinToCompare1, coinToCompare2 }) =>
  <FormContainer>
    <Inputs>
      <Coin
        placeholder={coinToCompare1.name}
      />
      <Coin
        placeholder={coinToCompare2.name}
      />
    </Inputs>
  </FormContainer>;

export default CoinCompareInput;