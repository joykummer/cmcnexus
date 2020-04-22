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

export const Title = styled.div`
font-size: 40px;
font-weight: 700;
margin: 30px 0px;
`;

export const Logo = styled.img`
margin: 20px 0px;
width: 250px;
cursor: pointer;
`;

export const Name = styled.h2`
display:flex; 
justify-content: center; 
font-size: 24px; 
margin-top: 10%; 
text-transform: uppercase; 
`;


export const OptionsWrapper = styled.div`
    width: 80%;
    border: 3px solid red; 
    margin-top: 15px;
`;

export const Options = styled.div`
margin-top: 20px;
width: 100%;
display: flex; 
flex-direction: column; 
`;

export const NavItem = styled.div`
display: flex;
align-items: center; 
font-size: 24px; 
padding: 15px 60px; 
border: 1px solid transparent;
opacity: .7;
${props => props.selected ? "font-weight: bold; opacity: 1; color: red;" : ""}
:hover {
       background-color: #EBEBEB;  
       cursor: pointer;
       opacity: 1;
       box-shadow: 0px 5px 6px rgba(0,0,0,0.3);
   }
`;

export const Button = styled(RedButton)`
margin-bottom: 20px;
width: 150px; 
`;
