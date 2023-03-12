import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserAction, getAllUsersAction } from "../actions/UserActions";

const UserDetails = () => {
    const dispatch = useDispatch();

    // validating user
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.user);

    // dispatch action to get users at the time of page loading
    useEffect(() => {
        if (user.userId !== 0 && user.userType !== "ADMIN") {
            return navigate('/unauth');
        } else if (user.userId === 0) {
            return navigate('/login');
        }

        dispatch(getAllUsersAction());
    }, []);

    // Get user details from store
    //dispatch(getAllUsersAction());
    const users = useSelector((state) => state.fakeusers.users);

    const deleteUser = (userId) => {
        console.log(userId);
        const confirmation = window.confirm("Are you sure you want to delete a user?");
        if (confirmation === true) {
            dispatch(deleteUserAction(userId));
            window.location.reload(false);
        }
    };

    return (
        <div className="w-75 mx-auto mt-5">
            <h3 style={{ fontFamily: 'cursive' }}>User List</h3>
            <Link to='/users/add' type="button" className="btn btn-outline-success  mb-3">
                <i className="bi bi-plus-circle-fill"></i> Add User
            </Link>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="bg-primary text-light">
                        <tr>
                            <th>#</th>
                            <th>User Id</th>
                            <th>Username</th>
                            <th>User Type</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((u, index) => (
                            <tr key={u.userId}>
                                <td>{index + 1}</td>
                                <td>{u.userId}</td>
                                <td>{u.userName}</td>
                                <td>{u.userType}</td>
                                <td>{u.customer ? u.customer.customerName : ""}</td>
                                <td>
                                    <Link to={`/users/update/${u.userId}`} type="button">
                                        <i className="bi bi-pen text-success me-3"></i>
                                    </Link>
                                    <Link to={`/users/view/${u.userId}`} type="button">
                                        <i className="bi bi-eye text-primary me-3"></i>
                                    </Link>
                                    <i className="bi bi-trash3-fill text-danger me-2"
                                        type="button"
                                        onClick={() => deleteUser(u.userId)}>
                                    </i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetails;