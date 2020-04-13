import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RedButton } from "../../styles/Buttons";
import { matchOrganisationsFunction } from "../../store/actions/matchOrganisationsAction";
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
  useEffect(() => {
    props.dispatch(matchOrganisationsFunction());
  }, []);

  const headers = ["Name", "Description", "Category", "Tag(s)"];

  return (
    <>
      <div>MATCH ORGANISATIONS</div>
      <Table>
        <TableHeaderWrapper>
          <TableHeaderRow>
            {headers.map((header) => {
              return <TableHeader>{header}</TableHeader>;
            })}
          </TableHeaderRow>
        </TableHeaderWrapper>
        <TableBody>
          {props.matchOrganisations
            ? props.matchOrganisations.map((organisation) => {
                return (
                  <TableRow key={organisation.id}>
                    <TableData>{organisation.name}</TableData>
                    <TableData>{organisation.description}</TableData>
                    <TableData>{organisation.category.name}</TableData>
                    <TableData>{organisation.tag}</TableData>
                    <MatchButton>MATCH</MatchButton>
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
  console.log("THIS IS THE STATE", state)
  return {
    matchOrganisations: state.matchOrganisations,
  };
};

export default connect(mapStateToProps)(ListPotentialMatches);
