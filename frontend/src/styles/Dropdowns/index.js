import styled from "styled-components";
import caret from "../../assets/caret-down.svg";

export const Dropdown = styled.select`
  font-size: 14px;
  border-radius: 5px;
  border: solid 1px darkgray;
  text-align: left;
  outline-color: gray;
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

export const CountryDropdown = styled(Dropdown)`
  width: 300px;
  height: 40px;
  margin-top: 2px;
`;

export const SexDropdown = styled(Dropdown)`
  width: 200px;
  height: 40px;
  margin-top: 2px;
`;

export const CategoryDropdown = styled(Dropdown)`
  width: 300px;
  height: auto;
  margin-top: 2px;
  padding: 10px 0px 10px 0px;
  background: none;
`;