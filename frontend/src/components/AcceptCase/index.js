import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptCaseByOrgFunction, unacceptCaseByOrgFunction } from "../../store/actions/Cases/acceptCaseAction";
import { AcceptRejectButton } from "../../styles/Buttons";

export default function AcceptCase({singleCase}) {
  const dispatch = useDispatch();
  const organisation = useSelector(state => state.auth.user ? state.auth.user.organisation : null);
  const organisation_id = organisation ? organisation.id : null;
  console.log('org', organisation);
  const status = (organisation && organisation.partnered_cases) ?
    organisation.partnered_cases.find(el => el.case === singleCase.id).status
    : null;

  const acceptCaseByOrg = () => {
    dispatch(acceptCaseByOrgFunction(singleCase.id, organisation_id))
  };
  const unacceptCaseByOrg = () => {
    dispatch(unacceptCaseByOrgFunction(singleCase.id, organisation_id));
  };
  return(
    <>
      {
        status && status === "accepted"
          ? <AcceptRejectButton onClick={unacceptCaseByOrg}>Undo</AcceptRejectButton>
          : <AcceptRejectButton onClick={acceptCaseByOrg} clicked={true} >Accept</AcceptRejectButton>
      }
    </>
)}
