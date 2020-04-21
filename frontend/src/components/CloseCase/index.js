import React from "react";
import { useDispatch } from "react-redux";
import { RedButton } from "../../styles/Buttons";
import styled from "styled-components";
import {closeCaseFunction} from "../../store/actions/Cases/closeCase";
import {reopenCaseFunction} from "../../store/actions/Cases/reopenCase";


  const CloseButton = styled(RedButton)`
    width: 100px;
    background-color: ${(props) => props.clicked ? "red" : "#009933"};
  `;


export default function CloseCase(singleCase) {
  const dispatch = useDispatch();

  const closeCase = () => {
    console.log(singleCase)
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
