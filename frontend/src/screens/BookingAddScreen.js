import React, { useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import useModal from "../components/modalswitch";
// import { startOfDay, endOfDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../actions/bookingActions";
// import { listVenues } from "../actions/venueActions";
import moment from "moment";
const BookingAddScreen = ({ history, modalswitch }) => {
  const venues = useSelector((state) => state.venues);
  const modal = useSelector((state) => state.modal);
  const bookings = useSelector((state) => state.bookingCreate);
  const { loading: BookingsLoading } = bookings;
  const { modaldata, loading } = modal;

  const { venuesdata } = venues;
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [paid, setPaid] = useState(false);
  const [allday, setAllDay] = useState(false);

  // const [startdate, setStartDate] = useState(new Date());
  // const [enddate, setEndDate] = useState(new Date());
  const [dateValue, setDateValue] = useState([new Date(), new Date()]);
  const [mode, setMode] = useState("");
  const [venued, setVenued] = useState("");
  const { toggle, visible } = useModal();
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const venueId = useRef();
  useEffect(() => {
    const renderModalStart = () => {
      if (modaldata && !loading) {
        let modaldatadate = [
          moment(modaldata.start).toDate(),
          moment(modaldata.end).toDate(),
        ];
        setDateValue(modaldatadate);
      }
    };
    // const setTimes = () => {
    //   setStartDate(dateValue[0]);
    //   setEndDate(dateValue[1]);
    // };
    renderModalStart();
  }, [modaldata, loading]);

  const submitHandler = (e) => {
    // setStartDate(moment(dateValue[0]))
    // setEndDate(moment(dateValue[1]))
    // const dateRanger = () => {
    //   setStartDate(dateValue[0]);
    //   setEndDate(dateValue[1]);
    // };
    // dateRanger();
    // setStartDate(dateValue[0]);
    // setEndDate(dateValue[1]);
    // if (allday) {
    //   setStartDate(startOfDay(dateValue[0]));
    //   setEndDate(endOfDay(dateValue[1]));
    // }

    e.preventDefault();
    // setVenued(venueId.current.value);
    if (venued === "") {
      alert("please Enter Venue");
      return;
    }

    dispatch(
      addBooking({
        name,
        telephone,
        paid,
        allday,
        startdate: dateValue[0],
        enddate: dateValue[1],
        description,
        mode,
        venue: venued,
      })
    );
    if (history) {
      setTimeout(() => {
        history.goBack();
      }, 5000);
    }
    if (visible) {
      toggle();
    }
  };

  return BookingsLoading ? (
    <Spinner />
  ) : (
    <>
      {!modalswitch ? (
        <Link to='/home' className='btn btn-light my-3 close'>
          Go Home
        </Link>
      ) : null}
      <FormContainer>
      {!modalswitch ? <h1>Add Booking</h1> : null}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='telephone'>
          <Form.Label>Telephone</Form.Label>
          <Form.Control
            required
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
        {/* <Form.Group controlId='cancelled'>
            <Form.Check
              type='checkbox'
              label='Cancelled'
              checked={cancelled}
              onChange={(e) => setCancelled(e.target.checked)}></Form.Check>
          </Form.Group> */}

        <Form.Group controlId='paid'>
          <Form.Check
            type='checkbox'
            label='Paid'
            checked={paid}
            onChange={(e) => setPaid(e.target.checked)}></Form.Check>
        </Form.Group>
        <Form.Group controlId='allday'>
          <Form.Check
            type='checkbox'
            label='All Day'
            checked={allday}
            onChange={(e) => setAllDay(e.target.checked)}></Form.Check>
        </Form.Group>
        <Form.Group controlId='venue'>
          <Form.Label>Venue</Form.Label>
          <Form.Control
            style={{ color: "pink" }}
            as='select'
            name='venue'
            value={venued}
            ref={venueId}
            onChange={(e) => setVenued(e.target.value)}>
            <option disabled value='' key={-1}>
              select
            </option>
            {venuesdata.map((venue, key) => (
              <option key={key} value={venue._id}>
                {venue.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='daterange'>
          <Form.Label className='rangelabel'>Date Range</Form.Label>
          <DateTimeRangePicker
            className='daterange'
            value={dateValue}
            onChange={setDateValue}
            format="d-M-y h:mm a"
          />
          {/* <Form.Control
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}></Form.Control> */}
        </Form.Group>
        {/* <Form.Group controlId='startdate'>
            <Form.Label>Date of Booking</Form.Label>
            <ReactDatePicker
              selected={startdate}
              onChange={(date) => setStartDate(date)}
            /> */}
        {/* <Form.Control
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}></Form.Control> */}
        {/* </Form.Group>
          <Form.Group controlId='enddate'>
            <Form.Label>Date of Booking</Form.Label>
            <ReactDatePicker
              selected={enddate}
              onChange={(date) => setEndDate(date)}
            /> */}
        {/* <Form.Control
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}></Form.Control> */}
        {/* </Form.Group> */}
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}></Form.Control>
        </Form.Group>

        <Button style={{ marginTop: "5px" }} type='submit' variant='primary'>
          Save
        </Button>
      </Form>
      </FormContainer>
    </>
  );
};

export default BookingAddScreen;
