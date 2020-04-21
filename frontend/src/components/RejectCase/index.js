import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OtherTwoOptionsButton } from "../../styles/Buttons";
import {rejectCaseByOrgFunction, unrejectCaseByOrgFunction} from "../../store/actions/Organisations/rejectByOrgAction";


export default function RejectCase({singleCase}) {
  const dispatch = useDispatch();
  const organisation = useSelector(state => state.auth.user ? state.auth.user.organisation : null);
  const organisation_id = organisation ? organisation.id : null;
  const status = organisation && organisation.partnered_cases ?
    organisation.partnered_cases.find(el => el.case === singleCase.id).status
    : null;

  const rejectCaseByOrg = () => {
    dispatch(rejectCaseByOrgFunction(singleCase.id, organisation_id));
  };

  const unRejectCaseByOrg = () => {
    dispatch(unrejectCaseByOrgFunction(singleCase.id, organisation_id));
  };

  return<>
    {
      status === "rejected"
        ? <OtherTwoOptionsButton onClick={unRejectCaseByOrg}>Undo</OtherTwoOptionsButton>
        : <OtherTwoOptionsButton onClick={rejectCaseByOrg} clicked={true} >Reject</OtherTwoOptionsButton>
    }
  </>;
}

