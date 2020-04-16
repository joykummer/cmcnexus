import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { RedButton } from "../../styles/Buttons";
import { casesFunction } from "../../store/actions/casesAction";
import { searchCasesFunction } from "../../store/actions/searchCasesAction";
import ListCasesTable from "./listCasesTable";
import CanI from "../Permissions";
import { ADD_CASE } from "../Permissions/permissions";
import { setNavigationAction } from "../../store/actions/Navigation";
import { CASES } from "../Navigation/states";
import { Dropdown } from "../../styles/Dropdowns";
import { categoriesFunction } from "../../store/actions/categoriesAction";

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

const AddCaseButton = styled(RedButton)`
  width: 125px;
  height: 40px;
  margin-bottom: 50px;
`;

function ListCases(props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState("");
  const dispatch = props.dispatch;

  const statusOptions = ["created", "validated", "closed", "rejected"];

  useEffect(() => {
    dispatch(setNavigationAction(CASES));
    dispatch(casesFunction());
    dispatch(categoriesFunction());
  }, [dispatch]);

  const searchButtonHandler = (e) => {
    e.preventDefault();
    const query = {
      title: search,
    };
    props.dispatch(searchCasesFunction(query));
  };

  const addCaseHandler = (e) => {
    e.preventDefault();
    props.history.push("/cases/add/");
  };

  return (
    <Container>
      <CanI perform={ADD_CASE}>
        <AddCaseButton onClick={addCaseHandler}>ADD CASE</AddCaseButton>
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
          <Card>
            Status
            <Filter
              defaultValue={"default"}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="default" disabled>
                Choose here
              </option>
              {statusOptions.map((status) => {
                return <option key={status}>{status}</option>;
              })}
            </Filter>
          </Card>
        </SearchWrapper>
        <SearchButton onClick={searchButtonHandler}>APPLY FILTERS</SearchButton>
      </SearchContainer>
      <ListCasesTable />
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
