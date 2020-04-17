import React, { useEffect } from "react";
import { connect } from "react-redux";
import {casesFunction} from "../../store/actions/casesAction";
import Validation from "../Validation";
import {Container, HeaderTitle, DetailsContainer, DetailsHeader, DetailsKey,
Stripe, Match} from './styles'
import CanI from "../Permissions";
import {VALIDATE_CASE, MATCH_ORGANIZATIONS} from "../Permissions/permissions";
import AcceptCase from "../AcceptCase";
import RejectCase from "../RejectCase";


function CaseDetails(props) {
  const dispatch = props.dispatch;
  useEffect(() => {
    dispatch(casesFunction());
  }, [dispatch]);

  const matchingHandler = (id) => {
        props.history.push({
            pathname: `/cases/match/${id}`,
          });
    };

  const caseDetails =
      props.cases ?
      (props.cases.find(file => (file.id === Number(props.match.params.id))))
      : null;


  return (
      <Container>
        {caseDetails ? (
          <>
            <HeaderTitle>Case Details of {caseDetails.title}</HeaderTitle> 
            <Stripe>Patient's details</Stripe>
            <DetailsContainer>
                <DetailsHeader><DetailsKey>name: </DetailsKey>{caseDetails.title}</DetailsHeader>
                <DetailsHeader><DetailsKey>age:</DetailsKey> {caseDetails.age}</DetailsHeader>
                <DetailsHeader><DetailsKey>sex:</DetailsKey> {caseDetails.sex}</DetailsHeader>
                <DetailsHeader><DetailsKey>country:</DetailsKey> {caseDetails.country}</DetailsHeader>
                <DetailsHeader><DetailsKey>consent:</DetailsKey> {caseDetails.consent ?"yes":"no"}</DetailsHeader>
                <DetailsHeader><DetailsKey>category:</DetailsKey> {
              caseDetails ?
                  caseDetails.categories.map(category => {
                    return (
                        <div key={category.id}><b>{category.name}</b></div>
                    )
                  }) : null
              }</DetailsHeader>
            </DetailsContainer>
            <Stripe>Medical details</Stripe>
            <DetailsContainer> 
                <DetailsHeader><DetailsKey>Description</DetailsKey>{caseDetails.description}</DetailsHeader>
                <DetailsHeader><DetailsKey>Diagnosis</DetailsKey>{caseDetails.diagnosis}</DetailsHeader>
                <DetailsHeader><DetailsKey>Justification</DetailsKey> {caseDetails.justification}</DetailsHeader>
                <DetailsHeader><DetailsKey>Recommendation</DetailsKey>{caseDetails.recommendation}</DetailsHeader>
            </DetailsContainer>
            <Stripe>Status</Stripe>
            <DetailsContainer> 
            <DetailsHeader><DetailsKey>Partners:</DetailsKey>  {
              caseDetails ?
                  caseDetails.partnered_organisations.map(partner => {
                    return (
                        <div key={partner.organisation.id}><b>{partner.organisation.name}</b> <i>{partner.status}</i></div>
                    )
                  }) : null
              }</DetailsHeader>
            <DetailsHeader><DetailsKey>status:</DetailsKey>{caseDetails.status}</DetailsHeader>
            <DetailsHeader><DetailsKey>outcome:</DetailsKey>{caseDetails.outcome}</DetailsHeader>
            </DetailsContainer>
            
            <CanI perform={VALIDATE_CASE}>
              <Validation id={caseDetails.id}/>
            </CanI>
{/*
            <CanI perform={MATCH_ORGANIZATIONS}>
*/}
            <Match onClick={() => matchingHandler(caseDetails.id)}>Potential Partner Organisations</Match>
            {/*</CanI>*/}
            <AcceptCase singleCase={caseDetails}/>
            <RejectCase singleCase={caseDetails}/>
          </>
          ): <div>No case to show</div>}
      </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    cases: state.cases,
  };
};

export default connect(mapStateToProps)(CaseDetails);
