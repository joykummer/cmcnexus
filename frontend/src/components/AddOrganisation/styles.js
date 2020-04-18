import styled from "styled-components";
import { Dropdown } from "../../styles/Dropdowns";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";


export const Container = styled.div`
width: 100%;
height: 100%;
overflow: scroll;
display: flex;
flex-direction: column;
/* justify-content: center; */
align-items: center;
`;

export const HeaderTitle = styled.div`
display: flex; 
justify-content: center; 
font-size: 30px; 
margin-top: 5%; 
margin-bottom: 3%; 
border-bottom: 3px solid red; 
text-transform: uppercase; 
`;

export const DetailsContainer = styled.div`
width: 80%;
height: auto; 
  border-radius: 5px;
display: flex; 
flex-wrap: wrap; 
flex-direction: column; 
background-color: #ebebeb;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const Label = styled.label`
display: flex;
flex-direction: column;
align-self: center; 
color: #777;
position: relative;
width: 90%;
margin: 15px;
`;

export const FieldInput = styled(GreyRoundInput)`
width: 100%;
height: 35px;
margin-top: 5px; 
background-color: white;
`;

export const FieldInputLarge = styled.textarea`
resize: none; 
margin-top: 5px; 
background: #f1f1f1;
border: 2px solid #c4c4c4;
box-sizing: border-box;
border-radius: 5px;
outline: none;
height: 170px;
padding: 10px;
background-color: white;
`;

export const CategoryDropdown = styled(Dropdown)`
width: 200px;
height: auto;
`;

export const AddButton = styled(RedButton)`
width: 75px;
height: 50px;
margin-top: 20px;
margin-bottom: 50px; 
`;