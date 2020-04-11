import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {organisationsFunction} from "../../store/actions/organisationsAction";
import {searchOrganisationsFunction} from "../../store/actions/searchOrganisationsAction";
import { GreyRoundInput } from "../../styles/Inputs";
import { RedButton } from "../../styles/Buttons";
import {Table, TableHeader, TableRow} from "../../styles/Tables";


const Container = styled.div`
  width: 100%;
  height: 100%;
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

const OrganisationTable = styled(Table)`
`;

const OrganisationTableHeader = styled(TableHeader)``;

const OrganisationTableRow = styled(TableRow)``;

const AddOrganisationButton = styled(RedButton)`
width: 150px;
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

  const addOrganisationHandler = (e) => {
    e.preventDefault();
    props.history.push('/organisations/add/');
  };

  const headers = [
      'Name',
      'Description',
      'Category',
      'Tag(s)'
  ]

  return (
      <Container>
        <SearchInput name="search" onChange={setSearchHandler} value={search} />
        <SearchButton onClick={searchButtonHandler}>Search</SearchButton>
        <OrganisationTable>
          <OrganisationTableHeader>
            <OrganisationTableRow>
              {headers.map((header) => {
                return (
                    <th height='50px'>{header}</th>
                )
              })}
            </OrganisationTableRow>
          </OrganisationTableHeader>
          <tbody>
        {props.organisations
          ? props.organisations.map(organisation => {
              return (
                <OrganisationTableRow key={organisation.id}>
                  <td>{organisation.name}</td>
                  <td>{organisation.description}</td>
                  <td>{organisation.category}</td>
                  <td>{organisation.tag}</td>
                </OrganisationTableRow>
              );
            })
          : null}
          </tbody>
        </OrganisationTable>
        <AddOrganisationButton onClick={addOrganisationHandler}>Add Organisation</AddOrganisationButton>
      </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
  };
};

export default connect(mapStateToProps)(ListOrganisations);
