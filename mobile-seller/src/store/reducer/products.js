import {
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_LOADING,
  PRODUCTS_FETCH_ERROR,
  PRODUCTSDETAIL_FETCH_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  product: {},
  loading: true,
  error: false,
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_FETCH_SUCCESS:
      return {
        ...state,
        products: action.body,
      };
    case PRODUCTS_FETCH_ERROR:
      return {
        ...state,
        error: action.body,
      };
    case PRODUCTS_FETCH_LOADING:
      return {
        ...state,
        loading: action.body,
      };
    case PRODUCTSDETAIL_FETCH_SUCCESS:
      return {
        ...state,
        product: action.body,
      };
    default:
      return state;
  }
}

export default productReducer;
