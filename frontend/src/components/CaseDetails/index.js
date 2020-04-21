import React, { useEffect } from "react";
import { connect } from "react-redux";
import { casesFunction } from "../../store/actions/Cases/casesAction";
import Validation from "../Validation";
import {EditSaveButton, RedButton} from "../../styles/Buttons";
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
  UPDATE_MATCH,
  CHANGE_CASE,
  CLOSE_CASE,
  DELETE_CASE
} from "../Permissions/permissions";
import AcceptCase from "../AcceptCase";
import RejectCase from "../RejectCase";
import CloseCase from "../CloseCase";
import styled from "styled-components";
import { Container, DetailsContainer, HeaderTitle } from "../../styles/BaseContainer";
import {Stripe, DetailsHeader, DetailsKey, DetailsValue, StatusDetailsValue} from "../../styles/Details";
import DeleteCase from "../DeleteCase";

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
              <DetailsValue>
              {caseDetails.title}
              </DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Patient ID</DetailsKey>
              <DetailsValue>{caseDetails.patient_id}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Language</DetailsKey>
              <DetailsValue>{caseDetails.language}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Nature of Referral</DetailsKey>
              <DetailsValue>{caseDetails.nature_of_referral}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Age</DetailsKey>
              <DetailsValue>{caseDetails.age}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Date of Birth</DetailsKey>
              <DetailsValue>{caseDetails.birth_date}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Sex</DetailsKey>
              <DetailsValue>{caseDetails.sex}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Location</DetailsKey>
              <DetailsValue>{caseDetails.location}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Country</DetailsKey>
              <DetailsValue>{caseDetails.country}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Consent</DetailsKey>
              <DetailsValue>
              {caseDetails.consent ? "Yes" : "No"}
              </DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Category</DetailsKey>
              <DetailsValue>
                {caseDetails
                  ? caseDetails.categories.map((category) => category.name).join(', ')
                  : null}
              </DetailsValue>
            </DetailsHeader>
          </DetailsContainer>
          <Stripe>Medical details</Stripe>
          <DetailsContainer>
            <DetailsHeader>
              <DetailsKey>Presenting Complaint</DetailsKey>
              <DetailsValue>{caseDetails.description}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>History of Presenting Complaint</DetailsKey>
              <DetailsValue>{caseDetails.history_description}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Past Medical History</DetailsKey>
              <DetailsValue>{caseDetails.past_medical_history}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Diagnosis</DetailsKey>
              <DetailsValue>{caseDetails.diagnosis}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Physical examination</DetailsKey>
              <DetailsValue>{caseDetails.physical_examinatino}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Justification</DetailsKey>
              <DetailsValue>{caseDetails.justification}</DetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Recommendation</DetailsKey>
              <DetailsValue>{caseDetails.recommendation}</DetailsValue>
            </DetailsHeader>
          </DetailsContainer>
          <Stripe>Status Details</Stripe>
          <DetailsContainer>
            <DetailsHeader>
              <DetailsKey>Organisations Status</DetailsKey>
              <StatusDetailsValue>
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
              </StatusDetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Status</DetailsKey>
              <StatusDetailsValue>{caseDetails.status}</StatusDetailsValue>
            </DetailsHeader>
            <DetailsHeader>
              <DetailsKey>Outcome</DetailsKey>
              <StatusDetailsValue>{caseDetails.outcome}</StatusDetailsValue>
            </DetailsHeader>
          </DetailsContainer>
          <CanI perform={VALIDATE_CASE}>
            <Validation id={caseDetails.id} />
          </CanI>
          <CanI perform={CLOSE_CASE}>
            <CloseCase id={caseDetails} />
          </CanI>
          <CanI perform={DELETE_CASE}>
            <DeleteCase singleCase={caseDetails} />
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
          <CanI perform={CHANGE_CASE}>
               <EditSaveButton onClick={redirectHandler}>Edit</EditSaveButton>
          </CanI>
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
