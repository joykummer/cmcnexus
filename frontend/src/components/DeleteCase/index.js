import React from "react";
import {useDispatch} from "react-redux";
import { RedAddText } from "../../styles/Buttons";
import {deleteCaseFunction} from "../../store/actions/Cases/deleteCaseAction";


export default function DeleteCase(props) {
  const dispatch = useDispatch();


  const deleteCaseFunc = (singleCase) => {
    if (singleCase.status === "requested" || singleCase.status === "closed") {
      dispatch(deleteCaseFunction(singleCase.id))
    } else {
      return null;
    }
  };

  return(
    <>
      {
          <RedAddText onClick={()=>deleteCaseFunc(props.singleCase)}>Delete</RedAddText>
      }
    </>
)}

