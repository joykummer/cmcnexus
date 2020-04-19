import styled from "styled-components";

import { RedButton } from "../../styles/Buttons";


export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  align-items: center;
  line-height: 1.5; 
  overflow-y: scroll;
  letter-spacing: initial; 
  background-color:#ebebeb;
`;

export const HeaderTitle = styled.div`
font-size: 30px; 
border-bottom: 3px solid red; 
text-transform: uppercase; 
`;

export const DetailsContainer = styled.div`
width: 80%;
height: auto; 
display: flex; 
flex-direction: column; 
padding: 20px; 
margin: 2%; 
background-color: white;
border-radius: 5px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

export const DetailsHeader = styled.div`
display: flex; 
text-transform: capitalize; 
padding: 8px; 
`;

export const DetailsKey = styled.div`
width: 10%; 
min-width: 150px; 
`;

export const Stripe = styled.div`
height: auto;
width: 30%; 
background-color: red; 
display: flex; 
align-self: end;
margin-left: 5%;
font-size: 20px; 
border-radius: 5px; 
margin-top: 2%; 
padding-left: 1%; 
color: white; 
text-transform: uppercase; 
`;

export const Match = styled(RedButton)`
  width: 175px;
  height: 70px;
  margin-top: 20px;
`;