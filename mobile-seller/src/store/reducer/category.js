import { CATEGORIES_FETCH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  categories: [],
};

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
}

export default categoriesReducer;
