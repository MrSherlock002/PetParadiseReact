import axios from "axios";

// action for login
export const loginAction = (user) => (dispatch) => {
    axios
        .post("http://localhost:8000/login", user)
        .then((res) => {
            console.log(res);
            dispatch({
                type: "LOGIN",
                payload: res.data,
            });
        })
        .catch((error) => {
            console.log(error.response.data.message);
            dispatch({
                type: "ERR_RES",
                payload: error.response.data.message,
            });
        });
};
export const logoutAction = (user) => async (dispatch) => {
    const result = await axios.post(`http://localhost:8000/logout`, user);
    console.log(result);
    dispatch({
        type: "LOGOUT",
        payload: result.data,
    });
};