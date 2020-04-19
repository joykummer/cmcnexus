import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  height: auto;
  border: 1px solid #ebebeb;
  background: #ffffff;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

export const TableHeaderWrapper = styled.thead``;

export const TableHeader = styled.th`
  height: 40px;
`;

export const TableHeaderRow = styled.tr``;

export const TableBody = styled.tbody`
  width: 100%;
`;

export const TableRow = styled.tr`
  width: 100%;
  text-transform: capitalize;
  :hover {
    color: red;
  }
  :nth-child(odd) {
    background: #ebebeb;
  }
`;

export const TableData = styled.td`
  height: 25px;
  max-width: 150px;
  padding: 5px;
  padding-left: 10px;
`;
