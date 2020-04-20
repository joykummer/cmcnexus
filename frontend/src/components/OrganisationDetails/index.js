import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import { organisationsFunction } from "../../store/actions/Organisations/organisationsAction";
import {
  Stripe,
  DetailsKey,
  DetailsHeader
} from "../CaseDetails/styles";
import { setNavigationAction } from '../../store/actions/Navigation';
import { ORGANISATIONS } from '../Navigation/states';
import { AddButton } from "../../styles/Buttons";
import { Container, DetailsContainer, HeaderTitle } from "../../styles/BaseContainer";


function OrganisationDetails(props) {
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(organisationsFunction());
    dispatch(setNavigationAction(ORGANISATIONS));
  }, [dispatch]);

  const organisationDetails = props.organisations
    ? props.organisations.find(
        (organisation) => organisation.id === Number(props.match.params.id)
      )
    : null;

    const history = useHistory();
    const redirectHandler = () => {
        history.push(`/organisations/edit/${organisationDetails.id}/`)
    };


  return (
    <Container>
      {organisationDetails ? (
        <>
          <HeaderTitle>Organisation Details of {organisationDetails.name}</HeaderTitle>
          <Stripe>General</Stripe>
          <DetailsContainer>
            <DetailsHeader>
              <DetailsKey>Name</DetailsKey>
              {organisationDetails.name}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Description</DetailsKey>
              {organisationDetails.description}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Services</DetailsKey>
              {organisationDetails.services}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Category</DetailsKey>
              {organisationDetails
                  ? organisationDetails.categories.map((category) => category.name).join(', ')
                  : null}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Tag</DetailsKey>
              {organisationDetails.tag}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Members</DetailsKey>
              {organisationDetails.members}
            </DetailsHeader>
          </DetailsContainer>
        </>
      ) : (
        <div>This organisation does not exist.</div>
      )}
      <AddButton onClick={redirectHandler}>Edit</AddButton>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
  };
};

export default connect(mapStateToProps)(OrganisationDetails);
