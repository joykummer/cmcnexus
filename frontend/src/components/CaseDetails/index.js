import React, { useEffect } from "react";
import { connect } from "react-redux";
import { casesFunction } from "../../store/actions/Cases/casesAction";
import Validation from "../Validation";
import {
  Container,
  HeaderTitle,
  DetailsContainer,
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
              <DetailsKey>patient id:</DetailsKey>
              {caseDetails.patient_id}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>language:</DetailsKey>
              {caseDetails.language}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>nature of referral:</DetailsKey>
              {caseDetails.nature_of_referral}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Age</DetailsKey>
              {caseDetails.age}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>date of birth:</DetailsKey>
              {caseDetails.birth_date}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Sex</DetailsKey>
              {caseDetails.sex}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>location:</DetailsKey>
              {caseDetails.location}
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
              <DetailsKey>Presenting Complaint</DetailsKey>
              {caseDetails.description}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>History of Presenting complaint</DetailsKey>
              {caseDetails.history_description}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Past medical history</DetailsKey>
              {caseDetails.past_medical_history}
            </DetailsHeader>

            <DetailsHeader>
              <DetailsKey>Diagnosis</DetailsKey>
              {caseDetails.diagnosis}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Physical examination</DetailsKey>
              {caseDetails.physical_examination}
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
                  Potential Partner Organisations
                </Match>
              </CanI>
              <CanI perform={UPDATE_MATCH}>
                <AcceptCase singleCase={caseDetails} />
                <RejectCase singleCase={caseDetails} />
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
