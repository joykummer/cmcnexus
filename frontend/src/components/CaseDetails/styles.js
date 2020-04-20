import styled from "styled-components";
import { RedButton } from "../../styles/Buttons";

export const DetailsHeader = styled.div`
  display: flex;
  padding: 5px;
`;

export const DetailsKey = styled.div`
  width: 10%;
  min-width: 150px;
  color: #777;
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
  width: 225px;
`;
