import {
    MODAL_DATA_CLEAR,
    MODAL_DATA_FAIL,
    MODAL_DATA_REQUEST,
    MODAL_DATA_SUCCESS,
  } from "../constants/modalContants";
export const modaldataReducer = (state = { modaldata: [] }, action) => {
    switch (action.type) {
      case MODAL_DATA_REQUEST:
        return { loading: true, modaldata: [] };
      case MODAL_DATA_SUCCESS:
        return {
          loading: false,
          modaldata: action.data,
        };
      case MODAL_DATA_FAIL:
        return { loading: false, error: action.payload };
      case MODAL_DATA_CLEAR:
        return { loading: false, modaldata:[] };
      default:
        return state;
    }
  };