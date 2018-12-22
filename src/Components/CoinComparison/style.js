import styled from "styled-components";

export const Coin = styled.input`
  flex-grow: 1;
  color: #BFD2FF;
  font-size: 1.8rem;
  line-height: 2.4rem;
  vertical-align: middle;
  border-style: none;
  background: transparent;
  outline: none;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

export const Inputs = styled.div`
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

export const Result = styled.div`
  flex-grow: 1;
  color: #BFD2FF;
  font-size: 1.8rem;
  line-height: 2.4rem;
  vertical-align: middle;
  border-style: none;
  background: transparent;
  outline: none;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

export const CompareCoin = styled.div`
  flex-grow: 1;
  color: #BFD2FF;
  font-size: 1.8rem;
  line-height: 2.4rem;
  vertical-align: middle;
  border-style: none;
  background: transparent;
  outline: none;
`;
