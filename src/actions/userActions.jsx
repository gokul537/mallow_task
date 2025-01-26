import apiService from "../common/apiService";

// Fetch users action
export const fetchUsers = (page = 1) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_USERS_REQUEST" });

    // Make the API call with query params
    const response = await apiService.getpram("https://reqres.in/api/users", {
      params: { page },
    });

   

    // Dispatch success action with fetched users
    dispatch({
      type: "FETCH_USERS_SUCCESS",
      payload: {
        page: response.page,
        perpage: response.per_page,
        total: response.total,
        totalpages: response.total_pages,
        users: response.data,
      },
    });
  } catch (error) {
    // Error handling is handled globally in apiService
    dispatch({
      type: "FETCH_USERS_FAILURE",
      payload: "Failed to fetch users",
    });
  }
};


// Create User
export const createUser = (body) => async (dispatch) => {
  dispatch({ type: "CREATE_USER_REQUEST" });
  try {
    const response = await apiService.post("https://reqres.in/api/users", body); // Replace with your API endpoint
    dispatch({ type: "CREATE_USER_SUCCESS", payload: response });
   
  } catch (error) {
    dispatch({ type: "CREATE_USER_FAILURE", payload: error.message });
  }
};


// actions/userActions.js

export const fetchSingleUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_SINGLE_USER_REQUEST" });

    const response = await apiService.get(`https://reqres.in/api/users/${userId}`);

    dispatch({
      type: "FETCH_SINGLE_USER_SUCCESS",
      payload: response.data, 
    });
    console.log("userData", response.data);
  } catch (error) {
    dispatch({
      type: "FETCH_SINGLE_USER_FAILURE",
      payload: error.message || "Failed to fetch user details",
    });
  }
};


// Update User Action
export const updateUser = (userId, body) => async (dispatch) => {


  dispatch({ type: "UPDATE_USER_REQUEST" }); 
  try {
    const response = await apiService.put(`https://reqres.in/api/users/${userId}`, body); 
    
    dispatch({ type: "UPDATE_USER_SUCCESS", payload: response }); 
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_FAILURE", 
      payload: error.message,
    });
  }
};


// deleteUser Action
export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_USER_REQUEST" }); 
  try {
    const response = await apiService.delete(`https://reqres.in/api/users/${id}`); 
    dispatch({ type: "DELETE_USER_SUCCESS", payload: id }); 
  } catch (error) {
    dispatch({ type: "DELETE_USER_FAILURE", payload: error.message }); 
  }
};


