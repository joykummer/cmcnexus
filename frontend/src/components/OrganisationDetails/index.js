import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { organisationsFunction } from "../../store/actions/organisationsAction";

import {HeaderTitle, Stripe, DetailsContainer} from "../CaseDetails/styles";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const StripeSmall = styled(Stripe)`
width: 20%; 
font-size: 16px; 
`;

const DetailsContainerCategory = styled(DetailsContainer)`
background-color: white; 
box-shadow: none; 
padding: 0; 
`;

const DetailsContainerSmall = styled.div`
width: auto;
display: flex; 
align-self: flex-start;
/* margin-left: 10%; */
padding: 20px; 
/* margin: 2%;  */
background-color: #ebebeb;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

function OrganisationDetails(props) {
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(organisationsFunction());
  }, [dispatch]);

  const organisationDetails = props.organisations
    ? props.organisations.find(
        (organisation) => organisation.id === Number(props.match.params.id)
      )
    : null;

  return (
    <Container>
      {organisationDetails ? (
        <>
          <HeaderTitle>{organisationDetails.name}</HeaderTitle>
          <StripeSmall>description</StripeSmall>
          <DetailsContainer>{organisationDetails.description}</DetailsContainer>
          <StripeSmall>service</StripeSmall>
          <DetailsContainer>{organisationDetails.services}</DetailsContainer>
          <StripeSmall>category</StripeSmall>
          <DetailsContainerCategory>
            <DetailsContainerSmall>{organisationDetails.category.name}</DetailsContainerSmall>
          </DetailsContainerCategory>
          <StripeSmall>tag</StripeSmall>
          <DetailsContainerCategory>
            <DetailsContainerSmall>{organisationDetails.tag}</DetailsContainerSmall>
          </DetailsContainerCategory>
          <StripeSmall>members</StripeSmall>
          <DetailsContainerCategory>
            <DetailsContainerSmall>{organisationDetails.members}</DetailsContainerSmall>
          </DetailsContainerCategory>
        </>
      ) : (
        <div>This organisation does not exist.</div>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
  };
};

export default connect(mapStateToProps)(OrganisationDetails);
