import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import BookingAddScreen from "../screens/BookingAddScreen";
import { useDispatch, useSelector } from "react-redux";
import { modalData } from "../actions/modalAction";
import ModalNew from "./ModalNew";
import useModal from "./modalswitch";

const localizer = momentLocalizer(moment);

const BigCalender = ({ events }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const { toggle, visible } = useModal();
  const handleSelect = (event) => {
    console.log("Hello" + event);
    dispatch(modalData(event));
    // setOpenModal(true);

    toggle();
  };
  const customDayPropGetter = (date) => {
    if (
      date.getDate() === moment().date() &&
      date.getMonth() === moment().month() 
    )
      return {
        className: "special-day",
        style: {
          border:
            "solid 3px " +
            (date.getDate() === moment().date() ? "#afa" : "#afa"),
        },
      };
    else return {};
  };
  let allViews = Object.keys(Views).map((k) => Views[k]);
  console.log(events);
  return (
    <div>
      {/* <ModalContainer openModalValue={openModal}> */}
      <ModalNew visible={visible} toggle={toggle}>
        <BookingAddScreen modalswitch={true} />
      </ModalNew>
      {/* </ModalContainer> */}
      <Calendar
        localizer={localizer}
        events={events}
        titleAccessor={(d) => d.name}
        startAccessor={(d) => moment(d.startdate).toDate()}
        endAccessor={(d) => moment(d.enddate).toDate()}
        allDayAccessor={(d) => d.allday}
        style={{ height: 500 }}
        defaultView='month'
        showMultiDayTimes
        views={allViews}
        step={60}
        selectable={userInfo.isAdmin ? true : false}
        onSelectSlot={handleSelect}
        popup
        dayPropGetter={customDayPropGetter}
        components={{
          event: Event,
          agenda: {
            event: EventAgenda,
          },
        }}
      />
    </div>
  );
};
function Event({ event }) {
  return (
    <span>
      <strong>{event.name}</strong>
      {event.telephone && ":  " + event.telephone}
    </span>
  );
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: "magenta" }}>{event.name}</em>
      <p>{event.telephone}</p>
    </span>
  );
}
export default BigCalender;
