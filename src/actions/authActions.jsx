import axios from "axios";
import apiService from "../common/apiService";

// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Action Creators
const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Thunk for Login
export const login = (body) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await apiService.post("https://reqres.in/api/login", body); // Replace with your API endpoint
    const userData = response;
    
    console.log("userData",response)
    localStorage.setItem("token", userData.token); // Save token to local storage
    dispatch(loginSuccess(userData));
  } catch (error) {
    dispatch(loginFailure(error.response ? error.response.data.message : "Login failed"));
  }
};



