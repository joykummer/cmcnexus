import React, { useEffect } from "react";
import { connect } from "react-redux";
import {casesFunction} from "../../store/actions/casesAction";
import {
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
} from "../../styles/Tables";

function ListCasesTable(props) {
  useEffect(() => {
    props.dispatch(casesFunction());
  }, []);


  const caseDetailsHandler = (id) => {
        props.history.push({
            pathname: `/cases/details/${id}/`,
          });
    };

  const headers = ["Title", "Age", "Country", "Status"];

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
        {props.cases
          ? props.cases.map((file) => {
              return (
                <TableRow key={file.id} onClick={() => caseDetailsHandler(file.id)}>
                  <TableData>{file.title}</TableData>
                  <TableData>{file.age}</TableData>
                  <TableData>{file.country}</TableData>
                  <TableData>{file.status}</TableData>
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
    cases: state.cases,
  };
};

export default connect(mapStateToProps)(ListCasesTable);
