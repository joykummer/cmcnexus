import React from "react";
import MatchAssignOrg from "./matchAssignOrg";
import { Container, HeaderTitle } from "../../styles/BaseContainer";

function MatchOrganisations(props) {
    return (
    <Container>
        <HeaderTitle>FIND ORGANISATIONS</HeaderTitle>
      <MatchAssignOrg caseId={parseInt(props.match.params.id)}/>
    </Container>
  );
}


export default MatchOrganisations;