import React from "react";
import { useDispatch } from "react-redux";
import {TwoOptionsButton} from "../../styles/Buttons";
import styled from "styled-components";
import {closeCaseFunction} from "../../store/actions/Cases/closeCase";
import {reopenCaseFunction} from "../../store/actions/Cases/reopenCase";


  const CloseButton = styled(TwoOptionsButton)`
    width: 150px;
    background-color: ${(props) => props.clicked ? "red" :"white"};
    border: ${(props) => props.clicked ? "none" : "1px solid red"};
    color: ${(props) => props.clicked ? "white" : "red"};
  `;


export default function CloseCase(singleCase) {
  const dispatch = useDispatch();

  const closeCase = () => {
    dispatch(closeCaseFunction(singleCase.id.id))
  };
  const reopenCase = () => {
    dispatch(reopenCaseFunction(singleCase.id.id))
  };
  return<>
      {
          singleCase.id.status === "closed"
          ? <CloseButton onClick={reopenCase}>Reopen</CloseButton>
          : <CloseButton onClick={closeCase} clicked={true}>Close</CloseButton>
      }
      </>;
}
