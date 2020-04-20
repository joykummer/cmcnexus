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

export const NewButton = styled(RedButton)`
  width: 125px;
  height: 40px;
`;

export const AddButton = styled(RedButton)`
  width: 125px;
  height: 40px;
  margin-bottom: 50px;
`;

export const AcceptRejectButton = styled(RedButton)`
 height: 40px;
 width: 100px;  
`;