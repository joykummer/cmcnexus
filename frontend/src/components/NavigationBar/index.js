import React from "react";
import styled from "styled-components";


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
        <NavigationContainer />
  )
}

export default NavigationBar;
