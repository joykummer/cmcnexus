import styled from "styled-components";

export const RedButton = styled.button`
  height: 40px;
  background: #ff0000;
  padding: 10px;
  border-radius: 7px;
  border: none;
  outline: none;
  color: #ffffff;
  margin-right: 15px;
  text-transform: uppercase;
  transition: all 0.7s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    opacity: .75;
    cursor: pointer;
  }
`;

export const AddButton = styled(RedButton)`
  width: 125px;
`;

export const EditSaveButton = styled(RedButton)`
  width: 75px;
`;

export const AcceptRejectButton = styled(RedButton)`
 width: 100px;  
`;

export const ClickLink = styled.div`
  font-size: 18px;
  color: red;
  text-align: right;
  :hover {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
`;