import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ListOrganisationsTable from "./listOrganisationsTable";
import { organisationsFunction } from "../../store/actions/organisationsAction";
import { searchOrganisationsFunction } from "../../store/actions/searchOrganisationsAction";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";

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

const AddOrganisationButton = styled(RedButton)`
  width: 175px;
  height: 40px;
  margin-top: 20px;
`;

function ListOrganisations(props) {
  const [search, setSearch] = useState("");
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(organisationsFunction());
  }, [dispatch]);

  const searchButtonHandler = (e) => {
    e.preventDefault();
    const query = {
      name: search,
    };
    props.dispatch(searchOrganisationsFunction(query));
  };

  const setSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  const addOrganisationHandler = (e) => {
    e.preventDefault();
    props.history.push("/organisations/add/");
  };

  return (
    <Container>
      <SearchWrapper>
        <SearchInput name="search" onChange={setSearchHandler} value={search} />
        <SearchButton onClick={searchButtonHandler}>Search</SearchButton>
      </SearchWrapper>
      <ListOrganisationsTable />
      <AddOrganisationButton onClick={addOrganisationHandler}>
        Add Organisation
      </AddOrganisationButton>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
  };
};

export default connect(mapStateToProps)(ListOrganisations);
