import styled from "styled-components";
import { Dropdown } from "../../styles/Dropdowns";
import { RedButton } from "../../styles/Buttons";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #EBEBEB;
  padding: 40px 60px 40px 60px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const SearchContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const SearchWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

export const Card = styled.div`
  width: 30%;
  color: #777;
  font-size: 15px;
  display: flex;
  flex-direction: column;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  border: none;
  background-color: #ebebeb;
  border-bottom: 1px solid red;
`;

export const Filter = styled(Dropdown)`
  width: 100%;
  height: 40px;
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid red;
`;

export const SearchButton = styled(RedButton)`
  width: 150px;
  height: 40px;
  margin-right: 15px;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Clear = styled.div`
  font-size: 11px;
  color: #777;
  :hover {
    color: red;
  }
`;
