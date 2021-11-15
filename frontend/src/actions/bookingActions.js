import { SOCKET_CONNECT_FAIL } from "../constants/socketContants";
import { socketConnect } from "./socketAction";
import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_UPDATE_REQUEST,
  BOOKING_UPDATE_FAIL,
} from "../constants/bookingConstants";
import { logout } from "./userActions";

export const listBookings = (id) => async (dispatch, getState) => {
  try {
    if (getState().middleware.connect === true) {
      dispatch({ type: "server/bookingbyvenue", data: id });
    } else {
      dispatch(socketConnect());
      setTimeout(() => {
        dispatch({ type: "server/bookingbyvenue", data: id });
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
export const deleteBookings = (id, venueId) => async (dispatch, getState) => {
  try {
    console.log("alwi");
    if (getState().middleware.connect === true) {
      dispatch({
        type: "server/deletebooking",
        data: { _id: id, venueId: venueId },
      });

      // dispatch({ type: "server/bookingbyvenue", data: venueId });
    } else {
      dispatch(socketConnect());
      setTimeout(() => {
        dispatch({ type: "server/deletebooking", data: { _id: id, venueId } });

        // dispatch({ type: "server/bookingbyvenue", data: venueId });
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

export const updateBooking = (booking) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_UPDATE_REQUEST,
    });

    dispatch({ type: "server/editbooking", data: booking });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOKING_UPDATE_FAIL,
      payload: message,
    });
  }
};
export const addBooking = (booking) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_CREATE_REQUEST,
    });

    //   const {
    //     userLogin: { userInfo },
    //   } = getState()
    dispatch({ type: "server/addbooking", data: booking });

    //   const { data } = await axios.put(
    //     `/api/BOOKINGs/${BOOKING._id}`,
    //     BOOKING,
    //     config
    //   )
  
    // dispatch({
    //   type: BOOKING_CREATE_SUCCESS,
    //   payload: booking,
    // });
    // dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: booking });
    dispatch({ type: "server/bookingbyvenue", data: booking.venue });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: message,
    });
  }
};
