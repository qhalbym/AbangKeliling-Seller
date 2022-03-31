import {
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_LOADING,
  PRODUCTS_FETCH_ERROR,
  PRODUCTSDETAIL_FETCH_SUCCESS,
} from "./actionTypes";
import instance from "../../api/axios";

const BASE_URL = `https://f33c-2001-448a-2020-3371-455e-97d0-3ca5-4d1f.ngrok.io`;

export const fetchProducts = (token) => {
  // const { id, status } = params;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(fetchLoading(true));
      instance
        .get("products", {
          headers: {
            access_token: token,
          },
        })
        .then((data) => {
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
export const fetchProductsDetail = (token, id) => {
  console.log("masuk gaaaa");
  // const { id, status } = params;
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(fetchLoading(true));
      instance
        .get(`products/detail/${id}`, {
          headers: {
            access_token: token,
          },
        })
        .then((data) => {
          console.log(data, "<<<sjdhskahds");
          resolve(data.data);
          dispatch(fetchDetailSuccess(data.data));
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
export const addProduct = (token, formData) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(fetchLoading(true));
      fetch(`${BASE_URL}/products`, {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: token,
        },
        body: formData,
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
        })
        .then((resp) => {
          resolve(resp);
          return dispatch(fetchProducts(token));
        });
    });
  };
};
export const updateProduct = (token, formData, id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(fetchLoading(true));
      fetch(`${BASE_URL}/products/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: token,
        },
        body: formData,
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
        })
        .then((resp) => {
          resolve(resp);
          dispatch(fetchProducts(token));
        })
        .catch((err) => {
          reject(err.message);
          console.log(err);
        });
    });
  };
};
export const deleteProduct = (token, id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(fetchLoading(true));
      instance
        .delete(`products/${id}`, {
          headers: {
            access_token: token,
          },
        })
        .then((data) => {
          resolve(data.data);
          dispatch(fetchProducts(token));
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
export const fetchSuccess = (payload) => {
  return {
    type: PRODUCTS_FETCH_SUCCESS,
    body: payload,
  };
};
export const fetchDetailSuccess = (payload) => {
  return {
    type: PRODUCTSDETAIL_FETCH_SUCCESS,
    body: payload,
  };
};

export const fetchLoading = (payload) => {
  return {
    type: PRODUCTS_FETCH_LOADING,
    body: payload,
  };
};
export const fetchError = (payload) => {
  return {
    type: PRODUCTS_FETCH_ERROR,
    body: payload,
  };
};
