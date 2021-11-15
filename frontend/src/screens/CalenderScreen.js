import React, { useEffect } from "react";
import BigCalender from "../components/BigCalender";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

import { useDispatch } from "react-redux";

const CalenderScreen = ({ match, history }) => {
  const venueId = match.params.id;
  const bookings = useSelector((state) => state.bookings);
  const bookingData = bookings.bookingdata;
  const { loading: LoadingBooking } = bookings;
  const userLogin = useSelector((state) => state.userLogin);
  const { token } = userLogin.userInfo;
  const socket = useSelector((state) => state.socket);
  const { loading, socketId } = socket;
  const middleware = useSelector((state) => state.middleware);
  const { connected } = middleware;
  const dispatch = useDispatch();
  useEffect(() => {
    if (token === null) {
      history.push("/");
    }

    if (loading === false && socketId) {
      dispatch({ type: "server/venues" });
     
      dispatch({ type: "server/bookingbyvenue", data: venueId });
    }
  }, [venueId, dispatch, history, token, loading, socketId, connected]);

  return LoadingBooking ? <Spinner /> : <BigCalender events={bookingData} />;
};

export default CalenderScreen;
