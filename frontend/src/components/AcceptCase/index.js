import React from "react";
import { connect, useSelector } from "react-redux";
import { acceptCaseByOrgFunction, unacceptCaseByOrgFunction } from "../../store/actions/Cases/acceptCaseAction";
import { AcceptRejectButton } from "../Validation";

const isAccepted = (singleCase, user) => {
    return singleCase.partnered_organisations.filter(org => org.status === "accepted")
        .some((org) => org.organisation.id === user.organisation)
}

function AcceptCase(props) {

  const user = useSelector(state => state.auth.user);

  const acceptCaseByOrg = () => {
    props.dispatch(acceptCaseByOrgFunction(props.singleCase.id, user.organisation))
  };
  const unacceptCaseByOrg = () => {
    props.dispatch(unacceptCaseByOrgFunction(props.singleCase.id, user.organisation));
  };
  return(
    <>
      {
      isAccepted(props.singleCase, user)
          ? <AcceptRejectButton onClick={unacceptCaseByOrg}>Undo</AcceptRejectButton>
          : <AcceptRejectButton onClick={acceptCaseByOrg} clicked={true} >Accept</AcceptRejectButton>
      }
    </>
)}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
    cases: state.cases,
  };
};

export default connect(mapStateToProps)(AcceptCase);



