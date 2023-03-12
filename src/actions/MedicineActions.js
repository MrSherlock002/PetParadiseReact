import axios from "axios";

// Get all medicines action
export const getAllMedicinesAction = () => async (dispatch) => {
  const response = await axios.get("http://localhost:8000/products/show");

  dispatch({
    type: "GET_MEDICINES",
    payload: response.data,
  });
};

// Get medicine by id action
export const getMedicineByIdAction = (id) => async (dispatch) => {
  const response = await axios.get(`http://localhost:8000/products/view/${id}`);

  dispatch({
    type: "GET_MEDICINE",
    payload: response.data,
  });
};

// Add a medicine action
export const addMedicineAction = (medicine) => async (dispatch) => {
  const response = await axios.post("http://localhost:8000/products/add", medicine);

  dispatch({
    type: "ADD_MEDICINE",
    payload: response.data,
  });
};

// Delete a medicine by id action
export const deleteMedicineAction = (id) => async (dispatch) => {
  const response = await axios.delete(`http://localhost:8000/products/remove/${id}`);

  dispatch({
    type: "DELETE_MEDICINE",
    payload: response.data,
  });
};

// Update a medicine action
export const updateMedicineAction = (medicine) => async (dispatch) => {
  const response = await axios.put("http://localhost:8000/products/update", medicine);

  dispatch({
    type: "UPDATE_MEDICINE",
    payload: response.data,
  });
};