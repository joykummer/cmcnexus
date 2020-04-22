import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #EBEBEB;
  padding: 40px 60px 40px 60px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const HeaderTitle = styled.div`
  font-size: 30px;
  text-transform: uppercase;
  padding-bottom: 15px;
`;

export const HeaderTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

export const DetailsContainer = styled.div`
  height: auto;
  padding: 25px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 5px;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;