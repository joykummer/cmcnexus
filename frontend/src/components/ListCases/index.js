import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { casesFunction } from "../../store/actions/Cases/casesAction";
import {
  searchTitleFunction,
  searchStatusFunction,
} from "../../store/actions/Cases/searchCasesAction";
import { setNavigationAction } from "../../store/actions/Navigation";
import { CASES } from "../Navigation/states";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction";
import {
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
} from "../../styles/Tables";
import {
  Container,
  SearchContainer,
  SearchWrapper,
  SearchInput,
  SearchButton,
  Filter,
  Card,
  Wrapper,
  Clear,
} from "./styles";

function ListCases(props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = props.dispatch;

  const statusOptions = ["Created", "Open", "Closed", "Rejected"];

  useEffect(() => {
    dispatch(setNavigationAction(CASES));
    dispatch(casesFunction());
    dispatch(categoriesFunction());
  }, [dispatch]);

  const clearSearchHandler = () => {
    // setTitle("");
    // setCategory("");
    // setStatus("");
    window.location.reload();
  };

  // FOR REFERENCE. PLEASE DO NOT DELETE!
  // function filterViaCategory(category) {
  //   return props.cases.filter(obj => obj.categories.some(cat => cat.name === category));
  // }
  //
  // console.log(filterViaCategory(category));

  const searchButtonHandler = (e) => {
    e.preventDefault();
    if (title) {
      const query = {
        title: title,
      };
      props.dispatch(searchTitleFunction(query));
    }
    if (status) {
      const query = {
        status: status,
      };
      props.dispatch(searchStatusFunction(query));
    }
  };

  const caseDetailsHandler = (id) => {
    props.history.push({
      pathname: `/cases/details/${id}/`,
    });
  };

  const headers = ["Title", "Country", "Category", "Status"];

  return (
    <Container>
      <SearchContainer>
        <SearchWrapper>
          <Card>
            Title
            <SearchInput
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Card>
          <Card>
            Category
            <Filter
              defaultValue="default"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={"default"} disabled>
                Choose here
              </option>
              {props.categories
                ? props.categories.map((category) => {
                    return (
                      <option key={category.id} id={category.id}>
                        {category.name}
                      </option>
                    );
                  })
                : null}
            </Filter>
          </Card>
          <Card>
            Status
            <Filter
              defaultValue={"default"}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="default" disabled>
                Choose here
              </option>
              {statusOptions.map((status) => {
                return <option key={status}>{status}</option>;
              })}
            </Filter>
          </Card>
        </SearchWrapper>
        <Wrapper>
          <SearchButton onClick={searchButtonHandler}>
            APPLY FILTERS
          </SearchButton>
          <Clear onClick={clearSearchHandler}>clear</Clear>
        </Wrapper>
      </SearchContainer>
      <Table>
        <TableHeaderWrapper>
          <TableHeaderRow>
            {headers.map((header, id) => {
              return <TableHeader key={id}>{header}</TableHeader>;
            })}
          </TableHeaderRow>
        </TableHeaderWrapper>
        <TableBody>
          {props.cases
            ? props.cases
                .filter(
                  (file) =>
                    !category ||
                    file.categories.some((cat) => cat.name === category)
                )
                .map((file) => (
                  <TableRow
                    key={file.id}
                    onClick={() => caseDetailsHandler(file.id)}
                  >
                    <TableData>{file.title}</TableData>
                    <TableData>{file.country}</TableData>
                    <TableData>
                      {file.categories
                        ? file.categories.map((category) => {
                            return <div key={category.id}>{category.name}</div>;
                          })
                        : []}
                    </TableData>
                    <TableData>{file.status}</TableData>
                  </TableRow>
                ))
            : null}
        </TableBody>
      </Table>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    cases: state.cases,
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(ListCases);
