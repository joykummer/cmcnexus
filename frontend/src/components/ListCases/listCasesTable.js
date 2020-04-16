// import React, {useEffect, useState} from "react";
// import { connect } from "react-redux";
// import {casesFunction} from "../../store/actions/casesAction";
// import {useHistory} from 'react-router-dom';
//
// import {
//   Table,
//   TableBody,
//   TableData,
//   TableHeader,
//   TableHeaderRow,
//   TableHeaderWrapper,
//   TableRow,
// } from "../../styles/Tables";
//
// function ListCasesTable(props) {
//       const [category, setCategory] = useState(null);
//   const history = useHistory();
//   const dispatch = props.dispatch;
//
//   useEffect(() => {
//     dispatch(casesFunction());
//   }, [dispatch]);
//
//   const caseDetailsHandler = (id) => {
//         history.push({
//             pathname: `/cases/details/${id}/`,
//           });
//     };
//
//   const headers = ["Title", "Age", "Country", "Status"];
//
//   return (
//     <Table>
//       <TableHeaderWrapper>
//         <TableHeaderRow>
//           {headers.map((header, id) => {
//             return <TableHeader key={id}>{header}</TableHeader>;
//           })}
//         </TableHeaderRow>
//       </TableHeaderWrapper>
//       <TableBody>
//         {props.cases
//           ? props.cases.filter(file => !category || file.categories.some(cat => cat.name === category)).map((file) =>
//                 <TableRow key={file.id} onClick={() => caseDetailsHandler(file.id)}>
//                   <TableData>{file.title}</TableData>
//                   <TableData>{file.age}</TableData>
//                   <TableData>{file.country}</TableData>
//                   <TableData>{file.status}</TableData>
//                 </TableRow>
//             )
//           : null}
//       </TableBody>
//     </Table>
//   );
// }
//
// const mapStateToProps = (state) => {
//   return {
//     cases: state.cases,
//   };
// };
//
// export default connect(mapStateToProps)(ListCasesTable);
