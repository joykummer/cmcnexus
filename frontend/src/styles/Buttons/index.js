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
  width: 125px;
  height: auto;
  margin-bottom: 50px;
`;

export const EditSaveButton = styled(RedButton)`
  width: 75px;
  height: 40px;
  margin-bottom: 50px;
`;

export const AcceptRejectButton = styled(RedButton)`
 width: 100px;  
 height: 40px;
`;


export const RedAddText = styled.div`
  font-size: 18px;
  color: red;
  text-align: right;
  vertical-align: middle;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;