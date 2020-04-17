import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { RedButton } from "../../styles/Buttons";
import { casesFunction } from "../../store/actions/casesAction";
import {
  searchTitleFunction,
  searchStatusFunction,
} from "../../store/actions/searchCasesAction";
import CanI from "../Permissions";
import { ADD_CASE } from "../Permissions/permissions";
import { setNavigationAction } from "../../store/actions/Navigation";
import { CASES } from "../Navigation/states";
import { Dropdown } from "../../styles/Dropdowns";
import { categoriesFunction } from "../../store/actions/categoriesAction";
import {
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableHeaderRow,
  TableHeaderWrapper,
  TableRow,
} from "../../styles/Tables";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ebebeb;
  padding: 50px;
  padding-top: 30px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 50px;
`;

const SearchContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Card = styled.div`
  flex-grow: 1;
  margin: 0 25px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  border: none;
  background-color: #ebebeb;
  border-bottom: 1px solid red;
`;

const Filter = styled(Dropdown)`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid red;
`;

const SearchButton = styled(RedButton)`
  width: 150px;
  height: 40px;
  margin-top: 10px;
`;

const AddCaseButton = styled(RedButton)`
  width: 125px;
  height: 40px;
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Clear = styled.div`
  font-size: 14px;
  :hover {
    color: red;
  }
`;

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

  const addCaseHandler = (e) => {
    e.preventDefault();
    props.history.push("/cases/add/");
  };

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
                            return (
                              <div key={category.id}>
                                <b>{category.name}</b>
                              </div>
                            );
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
