import React from "react";
import {useDispatch} from "react-redux";
import { AcceptRejectButton } from "../../styles/Buttons";
import {deleteCaseFunction} from "../../store/actions/Cases/deleteCaseAction";


export default function DeleteCase(singleCase) {
  const dispatch = useDispatch();


  const deleteCaseFunc = (singleCase) => {
    dispatch(deleteCaseFunction(singleCase.singleCase.id))

  };

  return(
    <>
      {
          <AcceptRejectButton onClick={()=>deleteCaseFunc(singleCase)}>Delete</AcceptRejectButton>
      }
    </>
)}

