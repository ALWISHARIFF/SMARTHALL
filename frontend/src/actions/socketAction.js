import { setMiddleware, unsetMiddleware } from "../socketio";
import io from "socket.io-client";
import createSocketIoMiddleware from "redux-socket.io";
import {
  SOCKET_CONNECT_FAIL,
  SOCKET_CONNECT_MIDDLEWARE_FAIL,
  SOCKET_CONNECT_MIDDLEWARE_REQUEST,
  SOCKET_CONNECT_MIDDLEWARE_SUCCESS,
  SOCKET_CONNECT_REQUEST,
  SOCKET_CONNECT_SUCCESS,
} from "../constants/socketContants";
export const socketConnect = () => async (dispatch, getState) => {
  try {
    unsetMiddleware();
    dispatch({ type: SOCKET_CONNECT_REQUEST });
    if (getState().userLogin.userInfo.token) {
      var socket = io({
        query: `token=${getState().userLogin.userInfo.token}`,
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10,
      });
      console.log(socket.id);
      var socketIoMiddleware = createSocketIoMiddleware(socket, "server/");
      setMiddleware(socketIoMiddleware);
      socket.on("connect", () => {
        if (socket.id) {
          let socketId = String(socket.id);
          localStorage.setItem("socketId", JSON.stringify(socketId));
          dispatch({ type: SOCKET_CONNECT_SUCCESS, payload: socketId });
          dispatch({ type: SOCKET_CONNECT_MIDDLEWARE_SUCCESS });
        }
      });
      //   socket.on("reconnect", () => {
      //     if (socket.id) {
      //       let socketId = String(socket.id);
      //       localStorage.setItem("recsocketId", JSON.stringify(socketId));
      //       dispatch({ type: SOCKET_CONNECT_SUCCESS, payload: socketId });
      //     }
      //   });
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
