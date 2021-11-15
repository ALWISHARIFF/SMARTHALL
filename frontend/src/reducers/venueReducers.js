import {
  VENUES_LIST_FAIL,
  VENUES_LIST_REQUEST,
  VENUES_LIST_SUCCESS,
} from "../constants/venueConstants";

export const venuesListReducer = (state = { venuesdata: [] }, action) => {
  switch (action.type) {
    case VENUES_LIST_REQUEST:
      return { loading: true, bookingdata: [] };
    case VENUES_LIST_SUCCESS:
      return {
        loading: false,
        venuesdata: action.data,
      };
    case VENUES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
