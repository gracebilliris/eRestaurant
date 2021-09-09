import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

// POST {username, email, password}
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

// POST {username, password} & save JWT to Local Storage
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// POST {username, date, time, seats} & save JWT to Local Storage
const createbooking = (username, date, time, seats) => {
  return axios.post(API_URL + "booking", {
      username,
      date,
      time, 
      seats,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("booking", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// POST {username, date, time, seats} & save JWT to Local Storage
const editbooking = (username, date, time, seats) => {
  return axios.post(API_URL + "editbooking", {
      username,
      date,
      time, 
      seats,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("editbooking", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// POST {username, date, time, seats} & save JWT to Local Storage
const onlyonebooking = (username, date, time, seats) => {
  return axios.get(API_URL + "onlyonebooking", {
      username,
      date,
      time, 
      seats,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("onlyonebooking", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// POST {username, date, time, seats} & save JWT to Local Storage
const allbooking = (username, date, time, seats) => {
  return axios.get(API_URL + "allbooking", {
      username,
      date,
      time, 
      seats,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("allbooking", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// remove JWT from Local Storage
const logout = () => {
  localStorage.removeItem("user");
};
// eslint-disable-next-line
export default {
  register,
  login,
  logout,
  createbooking,
};