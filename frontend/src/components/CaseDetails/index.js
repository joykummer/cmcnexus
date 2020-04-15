import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {casesFunction} from "../../store/actions/casesAction";
import Validation from "../Validation";
import { RedButton } from "../../styles/Buttons";
import CanI from "../Permissions";
import {VALIDATE_CASE, MATCH_ORGANIZATIONS} from "../Permissions/permissions";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Match = styled(RedButton)`
  width: 175px;
  height: 70px;
  margin-top: 20px;
`;


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
            <div>title: {caseDetails.title}}</div>
            <div>description: {caseDetails.description}</div>
            <div>diagnosis: {caseDetails.diagnosis}</div>
            <div>justification: {caseDetails.justification}</div>
            <div>recommendation: {caseDetails.recommendation}</div>
            <div>consent: {caseDetails.consent}</div>
            <div>age: {caseDetails.age}</div>
            <div>sex: {caseDetails.sex}</div>
            <div>country: {caseDetails.country}</div>
            <div>category: {
              caseDetails ?
                  caseDetails.category.map(category => {
                    return (
                        <div key={category.id}><b>{category.name}</b></div>
                    )
                  }) : null
              }</div>
            <div>outcome: {caseDetails.outcome}</div>
            <div>matched partners: {
              caseDetails ?
                  caseDetails.matched_partners.map(partner => {
                    return (
                        <div key={partner.id}><b>{partner.name}</b></div>
                    )
                  }) : null
              }</div>
            <div>assigned partners: {
              caseDetails ?
                  caseDetails.assigned_partners.map(partner => {
                    return (
                        <div key={partner.id}><b>{partner.name}</b></div>
                    )
                  }) : null
              }</div>
            <div>status: {caseDetails.status}</div>
            <CanI perform={VALIDATE_CASE}>
              <Validation id={caseDetails.id}/>
            </CanI>
            <CanI perform={MATCH_ORGANIZATIONS}>
            <Match onClick={() => matchingHandler(caseDetails.id)}>Potential Partner Organisations</Match>
            </CanI>
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
