import React from "react";
import {connect, useSelector} from "react-redux";
import { rejectCaseByOrgFunction, unrejectCaseByOrgFunction } from "../../store/actions/Organisations/rejectByOrgAction";
import { AcceptRejectButton } from "../Validation";


const isRejected = (singleCase, user) => {
    return singleCase.partnered_organisations.filter(org => org.status === "rejected")
        .some((org) => org.organisation.id === user.organisation)
};

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
