import React, { useEffect } from "react";
import { connect } from "react-redux";
import { casesFunction } from "../../store/actions/Cases/casesAction";
import Validation from "../Validation";
import {AddButton, RedButton} from "../../styles/Buttons";
import {
  Vertical,
  Status,
  Horizontal,
} from "./styles";
import CanI from "../Permissions";
import { setNavigationAction } from "../../store/actions/Navigation";
import { CASES } from "../Navigation/states";
import {
  VALIDATE_CASE,
  MATCH_ORGANISATIONS,
  UPDATE_MATCH, CLOSE_CASE,
} from "../Permissions/permissions";
import AcceptCase from "../AcceptCase";
import RejectCase from "../RejectCase";
import CloseCase from "../CloseCase";
import styled from "styled-components";
import { Container, DetailsContainer, HeaderTitle } from "../../styles/BaseContainer";
import { Stripe, DetailsHeader, DetailsKey } from "../../styles/Details";

const ButtonContainer = styled.div`
width: 225px;
display: flex;
justify-content: space-between; 
`;

const Match = styled(RedButton)`
  width: 225px;
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

  const redirectHandler = () => {
        props.history.push(`/cases/edit/${caseDetails.id}/`)
    }

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
              <DetailsKey>Patient ID</DetailsKey>
              {caseDetails.patient_id}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Language</DetailsKey>
              {caseDetails.language}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Nature of Referral</DetailsKey>
              {caseDetails.nature_of_referral}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Age</DetailsKey>
              {caseDetails.age}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Date of Birth</DetailsKey>
              {caseDetails.birth_date}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Sex</DetailsKey>
              {caseDetails.sex}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Location</DetailsKey>
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
                {caseDetails
                  ? caseDetails.categories.map((category) => category.name).join(', ')
                  : null}
            </DetailsHeader>
          </DetailsContainer>
          <Stripe>Medical details</Stripe>
          <DetailsContainer>
            <DetailsHeader>
              <DetailsKey>Presenting Complaint</DetailsKey>
              {caseDetails.description}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>History of Presenting Complaint</DetailsKey>
              {caseDetails.history_description}
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Past Medical History</DetailsKey>
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
              <DetailsKey>Partners' Status</DetailsKey>
              <Vertical>
              {caseDetails.match_stats ?
                caseDetails.match_stats.map(stat => {
                  return (
                    <Horizontal key={stat.status}>
                      <Status>{stat.status}</Status>
                      <b>{stat.count}</b>
                    </Horizontal>
                    );
                  })
                : null}
              </Vertical>
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
          <CanI perform={CLOSE_CASE}>
            <CloseCase id={caseDetails.id} />
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
       <AddButton onClick={redirectHandler}>Edit</AddButton>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    cases: state.cases,
  };
};

export default connect(mapStateToProps)(CaseDetails);
