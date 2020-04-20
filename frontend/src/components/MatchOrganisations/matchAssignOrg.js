import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RedButton } from "../../styles/Buttons";
import { organisationsFunction } from "../../store/actions/Organisations/organisationsAction";
import { matchOrganisationsFunction, unmatchOrganisationsFunction } from "../../store/actions/Cases/matchOrganisationsAction";
import { assignOrganisationsFunction, unassignOrganisationsFunction } from "../../store/actions/Organisations/assignOrganisationsAction";
import {
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
} from "../../styles/Tables";
import styled from "styled-components";
import {setNavigationAction} from '../../store/actions/Navigation';
import {ORGANISATIONS} from '../Navigation/states';
import {casesFunction} from "../../store/actions/Cases/casesAction";

  const MatchAssignButton = styled(RedButton)`
    width: 150px;
    border: none;
    background-color: ${(props) => props.clicked ? "#e60000" : "#009933"};
    transition: all 0.7s ease;
    :hover {
        cursor: pointer;
        opacity: 0.8;
    }
  `;

  const NotAccepted = styled.p`
    color: red;
  `;

  const isMatch = (singleCase, organisation) => {
    return organisation.partnered_cases.filter(el => el.case === singleCase.id).status === "matched"
  };

  const isAccepted = (singleCase, organisation) => {
    return organisation.partnered_cases.filter(el => el.case === singleCase.id).status === "accepted"
  };

  const isAssigned = (singleCase, organisation) => {
    return organisation.partnered_cases.filter(el => el.case === singleCase.id).status === "assigned"
  };

function MatchActionable({singleCase, organisation, dispatch}) {
  const match = () => {
    dispatch(matchOrganisationsFunction(singleCase.id, organisation.id));
  };
  const unmatch = () => {
    dispatch(unmatchOrganisationsFunction(singleCase.id, organisation.id));
  };
  return <>{
    isMatch(singleCase, organisation)
      ? <MatchAssignButton onClick={unmatch} clicked={true}>Unmatch</MatchAssignButton>
      : <MatchAssignButton onClick={match}>Match</MatchAssignButton>

  }</>;
}

function AssignActionable({singleCase, organisation, dispatch}) {
  const assign = () => {
    dispatch(assignOrganisationsFunction(singleCase.id, organisation.id));
  };
  const unassign = () => {
    dispatch(unassignOrganisationsFunction(singleCase.id, organisation.id));
  };
  return <>{
    isAccepted(singleCase, organisation)
      ? <MatchAssignButton onClick={assign}>Assign</MatchAssignButton>
      : isAssigned(singleCase, organisation)
        ? <MatchAssignButton onClick={unassign} clicked={true}>Unassign</MatchAssignButton>
        : <NotAccepted>The case has not been accepted.</NotAccepted>
  }</>;
}

function MatchAssignOrg(props) {
  const dispatch = props.dispatch;
  const singleCase = props.cases.find((c) => c.id === props.caseId);

  useEffect(() => {
    dispatch(organisationsFunction());
    dispatch(casesFunction());
    dispatch(setNavigationAction(ORGANISATIONS));
  }, [dispatch]);

  const commonCategories = (organisation, casee) => {
    return organisation.categories.filter(category1 => casee.categories.some(category => category.id === category1.id))
  };
  const filteredOrganisations = () => {
    if (!singleCase) return [];
    return props.organisations.filter(org => commonCategories(org, singleCase).length !== 0)
  };

  const organisationsMatchingByCategory = filteredOrganisations()
  const headers = ["Name", "Description", "Category", "Tag(s)"];

  return (
      <Table>
        <TableHeaderWrapper>
          <TableHeaderRow>
            {headers.map((header) => {
              return <TableHeader key={header}>{header}</TableHeader>;
            })}
          </TableHeaderRow>
        </TableHeaderWrapper>
        <TableBody>
          {organisationsMatchingByCategory
            ? organisationsMatchingByCategory.map((organisation) => {
                return (
                  <TableRow key={organisation.id}>
                    <TableData>{organisation.name}</TableData>
                    <TableData>{organisation.description}</TableData>
                    <TableData>{organisation.categories.map((cat) => cat.name).join(', ')}</TableData>
                    <TableData>{organisation.tag}</TableData>
                    <TableData>
                      <MatchActionable dispatch={props.dispatch} organisation={organisation} singleCase={singleCase}/>
                    </TableData>
                    <TableData>
                      <AssignActionable dispatch={props.dispatch} organisation={organisation} singleCase={singleCase}/>
                    </TableData>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
    cases: state.cases
  };
};

export default connect(mapStateToProps)(MatchAssignOrg);
