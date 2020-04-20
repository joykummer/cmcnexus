import styled from "styled-components";

export const RedButton = styled.button`
  background: #ff0000;
  border-radius: 5px;
  padding: 10px;
  outline: none;
  color: #ffffff;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    opacity: .75;
    cursor: pointer;
  }
`;

export const AddButton = styled(RedButton)`
  width: 100px;
  margin-bottom: 50px;
`;
