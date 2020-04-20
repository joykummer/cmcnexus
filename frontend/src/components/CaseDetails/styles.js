import styled from "styled-components";

import { RedButton } from "../../styles/Buttons";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #EBEBEB;
  padding: 40px 60px 40px 60px;
  overflow: auto;
  letter-spacing: initial;
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.div`
  font-size: 30px;
  text-transform: uppercase;
  margin-bottom: 25px;
`;

export const DetailsContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

export const DetailsHeader = styled.div`
  display: flex;
  text-transform: capitalize;
  padding: 5px;
`;

export const DetailsKey = styled.div`
  width: 10%;
  min-width: 150px;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Stripe = styled.div`
  width: auto;
  color: red;
  font-weight: bold;
  font-size: 20px;
  border-radius: 5px;
  padding: 5px 15px 5px 15px;
  text-transform: uppercase;
  display: flex;
  align-self: end;
`;

export const Match = styled(RedButton)`
  width: 175px;
  height: 70px;
  margin-top: 20px;
`;
