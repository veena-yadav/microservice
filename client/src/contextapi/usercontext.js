import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react'
import PropTypes from 'prop-types'
// const axios=require('axios');

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState(false);

  return (
    <UserContext.Provider value={{ auth, setAuth, user, setUser, admin, setAdmin }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider