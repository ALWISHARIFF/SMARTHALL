import {
  SOCKET_CONNECT_MIDDLEWARE_FAIL,
  SOCKET_CONNECT_MIDDLEWARE_REQUEST,
  SOCKET_CONNECT_MIDDLEWARE_SUCCESS,
  SOCKET_KILL,
} from "../constants/socketContants";

export const MiddlewareReducer = (state = {}, action) => {
  switch (action.type) {
    case SOCKET_CONNECT_MIDDLEWARE_REQUEST:
      return { loading: true };
    case SOCKET_CONNECT_MIDDLEWARE_SUCCESS:
      return { loading: false, connected: true };
    case SOCKET_CONNECT_MIDDLEWARE_FAIL:
      return { loading: false, error: action.payload };
    case SOCKET_KILL:
      return {};
    default:
      return state;
  }
};
