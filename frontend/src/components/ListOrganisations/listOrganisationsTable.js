import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { organisationsFunction } from "../../store/actions/organisationsAction";
import {
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
} from "../../styles/Tables";

function ListOrganisationsTable(props) {

  const history = useHistory();

  useEffect(() => {
    props.dispatch(organisationsFunction());
  }, []);

  const organisationDetailsHandler = (id) => {
    history.push({
      pathname: `/organisations/details/${id}/`,
    });
  };

  const headers = ["Name", "Description", "Category", "Tag(s)"];

  return (
    <Table>
      <TableHeaderWrapper>
        <TableHeaderRow>
          {headers.map((header) => {
            return <TableHeader>{header}</TableHeader>;
          })}
        </TableHeaderRow>
      </TableHeaderWrapper>
      <TableBody>
        {props.organisations
          ? props.organisations.map((organisation) => {
              return (
                <TableRow
                  key={organisation.id}
                  onClick={() => organisationDetailsHandler(organisation.id)}
                >
                  <TableData>{organisation.name}</TableData>
                  <TableData>{organisation.description}</TableData>
                  <TableData>
                    {organisation.category ? organisation.category.name : ""}
                  </TableData>
                  <TableData>{organisation.tag}</TableData>
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
  };
};

export default connect(mapStateToProps)(ListOrganisationsTable);
