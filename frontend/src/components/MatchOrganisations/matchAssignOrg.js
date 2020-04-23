import React, { useEffect } from "react";
import { connect } from "react-redux";
import { TwoOptionsButton, RedButton } from "../../styles/Buttons";
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
} from "../../styles/Tables";
import styled from "styled-components";
import {setNavigationAction} from '../../store/actions/Navigation';
import {ORGANISATIONS} from '../Navigation/states';
import {casesFunction} from "../../store/actions/Cases/casesAction";

  const CustomTableRow = styled.tr`
  width: 100%;
  text-transform: capitalize;
  :nth-child(odd) {
    background: #ebebeb;
  }
  `;

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

  const Red = styled.p`
    color: red;
  `;
  const Green = styled.p`
    color: red;
  `;

  const isStatus = (singleCase, organisation, status) => {
    const partnership = organisation.partnered_cases.find(el => el.case === singleCase.id)
    return partnership ? partnership.status === status : false
  };

function MatchActionable({singleCase, organisation, dispatch}) {
  const match = () => {
    dispatch(matchOrganisationsFunction(singleCase.id, organisation.id));
  };
  const unmatch = () => {
    dispatch(unmatchOrganisationsFunction(singleCase.id, organisation.id));
  };
  const getButton = () => {
    if (isStatus(singleCase, organisation, "matched")) {
      return <TwoOptionsButton onClick={unmatch} clicked={true}>Unmatch</TwoOptionsButton>
    } else if (isStatus(singleCase, organisation, "accepted")) {
      return <TwoOptionsButton onClick={unmatch} clicked={true}>Unmatch</TwoOptionsButton>
    } else if (isStatus(singleCase, organisation, "assigned")) {
      return <Green>Case assigned.</Green>
    } else {
      return <TwoOptionsButton onClick={match}>Match</TwoOptionsButton>
    }
  }

  return <>{
    getButton()
  }</>;
}

function AssignActionable({singleCase, organisation, dispatch}) {
  const assign = () => {
    dispatch(assignOrganisationsFunction(singleCase.id, organisation.id));
  };
  const unassign = () => {
    dispatch(unassignOrganisationsFunction(singleCase.id, organisation.id));
  };
  const getButton = () => {
    if (isStatus(singleCase, organisation, "accepted")) {
      return <TwoOptionsButton onClick={assign}>Assign</TwoOptionsButton>
    } else if (isStatus(singleCase, organisation, "assigned")) {
      return <TwoOptionsButton onClick={unassign} clicked={true}>Unassign</TwoOptionsButton>
    } else if (isStatus(singleCase, organisation, "matched")) {
      return <Red>Case not accepted.</Red>
    } else {
      return <Red>Case not matched.</Red>
    }
  }

  return <>{
    getButton()
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

  const organisationsMatchingByCategory = filteredOrganisations();
  const headers = ["Name", "Category"];

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
                  <CustomTableRow key={organisation.id}>
                    <TableData>{organisation.name}</TableData>
                    <TableData>{organisation.categories.map((cat) => cat.name).join(', ')}</TableData>
                    <TableData>
                      <MatchActionable dispatch={props.dispatch} organisation={organisation} singleCase={singleCase}/>
                    </TableData>
                    <TableData>
                      <AssignActionable dispatch={props.dispatch} organisation={organisation} singleCase={singleCase}/>
                    </TableData>
                  </CustomTableRow>
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
