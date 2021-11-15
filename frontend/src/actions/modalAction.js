import { SOCKET_CONNECT_FAIL } from "../constants/socketContants";
import { socketConnect } from "./socketAction";
export const modalData = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: "MODAL_DATA_REQUEST" });
    if (getState().middleware.connect === true) {
      dispatch({ type: "MODAL_DATA_SUCCESS", data: data });
    } else {
      dispatch(socketConnect());
      dispatch({ type: "MODAL_DATA_REQUEST" });
      setTimeout(() => {
        dispatch({ type: "MODAL_DATA_SUCCESS", data: data });
      }, 5000);
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
