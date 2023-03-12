import axios from "axios";

// Get all customers action
export const getAllCustomersAction = () => async (dispatch) => {
  const response = await axios.get("http://localhost:8000/customers/show");
  console.log(response)
  console.log(response.data);
  dispatch({
    type: "GET_CUSTOMERS",
    payload: response.data,
  });
};

// Get customer by id action
export const getCustomerByIdAction = (id) => async (dispatch) => {
  const response = await axios.get(`http://localhost:8000/customers/view/${id}`);
  console.log(response);
  console.log(response.data);
  dispatch({
    type: "GET_CUSTOMER",
    payload: response.data,
  });
};

// Add a customer action
export const addCustomerAction = (customer) => async (dispatch) => {
  const response = await axios.post("http://localhost:8000/customers/add", customer);
  console.log(response);
  console.log(response.data);
  dispatch({
    type: "ADD_CUSTOMER",
    payload: response.data,
  });
};

// Delete a customer by id action
export const deleteCustomerAction = (id) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:8000/customers/remove/${id}`);
  console.log(response);
  console.log(response.data);
  dispatch({
    type: "DELETE_CUSTOMER",
    payload: response.data,
  });
};

// Update a customer action
export const updateCustomerAction = (customer) => async (dispatch) => {
  const response = await axios.put("http://localhost:8000/customers/update", customer);
  console.log(response);
  console.log(response.data);
  dispatch({
    type: "UPDATE_CUSTOMER",
    payload: response.data,
  });
};