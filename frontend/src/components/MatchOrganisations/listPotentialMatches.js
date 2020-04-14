import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RedButton } from "../../styles/Buttons";
import { organisationsFunction } from "../../store/actions/organisationsAction";
import { matchOrganisationsFunction, unmatchOrganisationsFunction } from "../../store/actions/matchOrganisationsAction";
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


  const MatchButton = styled(RedButton)`
    width: 150px;
    height: 40px;
    margin-top: 50px;
    margin-left: 100px;
  `;

function ListPotentialMatches(props) {
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(organisationsFunction());
  }, [dispatch]);

  const getCase = () => {
    return props.cases.find((c) => c.id === props.caseId);
  }

  const filteredOrganisations = () => {
    // TODO(Greta): Change 'case.category' to 'case.category_id' and make it an integer.
    return getCase() ? props.organisations.filter(
      o => o.category ? o.category.id === Number(getCase().category) : false) : []
  }

  const match = (organisationId) => {
    props.dispatch(matchOrganisationsFunction(getCase().id, organisationId));
  };
  const unmatch = (organisationId) => {
    props.dispatch(unmatchOrganisationsFunction(getCase().id, organisationId));
  };
  const headers = ["Name", "Description", "Category", "Tag(s)"];

  return (
    <>
      <div>MATCH ORGANISATIONS</div>
      <Table>
        <TableHeaderWrapper>
          <TableHeaderRow>
            {headers.map((header) => {
              return <TableHeader key={header}>{header}</TableHeader>;
            })}
          </TableHeaderRow>
        </TableHeaderWrapper>
        <TableBody>
          {filteredOrganisations()
            ? filteredOrganisations().map((organisation) => {
                return (
                  <TableRow key={organisation.id}>
                    <TableData>{organisation.name}</TableData>
                    <TableData>{organisation.description}</TableData>
                    <TableData>{organisation.category.name}</TableData>
                    <TableData>{organisation.tag}</TableData>
                    <TableData>
                      { getCase().matched_partners.some((o) => o.id === organisation.id)
                          ? <MatchButton onClick={() => unmatch(organisation.id)}>UNMATCH</MatchButton>
                          : <MatchButton onClick={() => match(organisation.id)}>MATCH</MatchButton>
                      }
                    </TableData>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
    cases: state.cases
  };
};

export default connect(mapStateToProps)(ListPotentialMatches);
