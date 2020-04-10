import styled from "styled-components";

import {RedButton} from '../../styles/Buttons'


export const NavigationContainer = styled.div`
width: 350px;
height: 100%;
background: lightgrey;
display: flex;
flex-direction: column;
justify-content: center;
`;

export const Logo = styled.img`
margin: 20px; 
transition: all 0.5s ease-in-out 0s;
:hover
{
    cursor: default;
    transform: rotate(360deg);
    transition: all 0.5s ease-in-out 0s;
}
`;

export const Name = styled.h2`
display:flex; 
justify-content: center; 
font-size: 24px; 
margin-top: 10%; 
text-transform: uppercase; 
`;

export const Options = styled.ul`
height: 30%; 
margin: 20px; 
list-style: none; 
border-bottom: 4px solid red; 
border-top: 4px solid red; 
padding-bottom: 10%;
padding-top: 10%; 
display: flex; 
flex-direction: column; 
`;

export const NavItem = styled.li`
flex:1; 
align-items: center; 
font-size: 24px; 
padding-left: 20px; 
background-repeat: no-repeat; 
:hover {
       color: red;
       background-color:lightgray;  
       cursor: pointer;
       box-shadow: 0px 5px 6px rgba(0,0,0,0.3);
   }
`;

export const Button = styled(RedButton)`
display: flex; 
align-self: center; 
justify-content: center; 
margin-top: 20%; 
width: 150px; 
height: 50px; 
text-transform: uppercase; 
:hover {
       cursor: pointer;
       box-shadow: 0px 5px 6px rgba(0,0,0,0.3);
   }
`;
