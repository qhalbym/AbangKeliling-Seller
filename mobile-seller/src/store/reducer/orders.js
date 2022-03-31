import {
  ORDERS_FETCH_SUCCESS,
  ORDERS_FETCH_LOADING,
  ORDERS_FETCH_ERROR,
} from "../actions/actionTypes";

const initialState = {
  order: {},
  orders: [],
  ongoing: {},
  waiting: {},
  loading: true,
  error: false,
  complete: {},
};

function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ORDERS_FETCH_SUCCESS:
      if (!Array.isArray(action.body)) {
        return {
          ...state,
          order: action.body,
        };
      } else if (action.body.type == "ongoing") {
        return {
          ...state,
          ongoing: action.body,
        };
      } else if (action.body.type == "waiting") {
        return {
          ...state,
          waiting: action.body,
        };
      } else if (action.body.type == "complete") {
        return {
          ...state,
          complete: action.body,
        };
      } else {
        return {
          ...state,
          orders: action.body,
        };
      }
    case ORDERS_FETCH_ERROR:
      return {
        ...state,
        error: action.body,
      };
    case ORDERS_FETCH_LOADING:
      return {
        ...state,
        loading: action.body,
      };
    default:
      return state;
  }
}

export default ordersReducer;
