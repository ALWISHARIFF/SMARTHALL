import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { BOOKING_UPDATE_RESET } from "../constants/bookingConstants";

import { useDispatch, useSelector } from "react-redux";

import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import Spinner from "../components/Spinner";

import "react-datepicker/dist/react-datepicker.css";
import { updateBooking } from "../actions/bookingActions";
import moment from "moment";

const BookingEditScreen = ({ history, match }) => {
  let bookingId = match.params.id;
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [paid, setPaid] = useState();
  const [allday, setAllDay] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [date, setDate] = useState([moment().toDate(), moment().toDate()]);

  const bookings = useSelector((state) => state.bookingDetails);
  const { booking } = bookings;
  const [mode, setMode] = useState("");
  const [venue, setVenue] = useState("");
  const [venueName, setVenueName] = useState("");
  const [description, setDescription] = useState("");
  const [venueData, setvenueData] = useState({});
  const dispatch = useDispatch();

  const bookingUpdate = useSelector((state) => state.bookingUpdate);
  const { success: successUpdate, loading } = bookingUpdate;
  const venues = useSelector((state) => state.venues);
  const { venuesdata } = venues;

  let newVenue = [];
  for (let index = 0; index < venuesdata.length; index++) {
    const element = venuesdata[index];
    if (element._id !== venueData._id) {
      newVenue.push(element);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (venue === "") {
      alert("please Enter Venue");
      return;
    }
    dispatch(
      updateBooking({
        _id: bookingId,
        name,
        telephone,
        paid,
        cancelled,
        allday,
        startdate: date[0],
        enddate: date[1],
        description,
        mode,
        venue,
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BOOKING_UPDATE_RESET });
      setTimeout(() => {
        history.goBack();
      }, 3000);
    } else {
      if (!booking.name || !booking.venue || booking._id !== bookingId) {
        dispatch({ type: "server/bookingbyid", data: bookingId });
      } else {
        setName(booking.name);
        setDate([
          moment(booking.startdate).toDate(),
          moment(booking.enddate).toDate(),
        ]);
        setCancelled(booking.cancelled);
        setTelephone(booking.telephone);
        setDescription(booking.description);
        setMode(booking.mode);
        setPaid(booking.paid);
        setVenue(booking.venue._id);
        setAllDay(booking.allday);
        setvenueData(booking.venue);
        setVenueName(booking.venue.name);
      }
    }
  }, [dispatch, bookingId, booking, history, successUpdate]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Link to='/home' className='btn btn-light my-3'>
        Go Home
      </Link>
      <FormContainer>
        <h1>Edit Booking</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='telephone'>
            <Form.Label>Telephone</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter phone number'
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='mode'>
            <Form.Label>Mode of Payment</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter mode of payment'
              value={mode}
              onChange={(e) => setMode(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='cancelled'>
            <Form.Check
              type='checkbox'
              label='Cancelled'
              checked={cancelled}
              onChange={(e) => setCancelled(e.target.checked)}></Form.Check>
          </Form.Group>

          <Form.Group controlId='paid'>
            <Form.Check
              type='checkbox'
              label='Paid'
              checked={paid}
              onChange={(e) => setPaid(e.target.checked)}></Form.Check>
          </Form.Group>
          <Form.Group controlId='paid'>
            <Form.Check
              type='checkbox'
              label='Allday'
              checked={allday}
              onChange={(e) => setAllDay(e.target.checked)}></Form.Check>
          </Form.Group>
          <Form.Group controlId='venue'>
            <Form.Label>Venue</Form.Label>
            <Form.Control
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              style={{ color: "pink" }}
              as='select'>
              {/*  */}
              <option selected value={venueData._id} key={1}>
                {venueName}
              </option>
              {newVenue.map((venued, key) => (
                <option value={venued._id} key={key}>
                  {venued.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='date'>
            <Form.Label className='rangelabel'>Date Range</Form.Label>
            <DateTimeRangePicker
              className='daterange'
              value={date}
              onChange={setDate}
              format="d-M-y h:mm a"
            />
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Save
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default BookingEditScreen;
