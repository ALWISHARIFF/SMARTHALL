import { ADD_MESSAGE, MESSAGE, REMOVE_MESSAGE } from "../constants/messageConstants";
import _ from "lodash";
export const messageReducer = (state = { message: "", status: "" }, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        loading: false,
        message: action.payload.message,
        status: action.payload.status,
      };
    case MESSAGE:
      return {
        loading: false,
        message: action.data.message,
        status: action.data.status,
      };
    case REMOVE_MESSAGE:
      return _.omitBy(state, (value, key) => {
        _.isEqual(value, action.payload);
      });

    default:
      return state;
  }
};
