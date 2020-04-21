import React from "react";
import {useDispatch} from "react-redux";
import { RedAddText } from "../../styles/Buttons";
import {deleteCaseFunction} from "../../store/actions/Cases/deleteCaseAction";


export default function DeleteCase(singleCase) {
  const dispatch = useDispatch();


  const deleteCaseFunc = (singleCase) => {
    dispatch(deleteCaseFunction(singleCase.singleCase.id))

  };

  return(
    <>
      {
          <RedAddText onClick={()=>deleteCaseFunc(singleCase)}>Delete</RedAddText>
      }
    </>
)}

