


import {
  SOCKET_CONNECT_FAIL,
 
} from "../constants/socketContants";
import { socketConnect } from "./socketAction";
export const listVenues = () => async (dispatch, getState) => {
  try {
    if (getState().middleware.connect === true) {
      dispatch({ type: "server/venues" });
    } else {
      dispatch(socketConnect());
      setTimeout(() => {
        dispatch({ type: "server/venues" });
      }, 3000);
    }
  } catch (error) {
    dispatch({
      type: SOCKET_CONNECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
