import React from "react";
import {connect, useSelector} from "react-redux";
import { RedButton } from "../../styles/Buttons";
import { acceptCaseByOrgFunction, unacceptCaseByOrgFunction } from "../../store/actions/Cases/acceptCaseAction";
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

const isAccepted = (singleCase, user) => {
    return singleCase.partnered_organisations ? singleCase.partnered_organisations
        .filter(org => org.status === "accepted")
        .some((org) => org.organisation.id === user.organisation) : false;
}

function AcceptCase(props) {

  const user = useSelector(state => state.auth.user);

  const acceptCaseByOrg = () => {
    props.dispatch(acceptCaseByOrgFunction(props.singleCase.id, user.organisation))
  };
  const unacceptCaseByOrg = () => {
    props.dispatch(unacceptCaseByOrgFunction(props.singleCase.id, user.organisation));
  };
  return<>
      {
      isAccepted(props.singleCase, user)
          ? <AcceptRejectButton onClick={unacceptCaseByOrg}>Undo</AcceptRejectButton>
          : <AcceptRejectButton onClick={acceptCaseByOrg} clicked={true} >Accept</AcceptRejectButton>
      }
      </>;
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
    cases: state.cases,
  };
};

export default connect(mapStateToProps)(AcceptCase);
