import styled from "styled-components";

import { RedButton } from "../../styles/Buttons";
import { Dropdown } from "../../styles/Dropdowns";


export const AddButton = styled(RedButton)`
width: 100px;
height: 75px;
margin-top: 20px;
margin-bottom: 50px; 
`;

export const Checkbox = styled.input`
margin-top: 2px; 
margin-right: 10px;
`;

export const CategoryDropdown = styled(Dropdown)`
width: 300px;
height: auto;
margin-top: 2px;
padding: 10px 0px 10px 0px;
 background: none;
`;

export const CaseDropdown = styled(Dropdown)`
  width: 200px;
  height: 40px;
  margin-top: 2px;
`;
