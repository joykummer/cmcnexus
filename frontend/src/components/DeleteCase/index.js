import React from "react";
import {useDispatch} from "react-redux";
import { RedAddText } from "../../styles/Buttons";
import {deleteCaseFunction} from "../../store/actions/Cases/deleteCaseAction";


export default function DeleteCase(singleCase) {
  const dispatch = useDispatch();


  const deleteCaseFunc = (singleCase) => {
    if (singleCase.singleCase.status === "requested" || singleCase.singleCase.status === "closed") {
      dispatch(deleteCaseFunction(singleCase.singleCase.id))
    } else {
      return null;
    }
  };

  return(
    <>
      {
          <RedAddText onClick={()=>deleteCaseFunc(singleCase)}>Delete</RedAddText>
      }
    </>
)}

