const initialState = {
    users: [],
    user: {},
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_USERS":
        return { ...state, users: action.payload };
  
      case "GET_USER":
        return { ...state, user: action.payload };
  
      case "ADD_USER":
        return { ...state, users: [...users, action.payload] };
  
      case "DELETE_USER":
        const users = state.users.filter((u) => u.id !== action.payload.id);
        return { ...state, users: users };
  
      case "UPDATE_USER":
        return state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
  
      default:
        return state;
    }
  };
  
  export default userReducer;