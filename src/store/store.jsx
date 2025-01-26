
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
// import authReducer from "../reducers/authReducer";
import { thunk } from "redux-thunk";
import authReducer from "../reducers/authReducer";
import { userReducer } from "../reducers/userReducer";
// import { userReducer } from "../reducers/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
