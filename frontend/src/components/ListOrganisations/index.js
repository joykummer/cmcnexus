import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { organisationsFunction } from "../../store/actions/Organisations/organisationsAction";
import { setNavigationAction } from "../../store/actions/Navigation";
import { ORGANISATIONS } from "../Navigation/states";
import { ADD_ORGANISATION } from "../Permissions/permissions";
import CanI from "../Permissions";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction";
import { Container, HeaderTitle } from "../../styles/BaseContainer";
import OrganisationTable from '../Tables/organisations';
import {RedAddText} from "../../styles/Buttons";

const HeaderTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

function ListOrganisations(props) {
  const dispatch = props.dispatch;


  useEffect(() => {
    dispatch(setNavigationAction(ORGANISATIONS));
    dispatch(organisationsFunction());
    dispatch(categoriesFunction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setNavigationAction(ORGANISATIONS));
    dispatch(organisationsFunction());
    dispatch(categoriesFunction());
  }, [dispatch]);


  const addOrganisationHandler = (e) => {
    e.preventDefault();
    props.history.push("/organisations/add/");
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
