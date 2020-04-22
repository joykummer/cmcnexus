import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {OtherTwoOptionsButton} from "../../styles/Buttons";
import {closeCaseFunction} from "../../store/actions/Cases/closeCase";
import {reopenCaseFunction} from "../../store/actions/Cases/reopenCase";
import Popup from "../CaseClose";
import {Container} from "../../styles/BaseContainer";
import {getClosingReasons} from "../../store/actions/ClosingReasons/getClosingReasonsAction";


export default function CloseCase(singleCase) {
  const dispatch = useDispatch();
  const [showClosePopup, setShowClosePopup] = useState(false);

  useEffect(() => {
    dispatch(getClosingReasons());
  }, [])
  const closeCase = closingReasonId => {
    dispatch(closeCaseFunction(singleCase.id.id, closingReasonId))
  };
  const reopenCase = () => {
    dispatch(reopenCaseFunction(singleCase.id.id))
  };
  return <>
    {showClosePopup ? <Popup
        closeFunction={() => setShowClosePopup(false)}
        closeCase={closeCase}/> : null}
    {
      singleCase.id.status === "closed"
        ? (
          <OtherTwoOptionsButton onClick={reopenCase}>
            Reopen
          </OtherTwoOptionsButton>
        )
        : (
          <OtherTwoOptionsButton onClick={() => setShowClosePopup(true)} clicked={true}>
            Close
          </OtherTwoOptionsButton>
        )
    }
  </>;
}
