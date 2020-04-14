import React from "react";
import styled from "styled-components";
import ListPotentialMatches from "./listPotentialMatches";


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function MatchOrganisations(props) {
    return (
    <Container>
      <ListPotentialMatches caseId={parseInt(props.match.params.id)}/>
    </Container>
  );
}


export default MatchOrganisations;