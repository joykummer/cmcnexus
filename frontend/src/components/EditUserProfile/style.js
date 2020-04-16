import styled from "styled-components";

import {RedButton} from '../../styles/Buttons'

export const Button = styled(RedButton)`
display: flex; 
align-self: center; 
justify-content: center; 
//margin-top: 10%; 
width: 150px; 
height: 50px; 
text-transform: uppercase; 
:hover {
       cursor: pointer;
       box-shadow: 0px 5px 6px rgba(0,0,0,0.3);
   }
`;