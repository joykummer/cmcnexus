import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RedButton } from "../../styles/Buttons";
import styled from "styled-components";
import {closeCaseFunction} from "../../store/actions/Cases/closeCase";


  const CloseButton = styled(RedButton)`
    width: 150px;
    height: 40px;
    margin: 25px 50px;
    border: none;
    background-color: #e60000;
    transition: all 0.7s ease;
    :hover {
        cursor: pointer;
        opacity: 0.8;
    }
  `;


export default function CloseCase(singleCase) {
  const dispatch = useDispatch();

  const closeCase = () => {
    dispatch(closeCaseFunction(singleCase.id))
  };
  return<>
      {
          singleCase.status === "closed"
          ? <CloseButton onClick={closeCase}>Close</CloseButton>
          : "The case is closed."


      }
      </>;
}
