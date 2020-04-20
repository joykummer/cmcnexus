import styled from "styled-components";
import { GreyRoundInput } from "../../styles/Inputs";

export const Label = styled.label`
  width: 100%;
  font-size: 14px;
  color: #777;
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FieldInput = styled(GreyRoundInput)`
  width: 100%;
  height: 35px;
  margin-top: 2px;
  color: black;
`;

export const FieldInputLarge = styled.textarea`
  height: 170px;
  width: 100%;
  resize: none;
  margin-top: 2px;
  box-sizing: border-box;
  background-color: white;
  border: solid 1px darkgray;
  border-radius: 5px;
  outline-color: gray;
  padding: 10px;
`;
