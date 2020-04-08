import React, { useState } from "react";
import styled from "styled-components";
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

export default function ListCases() {
  const [cases, setCases] = useState("");
  const [search, setSearch] = useState("");

  const data = [
    { id: 1, first_name: "greta" },
    { id: 2, first_name: "jannic" },
    { id: 3, first_name: "joy" },
  ];

  const setSearchHandler = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const searchButtonHandler = (e) => {
    e.preventDefault();
    const data = {};
  };

  console.log("in the cases");

  return (
    <>
      <Container>
        <SearchInput name="search" onChange={setSearchHandler} value={search} />
        <SearchButton onClick={searchButtonHandler}>Search</SearchButton>
        {data
          ? data.map((info) => {
              return (
                <div key={info.id}>
                  <div>id: {info.id}</div>
                  <div>name: {info.first_name}</div>
                </div>
              );
            })
          : null}
      </Container>
    </>
  );
}
