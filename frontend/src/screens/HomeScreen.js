import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


const HomeScreen = ({ history }) => {

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { token } = userLogin.userInfo;
  const socket = useSelector((state) => state.socket);
  const { loading } = socket;

  useEffect(() => {
    if (token === null) {
      history.push("/");
    }
    dispatch({type:"MODAL_DATA_CLEAR"});
    dispatch({ type: "server/venues" });

    // dispatch(socketReConnect());
    // if (!loading) {
    //   dispatch(socketReConnect());
    // }
  }, [dispatch, token, history, loading]);
  return <div>Welcome To Smart Hall Master!!!</div>;
};

export default HomeScreen;
