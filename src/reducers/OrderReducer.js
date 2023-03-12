const initialState = {
    orders: [],
    order: {},
};
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ORDERS":
        return { ...state, orders: action.payload };
  
      case "GET_ORDER":
        return { ...state, order: action.payload };
  
      case "ADD_ORDER":
        return { ...state, orders: [...orders, action.payload] };
  
      case "DELETE_ORDER":
        const orders = state.orders.filter((o) => o.id !== action.payload.id);
        return { ...state, orders: orders };
  
      case "UPDATE_ORDER":
        return state.orders.map((o) =>
          o.id === action.payload.id ? action.payload : o
        );
  
      default:
        return state;
    }
  };
  
  export default orderReducer;