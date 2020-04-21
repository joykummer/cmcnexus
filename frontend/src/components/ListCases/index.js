import React, { useEffect } from "react";
import { connect } from "react-redux";
import { casesFunction } from "../../store/actions/Cases/casesAction";
import { setNavigationAction } from "../../store/actions/Navigation";
import { CASES } from "../Navigation/states";
import { categoriesFunction } from "../../store/actions/Categories/categoriesAction";
import { Container, HeaderTitle } from "../../styles/BaseContainer";
import CanI from "../Permissions";
import { ADD_CASE } from "../Permissions/permissions";
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
  const dispatch = props.dispatch;

  useEffect(() => {
    dispatch(setNavigationAction(CASES));
    dispatch(casesFunction());
    dispatch(categoriesFunction());
  }, [dispatch]);


  const addCaseHandler = (e) => {
    e.preventDefault();
    props.history.push("/cases/add/");
  };

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
