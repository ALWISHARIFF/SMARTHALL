import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import LoginScreen from "./screens/LoginScreen";

import BookingScreen from "./screens/BookingScreen";
import UsersScreen from "./screens/UsersScreen";
import BookingEditScreen from "./screens/BookingEditScreen";
import UserEditScreen from "./screens/UserEditScreen";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import { useEffect } from "react";
import { socketConnect } from "./actions/socketAction";
import BookingAddScreen from "./screens/BookingAddScreen";
import BookingDeleteScreen from "./screens/BookingDeleteScreen";
import UserAddScreen from "./screens/UserAddScreen";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import CalenderScreen from "./screens/CalenderScreen";

function App({ appServiceWorker }) {
  const Message = useSelector((state) => state.message);
  const { message, status } = Message;
  const dispatch = useDispatch();
  useEffect(() => {
    if (message !== "" && status === 1) {
      toast.success(message);
    } else if (message !== "" && status === 0) {
      toast.warning(message);
    }
    dispatch(socketConnect());
  }, [dispatch, message, status]);
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <ToastContainer autoClose={3000} />
          {/* Table for bookings accoring to Id */}
          <Route path='/listbookings/:id' exact component={BookingScreen} />
          <Route path='/calender/:id' exact component={CalenderScreen} />
          {/* table for users all users */}
          <Route path='/admin/users' exact component={UsersScreen} />
          <Route path='/admin/addbooking' exact component={BookingAddScreen} />
          <Route
            path='/admin/deletebooking/:id'
            exact
            component={BookingDeleteScreen}
          />
          {/* Edit booking */}
          <Route path='/editbooking/:id' exact component={BookingEditScreen} />

          {/* Edit user */}
          <Route path='/admin/user/:id' exact component={UserEditScreen} />
          <Route path='/admin/adduser' exact component={UserAddScreen} />
          <Route path='/home' exact component={HomeScreen} />
          <Route path='/' component={LoginScreen} exact />
        </Container>
      </main>
    </Router>
  );
}

export default App;
