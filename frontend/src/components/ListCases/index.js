import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";
import { searchCases } from "../../store/actions/searchAction";
import { casesFunction } from "../../store/actions/casesAction";

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

function ListCases(props) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    props.dispatch(casesFunction());
  }, []);

  const setSearchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const searchButtonHandler = (e) => {
    e.preventDefault();
    const data = {
      first_name: search,
    };
    props.dispatch(searchCases(data));
  };

  console.log("in the cases", props.cases);

  return (
    <>
      <Container>
        <SearchInput name="search" onChange={setSearchHandler} value={search} />
        <SearchButton onClick={searchButtonHandler}>Search</SearchButton>
        {props.cases
          ? props.cases.map(test => {
              return (
                <div key={test.id}>
                  <div>id: {test.id}</div>
                  <div>name: {test.first_name}</div>
                </div>
              );
            })
          : null}
      </Container>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log('in the statetoprops', state.cases);
  return {
    cases: state.cases.cases,
  };
};

export default connect(mapStateToProps)(ListCases);
