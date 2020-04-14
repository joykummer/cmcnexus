import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {organisationsFunction} from "../../store/actions/organisationsAction";
import {searchOrganisationsFunction} from "../../store/actions/searchOrganisationsAction";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";
import {casesFunction} from "../../store/actions/casesAction";
import {searchCasesFunction} from "../../store/actions/searchCasesAction";
import ListCasesTable from "./listCasesTable";


const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchWrapper = styled.div`
  width: 60%;
  display: flex;
  padding-bottom: 20px;
`;

const SearchInput = styled(GreyRoundInput)`
  width: 80%;
  height: 40px;
`;

const SearchButton = styled(RedButton)`
  width: 20%;
  height: 40px;
`;

const AddCaseButton = styled(RedButton)`
  width: 125px;
  height: 40px;
  margin-top: 20px;
`;

function ListCases(props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.dispatch(casesFunction());
  }, []);

  const searchButtonHandler = (e) => {
    e.preventDefault();
    const query = {
      title: search,
    };
    props.dispatch(searchCasesFunction(query));
  };

  const setSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const addCaseHandler = (e) => {
    e.preventDefault();
    props.history.push("/cases/add/");
  };

  return (
      <Container>
        <SearchWrapper>
          <SearchInput name="search" onChange={setSearchHandler} value={search} />
          <SearchButton onClick={searchButtonHandler}>Search</SearchButton>
        </SearchWrapper>
          <ListCasesTable/>
        <AddCaseButton onClick={addCaseHandler}>Add Case</AddCaseButton>
      </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    cases: state.cases,
  };
};

export default connect(mapStateToProps)(ListCases);
