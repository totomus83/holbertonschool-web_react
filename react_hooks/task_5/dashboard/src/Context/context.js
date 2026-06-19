import React from "react"

const user = {
  email: '',
  password: '',
  isLoggedIn: false,
}

function logOut() {}

const newContext = React.createContext({
  user,
  logOut
});

export default newContext;
