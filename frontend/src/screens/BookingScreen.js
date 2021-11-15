import React, { useEffect, useRef } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import TableContainer from "../components/ReactTable";
import moment from "moment";
import Spinner from "../components/Spinner";

const BookingScreen = ({ history, match }) => {
  const venueId = match.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { token, isAdmin } = userLogin.userInfo;
  const socket = useSelector((state) => state.socket);
  const { loading } = socket;

  
  const bookings = useSelector((state) => state.bookings);
  const bookingData = bookings.bookingdata;
  const { loading: BookingsLoading } = bookings;
  const data = React.useMemo(() => bookingData, [bookingData]);
  // console.log(data);
  const bookingRef = useRef();
  bookingRef.current = data;

  const columnsAdmin = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Venue",
        accessor: "venue.name",
      },
      {
        Header: "Telephone",
        accessor: "telephone",
      },
      {
        Header: "Paid",
        id: "paid",
        accessor: (d) => d.paid.toString(),
      },
      {
        Header: "Cancelled",
        accessor: (d) => d.cancelled.toString(),
      },
      {
        Header: "All Day",
        accessor: (d) => d.allday.toString(),
      },
      {
        Header: "StartDate",
        accessor: (d) => {
          return moment(d.startdate).local().format("MMMM Do YYYY, h:mm:ss a");
        },
      },
      {
        Header: "EndDate",
        accessor: (d) => {
          return moment(d.enddate).local().format("MMMM Do YYYY, h:mm:ss a");
        },
      },
      {
        Header: "Mode",
        accessor: "mode",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        accessor: "actions",

        Cell: (props) => {
          const rowIdx = props.row.index;
          return (
            <div>
              <span onClick={() => EditBooking(rowIdx)}>
                <i
                  style={{ padding: "7px" }}
                  className='far fa-edit action mr-2'></i>
              </span>

              <span onClick={() => deleteBooking(rowIdx)}>
                <i
                  style={{ padding: "7px" }}
                  className='fas fa-trash action'></i>
              </span>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const EditBooking = (rowIndex) => {
    const id = bookingRef.current[rowIndex]._id;

    history.push(`/editbooking/${id}`);
  };

  const deleteBooking = (rowIndex) => {
    const id = bookingRef.current[rowIndex]._id;

    if (
      window.confirm(
        "Are you sure you want to Delete this record from the database?"
      )
    ) {
      // Save it!
      // history.push(`/admin/deletebooking/${id}`);

      dispatch({
        type: "server/deletebooking",
        data: { _id: id, venueId: venueId },
      });
      // dispatch({ type: "server/deletebooking", data: { _id: id } });

      // dispatch({ type: "server/bookingbyvenue", data: venueId });
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };
  const dispatch = useDispatch();
  // Update the state when input changes

  // Input element

  useEffect(() => {
    if (token === null) {
      history.push("/");
    }

    // dispatch(socketReConnect());

    // dispatch(socketReConnect());

    // if (connected) {
    //   dispatch({ type: "server/getbookings", data: "Hello!" });
    // }
    // dispatch({ type: "server/getbookings", data: "Hello!" });
    // store.dispatch({ type: "server/getbookings", data: "Hello!" });

    //socketid change state detect
    // dispatch(socketConnect());

    // dispatch(listBookings(venueId));
    if (!loading) {
      dispatch({type: "BOOKING_LIST_REQUEST"})
      dispatch({ type: "server/bookingbyvenue", data: venueId });
    }
  }, [venueId, dispatch, history, token, loading]);

  // if (usePrevious(socketId) !== socketId) {
  //   dispatch(socketConnect());
  // }
  //save state socketid,if statesocket!==reduxsocketid

  return BookingsLoading ? (
    <Spinner />
  ) : (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columnsAdmin} data={data} admin={isAdmin} />
    </Container>
  );
};
export default BookingScreen;
