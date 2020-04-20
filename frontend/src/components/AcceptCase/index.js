import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptCaseByOrgFunction, unacceptCaseByOrgFunction } from "../../store/actions/Cases/acceptCaseAction";
import { AcceptRejectButton } from "../../styles/Buttons";
import styled from "styled-components";


  const AcceptRejectButton = styled(RedButton)`
    width: 150px;
    height: 40px;
    margin: 25px 50px;
    border: none;
    background-color: ${(props) => props.clicked ? "#e60000" : "#009933"};
    transition: all 0.7s ease;
    :hover {
        cursor: pointer;
        opacity: 0.8;
    }
  `;

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
          ? <AcceptRejectButton onClick={unacceptCaseByOrg}>Undo</AcceptRejectButton>
          : <AcceptRejectButton onClick={acceptCaseByOrg} clicked={true} >Accept</AcceptRejectButton>
      }
    </>
)}
