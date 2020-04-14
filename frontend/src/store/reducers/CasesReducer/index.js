import { SET_CASES, ADD_CASE, UPDATE_CASE, REJECT_CASE, ACCEPT_CASE } from "../../actions/actionTypes";


export default function cases(state = [], action) {
  switch (action.type) {
    case SET_CASES: {
      return action.payload;
    }
    case ADD_CASE: {
      return [...state, action.payload];
    }
    case UPDATE_CASE: {
      return state.map((c) => c.id === action.payload.id ? action.payload : c)
    }
    case ACCEPT_CASE:{
      const state_id = state.findIndex(cases => cases.id = action.payload.id)
      if(state_id === -1){
        return [...state, action.payload]
      }else{
        state.splice(state_id, 1);
				return[...state, action.payload]
      }
    }
    case REJECT_CASE: {
      const state_id = state.findIndex(cases => cases.id = action.payload.id)
      if(state_id === -1){
        return [...state, action.payload]
      }else{
        state.splice(state_id, 1);
				return[...state, action.payload]
      }
    }
    default:
      return state;
  }
}
