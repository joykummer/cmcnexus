import React from "react";
import styled from "styled-components";
import NavigationBar from "../NavigationBar";

const Container = styled.div`
  width: auto;
  height: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function ListCases() {
  const data = [
    { id: 1, first_name: "greta" },
    { id: 2, first_name: "jannic" },
    { id: 3, first_name: "joy" }
  ];

  console.log("in the cases");

  return (
    <>
      <NavigationBar />
      <Container>
        {data
          ? data.map(info => {
              return <div key={info.id}>id: {info.id}</div>;
            })
          : null}
      </Container>
    </>
  );
}
