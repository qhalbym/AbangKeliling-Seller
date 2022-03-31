import { CATEGORIES_FETCH_SUCCESS } from "./actionTypes";

import instance from "../../api/axios";

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await instance.get("/categories");
      console.log(data, '=====dari action CAT');
      dispatch(fetchCategoriesSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCategoriesSuccess = (payload) => {
  return {
    type: CATEGORIES_FETCH_SUCCESS,
    payload,
  };
};