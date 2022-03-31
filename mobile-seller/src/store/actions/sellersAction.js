import {
  SELLERS_FETCH_SUCCESS,
  SELLERS_FETCH_LOADING,
  SELLERS_FETCH_ERROR,
  SELLERS_LOGIN_SUCCESS,
  CURRENT_SELLERS_FETCH_SUCCESS
} from "./actionTypes";

import instance from "../../api/axios";
import axios from 'axios'

export const fetchSellers = (params) => {
  const { id, status } = params;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(fetchLoading(true));
      const source = id
        ? "sellers/" + id
        : status
          ? "sellers?status=" + status
          : "sellers";
      instance
        .get(source)
        .then((data) => {
          if (status) {
            data.data = data.data;
            data.data.type = status;
          }
          resolve(data.data);
          dispatch(fetchSuccess(data.data));
        })
        .catch((err) => {
          dispatch(fetchError(true));
          reject(err.message);
        })
        .finally(() => {
          dispatch(fetchLoading(false));
        });
    });
  };
};

export const fetchCurrentSeller = (access_token) => {
  return async (dispatch) => {
    try {
      const data = await instance.get("sellers/currents", {
        headers: { access_token: access_token },
      })
      if (!data) {
        throw new Error("Something went wrong");
      }
      dispatch(fetchCurrentSellerSuccess(data.data))
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateLocation = (id, location) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      instance
        .patch("sellers/" + id, { location })
        .then((data) => {
          resolve(data.data);
        })
        .catch((err) => {
          dispatch(fetchError(true));
          reject(err.message);
        })
        .finally(() => {
          dispatch(fetchLoading(false));
        });
    });
  };
};

export const deleteSellers = (id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const requestOptions = {
        method: "DELETE",
      };
      fetch("http://localhost:3000/products/" + id, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Internal Server Error");
          }
          return response.json();
        })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };
};

export function sellerRegister(payload) {
  return async (dispatch) => {
    try {
      console.log(payload, "==== dari action regis");
      const { data } = await instance.post("sellers/register", payload);
      console.log("success register");
    } catch (err) {
      console.log("gagal register");
      console.log(err, "++++++++++++");
    }
  };
}

export function sellerLogin(payload) {
  return async (dispatch) => {
    try {
      const { data } = await instance.post("sellers/login", payload);
      dispatch(loginSuccess(data.access_token));
      dispatch(fetchCurrentSeller(data.access_token))
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
}

export const fetchSuccess = (payload) => {
  return {
    type: SELLERS_FETCH_SUCCESS,
    body: payload,
  };
};

export const fetchCurrentSellerSuccess = (payload) => {
  return {
    type: CURRENT_SELLERS_FETCH_SUCCESS,
    body: payload,
  };
};

export const fetchLoading = (payload) => {
  return {
    type: SELLERS_FETCH_LOADING,
    body: payload,
  };
};

export const fetchError = (payload) => {
  return {
    type: SELLERS_FETCH_ERROR,
    body: payload,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: SELLERS_LOGIN_SUCCESS,
    body: payload,
  };
};
