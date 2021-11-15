import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { EditUser } from "../actions/userActions";
import Spinner from "../components/Spinner";
// import { getUserDetails, updateUser } from '../actions/userActions'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [phonenumber, setphoneNumber] = useState(0);
  const [isAdmin, setisAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userUpdate = useSelector((state) => state.userUpdate);
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const { success: successUpdate, loading } = userUpdate;
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });

      history.goBack();
    } else {
      if (!user.name || user._id !== userId) {
        dispatch({ type: "server/userbyid", data: userId });
      } else {
        setName(user.name);
        setUsername(user.username);
        setphoneNumber(user.phonenumber);
        setisAdmin(user.isAdmin);
        setEmail(user.email);
        setPassword("");
      }
    }
  }, [dispatch, userId, successUpdate, history, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // setVenued(venueId.current.value);

    dispatch(
      EditUser({
        _id: userId,
        name,
        username,
        email,
        phonenumber,
        isAdmin,
        password,
      })
    );
  };
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Link to='/home' className='btn btn-light my-3'>
        Go Home
      </Link>
      <FormContainer>
        <h1>Edit User</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='username'>
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='isAdmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setisAdmin(e.target.checked)}></Form.Check>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='phonenumber'>
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter phone number'
              value={phonenumber}
              onChange={(e) => setphoneNumber(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Save User
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
