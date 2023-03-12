const initialState = {
  medicines: [],
  medicine: {},
};

const medicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MEDICINES":
      return { ...state, medicines: action.payload };

    case "GET_MEDICINE":
      return { ...state, medicine: action.payload };

    case "ADD_MEDICINE":
      return { ...state, medicines: [...medicines, action.payload] };

    case "DELETE_MEDICINE":
      const medicines = state.medicines.filter((m) => m.id !== action.payload.id);
      return { ...state, medicines: medicines };

    case "UPDATE_MEDICINE":
      return state.medicines.map((m) =>
        m.id === action.payload.id ? action.payload : m
      );

    default:
      return state;
  }
};

export default medicineReducer;