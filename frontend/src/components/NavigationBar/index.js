import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const NavigationContainer = styled.div`
  width: 350px;
  height: 100%;
  background: yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function NavigationBar() {
  return (
      <PageContainer>
        <NavigationContainer />;
      </PageContainer>
  )
}

export default NavigationBar;
