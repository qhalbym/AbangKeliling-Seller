import {
  ORDERS_FETCH_SUCCESS,
  ORDERS_FETCH_LOADING,
  ORDERS_FETCH_ERROR,
} from "./actionTypes";

import instance from "../../api/axios";

export const fetchOrders = (params) => {
  const { id, status, token } = params;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(fetchLoading(true));
      const source = id
        ? "/orders/" + id
        : "/" + status
        ? "/orders?status=" + status
        : "/orders";
      // console.log(status, 19999999999)
      // console.log(source, 19999999999)
      instance
        .get(source, {
          headers: {
            access_token: token,
          },
        })
        .then((data) => {
          if (status) {
            data.data = data.data;
            data.data.type = status;
          }
          // console.log(data.data, "2444444444444")
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

export const editOrders = (id, status, access_token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      console.log("masuk edit");
      instance
        .patch(
          "/orders/" + id,
          { status },
          {
            headers: { access_token: access_token },
          }
        )
        .then((data) => {
          if (status) {
            data.data = data.data;
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

export const deleteOrders = (id) => {
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

export const fetchSuccess = (payload) => {
  return {
    type: ORDERS_FETCH_SUCCESS,
    body: payload,
  };
};

export const fetchLoading = (payload) => {
  return {
    type: ORDERS_FETCH_LOADING,
    body: payload,
  };
};

export const fetchError = (payload) => {
  return {
    type: ORDERS_FETCH_ERROR,
    body: payload,
  };
};
