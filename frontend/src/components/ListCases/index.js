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
  SearchContainer,
  SearchWrapper,
  SearchInput,
  SearchButton,
  Filter,
  Card,
  Wrapper,
  Clear,
} from "../../styles/SearchesFilters/index";
import { Container, HeaderTitle } from "../../styles/BaseContainer";
import CanI from "../Permissions";
import {ADD_CASE} from "../Permissions/permissions";
import styled from "styled-components";
import ListTable from '../Tables';

const HeaderTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const AddCase = styled.div`
  font-size: 18px;
  color: red;
  text-align: right;
  vertical-align: middle;
  :hover {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
`;

function ListCases(props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = props.dispatch;

  const statusOptions = ["Requested", "Open", "Closed", "Rejected"];

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

  const addCaseHandler = (e) => {
    e.preventDefault();
    props.history.push("/cases/add/");
  };

  const headers = ["Title", "Country", "Category", "Status"];

  return (
    <Container>
      <HeaderTitleWrapper>
      <HeaderTitle>CASES</HeaderTitle>
       <CanI perform={ADD_CASE}>
        <AddCase onClick={addCaseHandler}>
          + ADD CASE
        </AddCase>
      </CanI>
      </HeaderTitleWrapper>

      <ListTable/>
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
