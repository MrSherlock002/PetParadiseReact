const initialState = {
    customers: [],
    customer: {},
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_CUSTOMERS":
        return { ...state, customers: action.payload };
  
      case "GET_CUSTOMER":
        return { ...state, customer: action.payload };
  
      case "ADD_CUSTOMER":
        return { ...state, customers: [...customers, action.payload] };
  
      case "DELETE_CUSTOMER":
        const customers = state.customers.filter((c) => c.id !== action.payload.id);
        return { ...state, customers: customers };
  
      case "UPDATE_CUSTOMER":
        return state.customers.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
  
      default:
        return state;
    }
  };
  
  export default customerReducer;