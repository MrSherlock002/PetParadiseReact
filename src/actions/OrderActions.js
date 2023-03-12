import axios from "axios";

// Get all orders action
export const getAllOrdersAction = () => async (dispatch) => {
  const response = await axios.get("http://localhost:8000/orders/show");
  console.log(response)
  console.log(response.data);
  dispatch({
    type: "GET_ORDERS",
    payload: response.data,
  });
};

// Get order by id action
export const getOrderByIdAction = (id) => async (dispatch) => {
  const response = await axios.get(`http://localhost:8000/orders/view/${id}`);
  console.log(response);
  console.log(response.data);
  dispatch({
    type: "GET_ORDER",
    payload: response.data,
  });
};

// Add a order action
export const addOrderAction = (order) => async (dispatch) => {
  const response = await axios.post("http://localhost:8000/orders/add", order);
  console.log(response);
  console.log(response.data);
  dispatch({
    type: "ADD_ORDER",
    payload: response.data,
  });
};

// Delete a order by id action
export const deleteOrderAction = (id) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:8000/orders/remove/${id}`);
  console.log(response);
  console.log(response.data);
  dispatch({
    type: "DELETE_ORDER",
    payload: response.data,
  });
};

// Update a order action
export const updateOrderAction = (order) => async (dispatch) => {
  const response = await axios.put("http://localhost:8000/orders/update", order);
  console.log(response);
  console.log(response.data);
  dispatch({
    type: "UPDATE_ORDER",
    payload: response.data,
  });
};