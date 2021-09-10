import {
    BOOKING_SUCCESS,
    BOOKING_FAIL,
    SET_MESSAGE
  } from "./types";// import AuthService to make asynchronous HTTP requests with trigger one or more dispatch in the result
import AuthService from "../services/auth-service";

// calls the AuthService.login(username, date, time, seats, menuItems)
export const createbooking = (username, date, time, seat) => (dispatch) => {
    return AuthService.createbooking(username, date, time, seat).then(
        (response) => {
        // dispatch BOOKING_SUCCESS and SET_MESSAGE if successful
        dispatch({
            type: BOOKING_SUCCESS,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
        });

        return Promise.resolve();
        },
        (error) => {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: BOOKING_FAIL,
        });
        // dispatch BOOKING_FAIL and SET_MESSAGE if failed
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
        }
    );
};

export const editbooking = (username, date, time, seat) => (dispatch) => {
    return AuthService.editbooking(username, date, time, seat).then(
        (response) => {
        // dispatch BOOKING_SUCCESS and SET_MESSAGE if successful
        dispatch({
            type: BOOKING_SUCCESS,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
        });

        return Promise.resolve();
        },
        (error) => {
        const message =
            (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();

        dispatch({
            type: BOOKING_FAIL,
        });
        // dispatch BOOKING_FAIL and SET_MESSAGE if failed
        dispatch({
            type: SET_MESSAGE,
            payload: message,
        });

        return Promise.reject();
        }
    );
};

export const allmybooking = (username) => (dispatch) => {
    return AuthService.allmybooking(username).then(
        (data) => {
            // dispatch LOGIN_SUCCESS and SET_MESSAGE if successful
            dispatch({
            //  type: LOGIN_SUCCESS,
              payload: { booking: data },
            });
      
            return Promise.resolve();
          },
          (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
      
            dispatch({
          //    type: LOGIN_FAIL,
            });
            // dispatch LOGIN_FAIL and SET_MESSAGE if failed
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
      
            return Promise.reject();
          }
        );
      };