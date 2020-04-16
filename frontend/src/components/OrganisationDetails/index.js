import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { organisationsFunction } from "../../store/actions/organisationsAction";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const HeaderTitle = styled.div`
display: flex; 
justify-content: center; 
font-size: 30px; 
margin-top: 5%; 
margin-bottom: 3%; 
border-bottom: 3px solid red; 
`;

const Stripe = styled.div`
height: auto;
width: 20%; 
background-color: red; 
display: flex; 
align-self: end;
margin-left: 5%;
font-size: 16px; 
border-radius: 5px; 
margin-top: 2%; 
padding-left: 1%; 
color: white; 
text-transform: uppercase; 
`;

const DetailsContainer = styled.div`
width: 80%;
height: auto; 
display: flex; 
flex-direction: column; 
padding: 20px; 
margin: 2%; 
background-color: #ebebeb;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const DetailsContainerCategory = styled(DetailsContainer)`
background-color: white; 
box-shadow: none; 
padding: 0; 
`

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
          <Stripe>description</Stripe>
          <DetailsContainer>{organisationDetails.description}</DetailsContainer>
          <Stripe>services</Stripe>
          <DetailsContainer>{organisationDetails.services}</DetailsContainer>
          <Stripe>category</Stripe>
          <DetailsContainerCategory>
            <DetailsContainerSmall>{organisationDetails.category.name}</DetailsContainerSmall>
          </DetailsContainerCategory>
          <Stripe>tag</Stripe>
          <DetailsContainerCategory>
            <DetailsContainerSmall>{organisationDetails.tag}</DetailsContainerSmall>
          </DetailsContainerCategory>
          <Stripe>members</Stripe>
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
