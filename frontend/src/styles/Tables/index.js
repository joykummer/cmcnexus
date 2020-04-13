import styled from "styled-components";

export const Table = styled.table`
  width: 60%;
  height: auto;
  border: 1px solid #ebebeb;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`;

export const TableHeaderWrapper = styled.thead``;

export const TableHeader = styled.th`
  height: 40px;
`;

export const TableHeaderRow = styled.tr``;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  :nth-child(odd) {
    background: #ebebeb;
  }
`;

export const TableData = styled.td`
    height: 25px;
`;
