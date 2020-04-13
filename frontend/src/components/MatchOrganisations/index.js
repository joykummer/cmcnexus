import React, { useEffect, useState } from "react";
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

function MatchOrganisations() {
    return (
    <Container>
      <ListPotentialMatches />
    </Container>
  );
}


export default MatchOrganisations;