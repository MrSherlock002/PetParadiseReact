import axios from "axios";

// Get all users action
export const getAllUsersAction = () => async (dispatch) => {
  const response = await axios.get("http://localhost:8000/users/show");

  dispatch({
    type: "GET_USERS",
    payload: response.data,
  });
};

// Get user by id action
export const getUserByIdAction = (id) => async (dispatch) => {
  const response = await axios.get(`http://localhost:8000/users/view/${id}`);

  dispatch({
    type: "GET_USER",
    payload: response.data,
  });
};

// Add a user action
export const addUserAction = (user) => async (dispatch) => {
  const response = await axios.post("http://localhost:8000/users/add", user);

  dispatch({
    type: "ADD_USER",
    payload: response.data,
  });
};

// Delete a user by id action
export const deleteUserAction = (id) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:8000/users/remove/${id}`);

  dispatch({
    type: "DELETE_USER",
    payload: response.data,
  });
};

// Update a user action
export const updateUserAction = (user) => async (dispatch) => {
  const response = await axios.put("http://localhost:8000/users/update", user);

  dispatch({
    type: "UPDATE_USER",
    payload: response.data,
  });
};