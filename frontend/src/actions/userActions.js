import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
  } from "../constants/userConstants";
   
  import axios from "axios";
   
  // Login request to get token
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
   
      // Declare content type so request can be parsed as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
   
      // Extract email and password from route
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
   
      // If successful return the payload with email and password
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
   
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
  }

  export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
   
      // Declare content type so request can be parsed as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
   
      // Extract name,email and password from route
      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );
   
      // If successful return the payload with email and password
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
   
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const { userLogin: { userInfo } } = getState()
   
      // Declare content type so request can be parsed as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        },
      };
   
      // Extract name,email and password from route
      const { data } = await axios.get(`/api/users/${id}`,config);
   
      // If successful return the payload with email and password
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };