import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { withRouter } from "./WithRouter";
import Joi from 'joi-browser';
import logo from '../images/petlogo3.png';
import { addUserAction } from '../actions/UserActions';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        userName: "",
        userType: "CUSTOMER",
        customer: {
            customerName: "",
            customerPassword: ""
        }
    });

    const [errors, setErrors] = useState({});

    const schema = {
        userName: Joi.string().min(5).max(16).required(),
        userType: Joi.string().required(),
        customer: {
            customerName: Joi.string().required(),
            customerPassword: Joi.string().min(8).required(),
        }
    }

    const validate = () => {
        const errors = {};
        const result = Joi.validate(user, schema, {
            abortEarly: false,
        });
        console.log(result);
        if (result.error !== null)
            for (let item of result.error.details) {
                errors[item.path[0]] = item.message;
            }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    const setCustomer = (event) => {
        setUser({
            ...user,
            customer: {
                ...user.customer,
                [event.target.name]: event.target.value
            }
        })
    }

    const setThisUser = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // update state with errors after validation
        setErrors(validate());
        console.log(errors);
        if (errors) return;

        dispatch(addUserAction(user));
        alert("Account created successfully!");
        navigate("/login");
    }

    return (
        <div className="col-lg-4 col-md-6 col-sm-8 col-11 mx-auto my-5 bg-light p-5 rounded shadow">
            <form className="" onSubmit={handleSubmit}>
                <img className="mb-4" src={logo} alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>

                <div>
                    <label for="name" className="text-start my-2"></label>
                    <input 
                        type="text" id="customerName" 
                        className="form-control" placeholder="Name" 
                        name='customerName'
                        value={user.customer.customerName}
                        onChange={setCustomer} 
                        required/>
                </div>

                <div>
                    <label for="username" className="sr-only my-2"></label>
                    <input 
                        type="text" id="username" 
                        className="form-control" placeholder="Username" 
                        name='userName'
                        value={user.userName}
                        onChange={setThisUser}
                        />
                    {errors && <small className="text-danger">{errors.userName}</small>}
                </div>

                <div>
                    <label for="password" className="sr-only my-2"></label>
                    <input 
                        type="password" id="password" 
                        className="form-control" placeholder="Password" 
                        name='customerPassword'
                        value={user.customer.customerPassword}
                        onChange={setCustomer}
                        />
                    {errors && <small className="text-danger">{errors.customer}</small>}
                </div>
                <br />
                <button className="btn btn-primary btn-block" type="submit">Register</button>
            </form>
        </div>
    );
}

export default withRouter(Register);