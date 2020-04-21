import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setNavigationAction } from "../../store/actions/Navigation";
import { CASES } from "../Navigation/states";
import { Container, HeaderTitle, HeaderTitleWrapper } from "../../styles/BaseContainer";
import CanI from "../Permissions";
import { ADD_CASE } from "../Permissions/permissions";
import ListTable from '../Tables';
import {ClickLink} from "../../styles/Buttons";
import {RedAddText} from "../../styles/Buttons";



function ListCases(props) {
  const dispatch = props.dispatch;

  const statusOptions = ["Requested", "Open", "Closed", "Rejected"];

  useEffect(() => {
    dispatch(setNavigationAction(CASES));
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
        <RedAddText onClick={addCaseHandler}>
          + ADD CASE
        </RedAddText>
      </CanI>
      </HeaderTitleWrapper>
      <ListTable/>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(ListCases);
