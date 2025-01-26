// Action Types
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const FETCH_SINGLE_USER_REQUEST = "FETCH_SINGLE_USER_REQUEST";
export const FETCH_SINGLE_USER_SUCCESS = "FETCH_SINGLE_USER_SUCCESS";
export const FETCH_SINGLE_USER_FAILURE = "FETCH_SINGLE_USER_FAILURE";
// Initial State
const initialState = {
  loading: false,
  page: 1,
  perPage: 1,
  total: 0,
  totalPages: 0,
  users: [],
  error: null,
  userDetails: {},
};

// Reducer
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
    case FETCH_SINGLE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        page: action.payload.page,
        perPage: action.payload.perPage,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        users: action.payload.users,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [action.payload, ...state.users],
        total: state.total + 1,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case FETCH_SINGLE_USER_SUCCESS:
      return { ...state, loading: false, userDetails: action.payload };

    case FETCH_USERS_FAILURE:
    case CREATE_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
    case FETCH_SINGLE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};