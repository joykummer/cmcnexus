import React, { useEffect } from "react";
import { connect } from "react-redux";
import { casesFunction } from "../../store/actions/Cases/casesAction";
import Validation from "../Validation";
import {
  DetailsHeader,
  DetailsKey,
  Stripe,
  Match,
  CategoryWrapper,
} from "./styles";
import CanI from "../Permissions";
import { setNavigationAction } from "../../store/actions/Navigation";
import { CASES } from "../Navigation/states";
import {
  VALIDATE_CASE,
  MATCH_ORGANISATIONS,
  UPDATE_MATCH,
} from "../Permissions/permissions";
import AcceptCase from "../AcceptCase";
import RejectCase from "../RejectCase";
import styled from "styled-components";
import { Container, DetailsContainer, HeaderTitle } from "../../styles/BaseContainer";

const ButtonContainer = styled.div`
width: 225px;
display: flex;
justify-content: space-between; 
`;

function CaseDetails(props) {
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(casesFunction());
    dispatch(setNavigationAction(CASES));
  }, [dispatch]);

  const matchingHandler = (id) => {
    props.history.push({
      pathname: `/cases/match/${id}`,
    });
  };

  const caseDetails = props.cases
    ? props.cases.find((file) => file.id === Number(props.match.params.id))
    : null;

  return (
    <Container>
      {caseDetails ? (
        <>
          <HeaderTitle>Case Details of {caseDetails.title}</HeaderTitle>
          <Stripe>Patient's details</Stripe>
          <DetailsContainer>
            <DetailsHeader>
              <DetailsKey>Title</DetailsKey>
              {caseDetails.title}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Age</DetailsKey>
              {caseDetails.age}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Sex</DetailsKey>
              {caseDetails.sex}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Country</DetailsKey>
              {caseDetails.country}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Consent</DetailsKey>
              {caseDetails.consent ? "Yes" : "No"}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Category</DetailsKey>
              <CategoryWrapper>
                {caseDetails
                  ? caseDetails.categories.map((category) => {
                      return <div key={category.id}>{category.name}</div>;
                    })
                  : null}
              </CategoryWrapper>
            </DetailsHeader>
          </DetailsContainer>
          <Stripe>Medical details</Stripe>
          <DetailsContainer>
            <DetailsHeader>
              <DetailsKey>Description</DetailsKey>
              {caseDetails.description}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Diagnosis</DetailsKey>
              {caseDetails.diagnosis}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Justification</DetailsKey> {caseDetails.justification}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Recommendation</DetailsKey>
              {caseDetails.recommendation}
            </DetailsHeader>
          </DetailsContainer>
          <Stripe>Status</Stripe>
          <DetailsContainer>
            <DetailsHeader>
              <DetailsKey>Partners</DetailsKey>
              {caseDetails
                ? caseDetails.partnered_organisations.map((partner) => {
                    return (
                      <div key={partner.organisation.id}>
                        <b>{partner.organisation.name}</b>{" "}
                        <i>{partner.status}</i>
                      </div>
                    );
                  })
                : null}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Status</DetailsKey>
              {caseDetails.status}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Outcome</DetailsKey>
              {caseDetails.outcome}
            </DetailsHeader>
          </DetailsContainer>

          <CanI perform={VALIDATE_CASE}>
            <Validation id={caseDetails.id} />
          </CanI>
          {caseDetails.status === "open" ? (
            <>
              <CanI perform={MATCH_ORGANISATIONS}>
                <Match onClick={() => matchingHandler(caseDetails.id)}>
                  MATCH ORGANISATIONS
                </Match>
              </CanI>
              <CanI perform={UPDATE_MATCH}>
                <ButtonContainer>
                <AcceptCase singleCase={caseDetails} />
                <RejectCase singleCase={caseDetails} />
                </ButtonContainer>
              </CanI>
            </>
          ) : null}
        </>
      ) : (
        <div>No case to show</div>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    cases: state.cases,
  };
};

export default connect(mapStateToProps)(CaseDetails);
