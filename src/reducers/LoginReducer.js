const initialLoginState = {
  user: {
    userName: "",
    userType: "",
    customer: {
      customerName: "",
      customerPassword: ""
    },
    admin: {
      password: ""
    }
  },
  errMsg: "",
};

const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "ERR_RES":
      return { ...state, errMsg: action.payload };
    case "LOGOUT":
      return { ...state, user: action.payload, errMsg: "" };
    default:
      return state;
  }
};

export default loginReducer;