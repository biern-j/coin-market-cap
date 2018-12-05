import styled from "styled-components";

const setChangeColor = props => {
  const { color } = props.theme;
  switch (props.changeType) {
    case "rise":
      return color.rise;
    case "fall":
      return color.fall;
    default:
      return color.constant;
  }
};

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 6.8125rem 15.625rem 2.75rem 15.0625rem;

  @media screen and (max-width: 414px) {
    display: flex;
    flex-wrap: wrap;
    padding: 6.8125rem 0 5.75rem 0;
  }

  @media screen and (width: 768px) {
    padding: 6.8125rem 5rem 5.75rem 5rem;
  }
`;

export const Mask = styled.div`
  display: flex;
  width: 30%;
  max-width: 28rem;
  min-width: 22rem;
  background-blend-mode: normal, overlay;
  border-radius: 4px;
  border: solid 1px transparent;
  background-image:linear-gradient(to right, #B294FF, #57E6E6);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin: 1.125rem;

  @media screen and (max-width: 414px) {
    flex: 1 1 fit-content;
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
`;

export const CoinPair = styled.div`
  flex: 1 1 fit-content;
  font-family: Roboto, sans-serif;
  font-size: ${props => props.theme.fontSize.large};
  font-weight: 500;
  margin: 0.75rem 1.375rem 0.125rem 1.125rem;
  padding: 0.5625rem 0 0.25rem 0;
  color: ${props => props.theme.color.primary};
  width: 50%;
`;

export const PriceChange = styled.div`
  flex: 1 1 fill;
  padding: 0.25rem 0;
  margin: 1.3125rem 0.3125rem 0.375rem 0;
  font-family: Roboto, sans-serif;
  font-size: ${props => props.theme.fontSize.middle};
  color: ${setChangeColor};
  width: 50%;
`;

export const Price = styled.span`
  flex: 1 1 fill;
  font-family: Roboto, sans-serif;
  margin: 0 0 1.5625rem 1.125rem;
  padding: 0.25rem 0;
  font-size: ${props => props.theme.fontSize.smaller};
  color: ${setChangeColor};

  @media screen and (max-width: 414px) {
    margin-left: 1.125rem;
    padding: 0;
  }
`;

export const FiatPrice = styled.span`
  flex: 1 1 fill;
  margin: 0 3rem 1.5625rem 0.75rem;
  padding: 0.25rem 0;
  font-family: Roboto, sans-serif;
  font-size: ${props => props.theme.fontSize.smaller};
  color: ${props => props.theme.color.secondary};

  @media screen and (max-width: 414px) {
    margin: 0 3rem 0 0.75rem;
    padding: 0;
  }
`;

export const VolumeTitle = styled.div`
  font-family: Roboto, sans-serif;
  font-size: ${props => props.theme.fontSize.smaller};
  color: ${props => props.theme.color.primary};
  padding: 0.25rem 0;
  margin-top: 0.25rem;

  @media screen and (max-width: 414px) {
    margin-bottom: 0.125rem;
    padding: 0;
  }
`;

export const VolumeCoin = styled.div`
  font-family: Roboto, sans-serif;
  font-size: ${props => props.theme.fontSize.small};
  line-height: 1.5;
  color: ${props => props.theme.color.primary};
`;

export const CoinBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 70%;

  @media screen and (max-width: 414px) {
    width: 100%;
  }
`;

export const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SecondRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const VolumeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 1.5625rem 0  1.4375rem 0.3125rem;
  width: 30%;

  @media screen and (max-width: 414px) {
    display: flex;
    justify-content: end;
    margin: 0 0 0.5625rem 1.125rem;
    min-width: 118px;
  }
`;
