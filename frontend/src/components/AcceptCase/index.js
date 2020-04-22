import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptCaseByOrgFunction, unacceptCaseByOrgFunction } from "../../store/actions/Organisations/acceptCaseAction";
import { OtherTwoOptionsButton } from "../../styles/Buttons";


export default function AcceptCase({singleCase}) {
  const dispatch = useDispatch();
  const organisation = useSelector(state => state.auth.user ? state.auth.user.organisation : null);
  const organisation_id = organisation ? organisation.id : null;
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
        status === "accepted"
          ? <OtherTwoOptionsButton onClick={unacceptCaseByOrg}>Undo</OtherTwoOptionsButton>
          : <OtherTwoOptionsButton onClick={acceptCaseByOrg} clicked={true} >Accept</OtherTwoOptionsButton>
      }
    </>
)}
