import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { addUser } from "../actions/userActions";
import Spinner from "../components/Spinner";
const UserAddScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [phonenumber, setphoneNumber] = useState(0);
  const [isAdmin, setisAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userCreate = useSelector((state) => state.userCreate);
  const { loading } = userCreate;
  const submitHandler = (e) => {
    e.preventDefault();
    // setVenued(venueId.current.value);

    dispatch(
      addUser({
        name,
        username,
        email,
        phonenumber,
        isAdmin,
        password,
      })
    );
    dispatch({ type: "server/users" });
    setTimeout(() => {
      history.goBack();
    }, 5000);
  };
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Link to='/home' className='btn btn-light my-3'>
        Go Home
      </Link>
      <FormContainer>
        <h1>Add User</h1>

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
            Add User
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserAddScreen;
