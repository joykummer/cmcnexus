import styled from "styled-components";

export const RedButton = styled.button`
  height: 40px;
  background: red;
  padding: 10px;
  border-radius: 7px;
  border: none;
  outline: none;
  color: white;
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

export const TwoOptionsButton = styled(RedButton)`
    width: 150px;
    background-color: ${(props) => props.clicked ? "white" : "red"};
    border: ${(props) => props.clicked ? "1px solid red" : "none"};
    color: ${(props) => props.clicked ? "red" : "white"};
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