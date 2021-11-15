import {
  SOCKET_CONNECT_FAIL,
  SOCKET_CONNECT_MIDDLEWARE_FAIL,
  SOCKET_CONNECT_MIDDLEWARE_REQUEST,
  SOCKET_CONNECT_MIDDLEWARE_SUCCESS,
  SOCKET_CONNECT_REQUEST,
  SOCKET_CONNECT_SUCCESS,
  SOCKET_KILL,
} from "../constants/socketContants";

export const socketReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case SOCKET_CONNECT_REQUEST:
      return { loading: true };
    case SOCKET_CONNECT_SUCCESS:
      return { loading: false, socketId: action.payload };
    case SOCKET_CONNECT_FAIL:
      return { loading: false, error: action.payload };

    case SOCKET_KILL:
      return {};
    default:
      return state;
  }
};
