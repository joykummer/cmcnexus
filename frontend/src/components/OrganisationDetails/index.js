import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { organisationsFunction } from "../../store/actions/organisationsAction";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
          <div>name: {organisationDetails.name}</div>
          <div>description: {organisationDetails.description}</div>
          <div>services: {organisationDetails.services}</div>
          <div>category: {organisationDetails.categories.map(category => {
            return (
                <div key={category.id}><b>{category.name}</b></div>
                    )
          })}
          </div>
          <div>tag: {organisationDetails.tag}</div>
          <div>members: {organisationDetails.members}</div>
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
