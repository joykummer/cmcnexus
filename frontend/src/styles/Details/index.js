import styled from "styled-components";

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

export const DetailsHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  width: 100%;
`;

export const DetailsKey = styled.div`
  width: 170px;
  max-width: 170px;
  min-width: 170px;
  color: #777;
`;

export const DetailsValue = styled.div`
    padding-left: 15px;
`;

export const StatusDetailsValue = styled.div`
    padding-left: 15px;
    text-transform: capitalize;
    
    
  color: ${props => props.status ? props.theme.colors.status[props.status] : null}}
`;