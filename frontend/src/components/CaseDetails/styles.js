import styled from "styled-components";

import { RedButton } from "../../styles/Buttons";


export const Container = styled.div`
  width: 100%;
  /* height: 100%; */
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5; 
  letter-spacing: initial; 
`;

export const Header = styled.div`
width: auto;
height: auto; 
padding-bottom: 0.5%; 
display: flex; 
margin-top: 3%; 
font-size: 20px; 
`;

export const HeaderTitle = styled.div`
display: flex; 
justify-content: center; 
font-size: 30px; 
margin-top: 5%; 
margin-bottom: 3%; 
border-bottom: 3px solid red; 
`;

export const DetailsContainer = styled.div`
width: 80%;
height: auto; 
display: flex; 
flex-direction: column; 
padding: 20px; 
margin: 2%; 
background-color: #ebebeb;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
/* :hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
} */
`;

export const DetailsHeader = styled.div`
display: flex; 
text-transform: capitalize; 
`;

export const DetailsKey = styled.div`
width: 15%; 
min-width: 100px; 
`;

export const MiddleContainer = styled.div`
display: flex; 
width: 80%; 
flex-wrap: wrap;  
margin: 2%; 
background-color: #ebebeb;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
padding: 20px;
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