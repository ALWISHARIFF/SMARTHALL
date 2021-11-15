import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const middleware = useSelector((state) => state.middleware);
  const { connected } = middleware;
  const venues = useSelector((state) => state.venues);
  const { venuesdata } = venues;

  const venueFetch = () => {
    // dispatch(socketConnect());
    if (connected === true) {
      dispatch({ type: "server/venues" });
    }
    // dispatch(listVenues());
  };
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Ridhwan Hall Master</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo ? (
                <>
                <NavDropdown onClick={venueFetch} title='Halls' id='username'>
                  {venuesdata.map((venue, index) => (
                    <LinkContainer
                      key={index}
                      to={`/listbookings/${venue._id}`}>
                      <NavDropdown.Item>{venue.name}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
                </NavDropdown>
                <NavDropdown onClick={venueFetch} title='Calender' id='username'>
                  {venuesdata.map((venue, index) => (
                    <LinkContainer
                      key={index}
                      to={`/calender/${venue._id}`}>
                      <NavDropdown.Item>{venue.name}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
                </NavDropdown>
                </>
              ) : null}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/users'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/adduser'>
                    <NavDropdown.Item>Add User</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/addbooking'>
                    <NavDropdown.Item>Add Bookings</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
