import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { organisationsFunction } from "../../store/actions/Organisations/organisationsAction";
import {
  searchNameFunction,
  searchTagFunction,
} from "../../store/actions/Organisations/searchOrganisationsAction";
import { setNavigationAction } from "../../store/actions/Navigation";
import { ORGANISATIONS } from "../Navigation/states";
import { ADD_ORGANISATION } from "../Permissions/permissions";
import CanI from "../Permissions";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction";
import { useHistory } from "react-router-dom";
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

import OrganisationTable from '../Tables/organisations';
import {RedAddText} from "../../styles/Buttons";

const HeaderTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

function ListOrganisations(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const dispatch = props.dispatch;
  const history = useHistory();

  useEffect(() => {
    dispatch(setNavigationAction(ORGANISATIONS));
    dispatch(organisationsFunction());
    dispatch(categoriesFunction());
  }, [dispatch]);

  const organisationDetailsHandler = (id) => {
    history.push({
      pathname: `/organisations/details/${id}/`,
    });
  };

  const headers = ["Name", "Category", "Tag"];

  useEffect(() => {
    dispatch(setNavigationAction(ORGANISATIONS));
    dispatch(organisationsFunction());
    dispatch(categoriesFunction());
  }, [dispatch]);

  const searchButtonHandler = (e) => {
    e.preventDefault();
    if (name) {
      const query = {
        name: name,
      };
      props.dispatch(searchNameFunction(query));
    }
    if (tag) {
      const query = {
        tag: tag,
      };
      props.dispatch(searchTagFunction(query));
    }
  };

  const addOrganisationHandler = (e) => {
    e.preventDefault();
    props.history.push("/organisations/add/");
  };

  const clearSearchHandler = () => {
    window.location.reload();
  };

  return (
    <Container>
      <HeaderTitleWrapper>
      <HeaderTitle>ORGANISATIONS</HeaderTitle>
      <CanI perform={ADD_ORGANISATION}>
        <RedAddText onClick={addOrganisationHandler}>
          + ADD ORGANISATION
        </RedAddText>
      </CanI>
      </HeaderTitleWrapper>

      <OrganisationTable />
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
