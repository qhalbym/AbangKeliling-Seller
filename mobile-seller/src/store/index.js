import { createStore, applyMiddleware, combineReducers } from "redux";
import ordersReducer from "./reducer/orders";
import sellersReducer from "./reducer/sellers";
import productReducer from "./reducer/products";
import ordersOngoingReducer from "./reducer/orderOngoing";
import ordersWaitingReducer from "./reducer/orderWaiting";
import thunk from "redux-thunk";
import categoriesReducer from "./reducer/category";

let rootReducers = combineReducers({
  ordersReducer,
  sellersReducer,
  productReducer,
  ordersOngoingReducer,
  ordersWaitingReducer,
  categoriesReducer
});
let store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
