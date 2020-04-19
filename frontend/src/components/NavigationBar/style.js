import styled from "styled-components";

import {RedButton} from '../../styles/Buttons'


export const NavigationContainer = styled.div`
width: 350px;
min-width: 350px;
height: 100%;
background: white;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
box-shadow: 0px 5px 6px rgba(0,0,0,0.3);
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
margin-top: 20px;
width: 80%;
border-bottom: 4px solid red; 
border-top: 4px solid red; 
padding: 20px 0;
display: flex; 
flex-direction: column; 
`;

export const NavItem = styled.div`
display: flex;
align-items: center; 
font-size: 24px; 
padding: 15px 20px; 
border: 1px solid transparent;
opacity: .4;
${props => props.selected ? "font-weight: bold; opacity: 1;" : ""}
:hover {
       color: red;
       font-weight: bold;
       background-color: rgb(192,192,192);  
       cursor: pointer;
       opacity: 1;
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
