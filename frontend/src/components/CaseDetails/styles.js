import styled from "styled-components";

import { RedButton } from "../../styles/Buttons";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #EBEBEB;
  padding: 40px 60px 40px 60px;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.div`
  font-size: 30px;
  text-transform: uppercase;
  padding-bottom: 15px;
`;

export const DetailsContainer = styled.div`
  height: auto;
  padding: 20px;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
`;

export const DetailsHeader = styled.div`
  display: flex;
  padding: 5px;
`;

export const DetailsKey = styled.div`
  width: 10%;
  min-width: 150px;
  color: #777;
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
  padding: 5px 0px 5px 0px;
  text-transform: uppercase;
  display: flex;
  align-self: end;
`;

export const Match = styled(RedButton)`
  width: 175px;
  height: 70px;
  margin-top: 20px;
`;

export const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Status = styled.div`
  width: 100px;
  margin-right: 10px;
`;
