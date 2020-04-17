import React from "react";
import {connect, useSelector} from "react-redux";
import { RedButton } from "../../styles/Buttons";
import { rejectCaseByOrgFunction, unrejectCaseByOrgFunction } from "../../store/actions/rejectByOrgAction";
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

const isRejected = (singleCase, user) => {
    return singleCase.partnered_organisations.filter(org => org.status === "rejected")
        .some((org) => org.organisation.id === user.organisation)
}

function RejectCase(props) {

  const user = useSelector(state => state.auth.user);

  const rejectCaseByOrg = () => {
    props.dispatch(rejectCaseByOrgFunction(props.singleCase.id, user.organisation))
  };
  const unrejectCaseByOrg = () => {
    props.dispatch(unrejectCaseByOrgFunction(props.singleCase.id, user.organisation));
  };
  return<>
      {
      isRejected(props.singleCase, user)
          ? <AcceptRejectButton onClick={unrejectCaseByOrg}>Undo</AcceptRejectButton>
          : <AcceptRejectButton onClick={rejectCaseByOrg} clicked={true} >Reject</AcceptRejectButton>
      }
      </>;
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
    cases: state.cases,
  };
};

export default connect(mapStateToProps)(RejectCase);
