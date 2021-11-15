import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import setupDynamicMiddleware from "./socketio";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userCreateReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  bookingListReducer,
  bookingDetailsReducer,
  bookingCreateReducer,
  bookingUpdateReducer,
} from "./reducers/bookingReducers";

import { venuesListReducer } from "./reducers/venueReducers";
import { socketReducer } from "./reducers/socketReducer";
import { MiddlewareReducer } from "./reducers/socketMiddlewareReducer";
import { messageReducer } from "./reducers/messageReducers";
import { modaldataReducer } from "./reducers/modalReducers";
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const reducer = combineReducers({
  userLogin: userLoginReducer,
  bookings: bookingListReducer,
  users: userListReducer,
  userDetails: userDetailsReducer,
  userCreate: userCreateReducer,
  userUpdate: userUpdateReducer,
  venues: venuesListReducer,
  socket: socketReducer,
  middleware: MiddlewareReducer,
  bookingDetails: bookingDetailsReducer,
  bookingCreate: bookingCreateReducer,
  bookingUpdate: bookingUpdateReducer,
  message: messageReducer,
  modal:modaldataReducer
});

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [setupDynamicMiddleware, thunk];
let store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
