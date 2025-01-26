import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/authActions";

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, isAuthenticated: true };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
