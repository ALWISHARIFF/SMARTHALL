import axios from "axios";
import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

import { socketConnect } from "./socketAction";
export const login = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/login",
      { username: email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    // if (getState().userLogin.userInfo.token) {
    //   var socket = io("http://localhost:3000", {
    //     query: `token=${data.token}`,
    //   });

    //   var socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
    //   setMiddleware(socketIoMiddleware);
    // }
    dispatch(socketConnect());
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => (dispatch) => {
  document.location.href = "/";
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_LOGOUT });
};
export const addUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    });

    //   const {
    //     userLogin: { userInfo },
    //   } = getState()
    dispatch({ type: "server/adduser", data: user });

    //   const { data } = await axios.put(
    //     `/api/USERs/${USER._id}`,
    //     USER,
    //     config
    //   )

    
    dispatch({ type: USER_DETAILS_SUCCESS, payload: user });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const EditUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    //   const {
    //     userLogin: { userInfo },
    //   } = getState()
    dispatch({ type: "server/edituser", data: user });

    //   const { data } = await axios.put(
    //     `/api/USERs/${USER._id}`,
    //     USER,
    //     config
    //   )

    dispatch({ type: USER_DETAILS_SUCCESS, payload: user });
    dispatch({ type: "server/users" });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};
