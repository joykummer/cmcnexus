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
  text-align: left;
    padding: 10px 0;
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
    cursor: pointer;
  }
  :nth-child(odd) {
    background: #ebebeb;
  }
`;

export const TableData = styled.td`
  height: 25px;
  max-width: 150px;
  padding: 10px;
`;


export const ReactTableData = styled.td`
  height: 25px;
  max-width: 150px;
  padding: 10px;
  
  color: ${props => props.children.props.column.Header === "Status" ? 
    props.theme.colors.status[props.children.props.cell.value] : null}}
`;
