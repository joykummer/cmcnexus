import styled from "styled-components";
import caret from "../../assets/caret-down.svg";

export const Dropdown = styled.select`
  font-size: 14px;
  border-radius: 5px;
  border: solid 1px #777;
  text-align: left;
  outline: none;
  background-color: white;
  background: url(${caret});
  background-size: 15px 15px;
  background-position: 95% 50%;
  background-repeat: no-repeat;
  -webkit-appearance: none;
  text-indent: 15px;
  text-overflow: "";
  :focus {
    outline: none;
  }
`;
