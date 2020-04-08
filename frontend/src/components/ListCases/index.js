import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";
import { searchCasesFunction } from "../../store/actions/searchOrganisationAction";
import { casesFunction } from "../../store/actions/organisationAction";

const Container = styled.div`
  width: auto;
  height: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled(GreyRoundInput)`
  width: 250px;
  height: 30px;
`;

const SearchButton = styled(RedButton)`
  width: 75px;
  height: 30px;
`;


function ListOrganisations(props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.dispatch(casesFunction());
  }, []);

  const searchButtonHandler = (e) => {
    e.preventDefault();
    const query = {
      first_name: search,
    };
    props.dispatch(searchCasesFunction(query));
  };

  const setSearchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  console.log("in the cases", props);

  return (
    <>
      <Container>
        <SearchInput name="search" onChange={setSearchHandler} value={search} />
        <SearchButton onClick={searchButtonHandler}>Search</SearchButton>
        {props.cases
          ? props.cases.map(file => {
              return (
                <div key={file.id}>
                  <div>id: {file.id}</div>
                  <div>name: {file.first_name}</div>
                </div>
              );
            })
          : null}
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log('in the statetoprops', state);
  return {
    cases: state.cases.cases,
  };
};

export default connect(mapStateToProps)(ListOrganisations);
