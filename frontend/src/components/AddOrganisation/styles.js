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
background-color:#ebebeb;
overflow-y: scroll;
align-items: center;
`;

export const HeaderTitle = styled.div`
display: flex; 
justify-content: center; 
font-size: 30px; 
margin-top: 70px; 
margin-bottom: 40px; 
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
padding: 20px; 
margin: 30px; 
background-color: white;
box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
/* box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); */
border-radius: 5px;
`;

export const Label = styled.label`
display: flex;
flex-direction: column;
align-self: center; 
color: #777;
margin: 10px;
position: relative;
width: 90%;
margin: 15px;
`;

export const FieldInput = styled(GreyRoundInput)`
width: 100%;
height: 35px;
margin-top: 5px; 
border: none; 
`;

export const FieldInputLarge = styled.textarea`
resize: none; 
margin-top: 5px; 
background-color: #f1f1f1;
border: 2px solid #c4c4c4;
box-sizing: border-box;
border-radius: 5px;
outline: none;
height: 170px;
padding: 10px;
border: none; 
`;

export const CategoryDropdown = styled(Dropdown)`
width: 200px;
height: auto;
margin-top: 5px; 
`;

export const AddButton = styled(RedButton)`
width: 75px;
height: 50px;
margin-top: 20px;
margin-bottom: 50px; 
`;