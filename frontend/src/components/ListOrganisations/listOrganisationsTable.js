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
  const dispatch = props.dispatch;
  const history = useHistory();

  useEffect(() => {
    dispatch(organisationsFunction());
  }, [dispatch]);

  const organisationDetailsHandler = (id) => {
    history.push({
      pathname: `/organisations/details/${id}/`,
    });
  };

  const headers = ["Name", "Category", "Tag(s)"];

  return (
    <Table>
      <TableHeaderWrapper>
        <TableHeaderRow>
          {headers.map((header, id) => {
            return <TableHeader key={id}>{header}</TableHeader>;
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
                  <TableData>
                    {organisation.categories ? organisation.categories.map(category => {
                      return (
                        <div key={category.id}><b>{category.name}</b></div>
                      )
                    }):[]}
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
