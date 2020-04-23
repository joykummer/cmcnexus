import styled from "styled-components";

export const GreyRoundInput = styled.input`
  box-sizing: border-box;
  border: solid 1px darkgray;
  border-radius: 5px;
  outline-color: gray;
  height: 50px;
  padding-left: 10px;
`;

export const FieldInput = styled(GreyRoundInput)`
  width: 100%;
  height: 35px;
  margin-top: 2px;
`;

export const FieldInputLarge = styled.textarea`
  height: 100px;
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

export const FilterInput = styled(GreyRoundInput)`
    width: 100%;
    height: 25px;
`;