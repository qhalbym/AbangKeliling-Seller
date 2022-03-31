import { ORDERS_ONGOING_FETCH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  ordersOngoing: [],
};

function ordersOngoingReducer(state = initialState, action) {
  switch (action.type) {
    case ORDERS_ONGOING_FETCH_SUCCESS:
      return {
        ...state,
        ordersOngoing: action.payload,
      };
    default:
      return state;
  }
}

export default ordersOngoingReducer;
