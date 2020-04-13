import styled from "styled-components";

import {RedButton} from '../../styles/Buttons'


export const NavigationContainer = styled.div`
width: 350px;
height: 100%;
background: lightgrey;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
`;

export const Logo = styled.img`
margin: 30px 0px;
width: 300px;
`;

export const Name = styled.h2`
display:flex; 
justify-content: center; 
font-size: 24px; 
margin-top: 10%; 
text-transform: uppercase; 
`;

export const Options = styled.div`
width: 100%;
border-bottom: 4px solid red; 
border-top: 4px solid red; 
padding: 6px 0;

display: flex; 
flex-direction: column; 
`;

export const NavItem = styled.div`
display: flex;
align-items: center; 

font-size: 24px; 
padding: 10px 20px; 
border: 1px solid transparent;
${props => props.selected ? "background-color: darkgray;" : ""}
:hover {
       color: red;
       background-color: rgb(192,192,192);  
       cursor: pointer;
       box-shadow: 0px 5px 6px rgba(0,0,0,0.3);
   }
`;

export const Button = styled(RedButton)`
margin-bottom: 20px;
width: 150px; 
height: 50px; 
text-transform: uppercase; 
:hover {
       cursor: pointer;
       box-shadow: 0px 5px 6px rgba(0,0,0,0.3);
   }
`;
