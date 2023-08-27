import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import { useHistory } from "react-router-dom";

export const AuthContext = React.createContext({
  user: {},
  login: null,
  onLogin: () => {},
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const currentUser = auth.currentUser;
  const [login, setLogin] = useState(currentUser?true:false);

  const history = useHistory();

  useEffect(()=> {
    const getItem = Object.keys(localStorage);
    // console.log(email);

    if(getItem && getItem.includes(currentUser?.email)) {
      setLogin(true);
      history.push(`/daily-expenses`);
    }
  }, [history, currentUser])

  useEffect(() => {

    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        return currentUser;
      }
    });


  }, [history]);

  const onLoginHandler = (isTrue) => {
    setLogin(isTrue);
  };

  return (
    <AuthContext.Provider
      value={{ user, login: login, onLogin: onLoginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
