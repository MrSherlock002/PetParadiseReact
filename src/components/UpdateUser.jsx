import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction, getUserByIdAction, getAllUsersAction } from "../actions/UserActions";

const UpdateUser = () => {
    const params = useParams();
    const dispatch = useDispatch();

    // validating user
    const navigate = useNavigate();

    // get updates from store
    const loggedUser = useSelector((state) => state.login.user);
    const allUsers = useSelector((state) => state.fakeusers.users);

    const filteredUser = allUsers.filter(u => { return (u.userId === parseInt(params.userId)) });
    const userToUpdate = filteredUser[0];

    // initialize the state
    const [user, setUser] = useState({
        userId: params.userId,
        userName: "",
        userType: "",
        customer: {
            customerId: "",
            customerName: "",
            customerPassword: ""
        }
    });

    useEffect(() => {
        if (loggedUser.userId !== 0 && loggedUser.userType !== "ADMIN") {
            return navigate('/unauth');
        } else if (loggedUser.userId === 0) {
            return navigate('/login');
        }

        dispatch(getAllUsersAction());
        dispatch(getUserByIdAction(params.userId));
        setUser(userToUpdate);
    }, []);

    // ------------------------ Validation starts ------------------------ //
    const [errors, setErrors] = useState({});

    const schema = {
        userId: Joi.number().min(1).required(),
        userName: Joi.string().min(5).max(16).required(),
        userType: Joi.string().required(),
        customer: {
            customerId: Joi.any().when('userType', { is: "CUSTOMER", then: Joi.number().min(1).required(), otherwise: Joi.optional() }),
            customerName: Joi.any().when('userType', { is: "CUSTOMER", then: Joi.string().required(), otherwise: Joi.optional() }),
            customerPassword: Joi.any().when('userType', { is: "CUSTOMER", then: Joi.string().min(8).required(), otherwise: Joi.optional() })
        }
    }

    const validate = () => {
        const result = Joi.validate(user, schema, {
            abortEarly: false,
        });
        console.log(result);
        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    };
    // ------------------------ Validation ends ------------------------ //

    const updateChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const updateCustomer = (event) => {
        var getUser = user;
        getUser.admin = null;
        setUser({
            ...user,
            customer: {
                ...getUser.customer,
                [event.target.name]: event.target.value
            }
        });
    }

    const updateUser = (event) => {
        event.preventDefault();

        const errors = validate();
        // update state with errors after validation
        setErrors({ errors: errors || {} });

        // update store with new user
        dispatch(updateUserAction(user));

        window.location.href = '/users';
        alert("User updated successfully!");
        return navigate('/users');
    };

    return (
        <div
            style={{ marginLeft: "auto", marginRight: "auto" }}
            className="col-lg-4 col-10 col-sm-8 col-md-8 border p-4 mt-5 shadow"
        >
            <h3 style={{ fontFamily: 'cursive' }}>Update User</h3>
            <form onSubmit={updateUser}>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label float-start">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        defaultValue={userToUpdate.userName}
                        name="userName"
                        onChange={updateChange}
                    />
                    {errors && <small className="text-danger">{errors.userName}</small>}
                </div>
                <div className="mb-3">
                    <label htmlFor="userType" className="form-label float-start">
                        User Type
                    </label>
                    <select
                        className="form-control"
                        id="userType"
                        name="userType"
                        defaultValue={userToUpdate.userType}
                        onChange={updateChange}>
                        <option>Choose...</option>
                        <option value="ADMIN">Admin</option>
                        <option value="CUSTOMER">Customer</option>
                    </select>
                    {errors && <small className="text-danger">{errors.userType}</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="customerName" className="form-label float-start">
                        Customer Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="customerName"
                        defaultValue={userToUpdate.customer ? userToUpdate.customer.customerName : null}
                        name="customerName"
                        onChange={updateCustomer}
                    />
                    {errors && <small className="text-danger">{errors.customer}</small>}
                </div>
                {
                    userToUpdate.userType === "CUSTOMER" &&
                    <div className="mb-3">
                        <label htmlFor="customerPassword" className="form-label float-start">
                            Customer Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="customerPassword"
                            defaultValue={userToUpdate.customer ? userToUpdate.customer.customerPassword : null}
                            name="customerPassword"
                            onChange={updateCustomer}
                        />
                        {errors && <small className="text-danger">{errors.customer}</small>}
                    </div>
                }
                {
                    userToUpdate.userType === "ADMIN" &&
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label float-start">
                            Admin Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            defaultValue={userToUpdate.customer ? userToUpdate.customer.customerPassword : null}
                            name="password"
                            onChange={updateCustomer}
                        />
                        {errors && <small className="text-danger">{errors.admin}</small>}
                    </div>
                }
                <div className="d-grid gap-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <Link to='/users' type="button" className="btn btn-outline-dark">
                        <i className="bi bi-arrow-return-left"></i> Go Back
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;