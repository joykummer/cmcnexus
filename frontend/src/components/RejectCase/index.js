import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AcceptRejectButton } from "../../styles/Buttons";
import { rejectCaseFunction } from "../../store/actions/Cases/rejectCaseAction";
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
        ? <AcceptRejectButton onClick={unRejectCaseByOrg}>Undo</AcceptRejectButton>
        : <AcceptRejectButton onClick={rejectCaseByOrg} clicked={true} >Reject</AcceptRejectButton>
    }
  </>;
}

