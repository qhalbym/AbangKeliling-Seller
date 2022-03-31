import { ORDERS_WAITING_FETCH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  ordersWaiting: [],
};

function ordersWaitingReducer(state = initialState, action) {
  switch (action.type) {
    case ORDERS_WAITING_FETCH_SUCCESS:
      return {
        ...state,
        ordersWaiting: action.payload,
      };
    default:
      return state;
  }
}

export default ordersWaitingReducer;
