import axios from "axios";

const { REACT_APP_GATEWAY_URL } = process.env;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const login = (username, password) => {
  return axios.post(
    REACT_APP_GATEWAY_URL + "login/",
    {
      username: username,
      password: password,
    },
    headers
  );
};
export const register = (username, email, password) => {
  return axios.post(
    REACT_APP_GATEWAY_URL + "register/",
    {
      username: username,
      email: email,
      password: password,
    },
    headers
  );
};
