import { ORDERS_ONGOING_FETCH_SUCCESS } from "./actionTypes";

import instance from "../../api/axios";

export const fetchOrderOngoing = () => {
  return async (dispatch) => {
    try {
      const { data } = await instance.get("/orders/ongoing", {
        headers: { access_token: token },
      });

      await dispatch(fetchSuccess(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchSuccess = (payload) => {
  return {
    type: ORDERS_ONGOING_FETCH_SUCCESS,
    payload: payload,
  };
};
