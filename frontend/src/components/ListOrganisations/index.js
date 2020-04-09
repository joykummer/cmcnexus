import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {organisationsFunction} from "../../store/actions/organisationsAction";
import {searchOrganisationsFunction} from "../../store/actions/searchOrganisationsAction";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";


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
    props.dispatch(organisationsFunction());
  }, []);

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

  return (
      <Container>
        <SearchInput name="search" onChange={setSearchHandler} value={search} />
        <SearchButton onClick={searchButtonHandler}>Search</SearchButton>
        {props.organisations
          ? props.organisations.map(organisation => {
              return (
                <div key={organisation.id}>
                  <div>id: {organisation.id}</div>
                  <div>name: {organisation.name}</div>
                </div>
              );
            })
          : null}
      </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
  };
};

export default connect(mapStateToProps)(ListOrganisations);
