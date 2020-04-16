import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ListOrganisationsTable from "./listOrganisationsTable";
import { organisationsFunction } from "../../store/actions/organisationsAction";
import { searchOrganisationsFunction } from "../../store/actions/searchOrganisationsAction";
import { RedButton } from "../../styles/Buttons";
import {setNavigationAction} from '../../store/actions/Navigation';
import {ORGANISATIONS} from '../Navigation/states';
import {Dropdown} from "../../styles/Dropdowns";
import {ADD_ORGANISATION} from "../Permissions/permissions";
import CanI from "../Permissions";
import {categoriesFunction} from "../../store/actions/categoriesAction";

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
  align-items: flex-end;
`;

const SearchContainer = styled.div`
  width: 100%;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div`
  width: 30%;
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

const AddOrganisationButton = styled(RedButton)`
  width: 200px;
  height: 40px;
  margin-bottom: 50px;
`;

function ListOrganisations(props) {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState("");
  const [category, setCategory] = useState(null);
  const dispatch = props.dispatch;

    const serviceOptions = ["test1", "test2", "test3", "test4"];

  useEffect(() => {
    dispatch(setNavigationAction(ORGANISATIONS));
    dispatch(organisationsFunction());
    dispatch(categoriesFunction());
  }, [dispatch]);

  const searchButtonHandler = (e) => {
    e.preventDefault();
    const query = {
      name: search,
    };
    props.dispatch(searchOrganisationsFunction(query));
  };

  const addOrganisationHandler = (e) => {
    e.preventDefault();
    props.history.push("/organisations/add/");
  };

  return (
    <Container>
      <CanI perform={ADD_ORGANISATION}>
            <AddOrganisationButton onClick={addOrganisationHandler}>
        ADD ORGANISATION
      </AddOrganisationButton>
      </CanI>
      <SearchContainer>
        <SearchWrapper>
          <Card>
            Title
            <SearchInput
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </Card>
          <Card>
            Services
            <Filter
              defaultValue={"default"}
              onChange={(e) => setServices(e.target.value)}
            >
              <option value="default" disabled>
                Choose here
              </option>
              {serviceOptions.map((service) => {
                return <option key={service}>{service}</option>;
              })}
            </Filter>
          </Card>
          <Card>
            Category
            <Filter
              defaultValue={"default"}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="default" disabled>
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

        </SearchWrapper>
        <SearchButton onClick={searchButtonHandler}>APPLY FILTERS</SearchButton>
      </SearchContainer>
      <ListOrganisationsTable />

    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    organisations: state.organisations,
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(ListOrganisations);
