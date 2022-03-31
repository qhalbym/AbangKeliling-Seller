import {
  SELLERS_FETCH_SUCCESS,
  SELLERS_FETCH_LOADING,
  SELLERS_FETCH_ERROR,
  SELLERS_LOGIN_SUCCESS,
  CURRENT_SELLERS_FETCH_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  seller: {},
  sellers: [],
  currentSeller: {},
  ongoing: {},
  loading: true,
  error: false,
  token: null
};

function sellersReducer(state = initialState, action) {
  switch (action.type) {
    case SELLERS_FETCH_SUCCESS:
      if (!Array.isArray(action.body)) {
        return {
          ...state,
          seller: action.body,
        };
      } else if (action.body.type == "ongoing") {
        return {
          ...state,
          ongoing: action.body,
        };
      } else {
        return {
          ...state,
          sellers: action.body,
        };
      }
    case CURRENT_SELLERS_FETCH_SUCCESS:
      return {
        ...state,
        currentSeller: action.body,
      };
    case SELLERS_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.body,
      };
    case SELLERS_FETCH_ERROR:
      return {
        ...state,
        error: action.body,
      };
    case SELLERS_FETCH_LOADING:
      return {
        ...state,
        loading: action.body,
      };
    default:
      return state;
  }
}

export default sellersReducer;
