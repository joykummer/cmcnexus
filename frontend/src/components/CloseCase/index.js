import React from "react";
import { useDispatch } from "react-redux";
import {OtherTwoOptionsButton} from "../../styles/Buttons";
import {closeCaseFunction} from "../../store/actions/Cases/closeCase";
import {reopenCaseFunction} from "../../store/actions/Cases/reopenCase";


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
          ? <OtherTwoOptionsButton onClick={reopenCase}>Reopen</OtherTwoOptionsButton>
          : <OtherTwoOptionsButton onClick={closeCase} clicked={true}>Close</OtherTwoOptionsButton>
      }
      </>;
}
