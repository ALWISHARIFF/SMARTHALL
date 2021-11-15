import React, { useEffect, useRef } from "react";
import Spinner from "../components/Spinner";

import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import TableContainer from "../components/ReactTable";

const UsersScreen = ({ match, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { isAdmin } = userLogin.userInfo;
  const socket = useSelector((state) => state.socket);
  const { loading } = socket;

  const user = useSelector((state) => state.users);
  const userData = user.userdata;
  const { loading: userLoading } = user;
  const dispatch = useDispatch();
  const data = React.useMemo(() => userData, [userData]);
  // console.log(data);
  const bookingRef = useRef();
  bookingRef.current = data;
  useEffect(() => {
    if (loading === false) {
      // dispatch(listBookings(venueId));
      dispatch({ type: "server/users" });
    }
  }, [dispatch, loading]);
  const columnsAdmin = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
        show: false,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Telephone",
        accessor: "phonenumber",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Administator",
        accessor: (d) => d.isAdmin.toString(),
      },

      {
        Header: "Actions",
        accessor: "actions",
        show: isAdmin === true ? true : false,
        Cell: (props) => {
          console.log(props);
          const rowIdx = props.row.index;
          return (
            <div>
              <span onClick={() => EditUser(rowIdx)}>
                <i
                  style={{ padding: "17px" }}
                  className='far fa-edit action mr-2 padding:20px'></i>
              </span>

              <span onClick={() => deleteUser(rowIdx)}>
                <i
                  style={{ padding: "13px" }}
                  className='fas fa-trash action'></i>
              </span>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isAdmin]
  );
  const EditUser = (rowIndex) => {
    const id = bookingRef.current[rowIndex]._id;
    console.log(id);
    console.log(bookingRef.current[rowIndex]._id);
    history.push(`/admin/user/${id}`);
  };

  const deleteUser = (rowIndex) => {
    const id = bookingRef.current[rowIndex]._id;
    console.log(id);
    console.log(bookingRef.current[rowIndex]._id);
    if (
      window.confirm(
        "Are you sure you want to Delete this record from the database?"
      )
    ) {
      // Save it!
      // history.push(`/admin/deletebooking/${id}`);
      dispatch({ type: "server/deleteuserbyid", data: id });
      dispatch({ type: "USER_LIST_REQUEST" });
      dispatch({ type: "server/users" });
    } else {
      // Do nothing!
    }
  };

  return userLoading ? (
    <Spinner />
  ) : (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columnsAdmin} data={data} admin={isAdmin} />
    </Container>
  );
};

export default UsersScreen;
