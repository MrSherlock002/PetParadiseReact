import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi-browser";
import { useDispatch, useSelector } from "react-redux";
import { updateCustomerAction } from "../actions/CustomerActions";

const UpdateCustomer = () => {
    const params = useParams();
    const dispatch = useDispatch();

    // validating user
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.user);

    // initialize the state
    const [customer, setCustomer] = useState({
        customerId: params.customerId,
        customerName: "",
        customerPassword: "",
    });

    const [errors, setErrors] = useState({});

    const schema = {
        customerId: Joi.number().min(1).required(),
        customerName: Joi.string().max(128).required(),
        customerPassword: Joi.string().min(8).required(),
    }

    const validate = () => {
        const result = Joi.validate(customer, schema, {
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

    useEffect(() => {
        if(user.userId !== 0 && user.userType !== "ADMIN"){
            return navigate('/unauth');
        } else if (user.userId === 0){
            return navigate('/login');
        }

        axios
        .get(`http://localhost:8000/customers/view/${params.customerId}`)
        .then((res) => {
            console.log(res);
            setCustomer(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    const updateChange = (event) => {
        setCustomer({
            ...customer,
            [event.target.name]: event.target.value
        });
    };

    const updateCustomer = (event) => {
        event.preventDefault();
        
        const errors = validate();
        // update state with errors after validation
        setErrors({ errors: errors || {} });
        console.log(errors);
        if (errors) return;

        dispatch(updateCustomerAction(customer));
        window.location.reload(false);
        alert("Customer updated successfully!");
        window.location.href = '/customers';
    };

    return (
        <div
            style={{ marginLeft: "auto", marginRight: "auto" }}
            className="col-lg-4 col-10 col-sm-8 col-md-8 border p-4 mt-5 shadow"
            >
                <h3 style={{ fontFamily: 'cursive' }}>Update Customer</h3>
                <form onSubmit={ updateCustomer }>
                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label float-start">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerName"
                            defaultValue={customer.customerName}
                            name="customerName"
                            onChange={ updateChange }
                        />
                        { errors && <small className="text-danger">{errors.customerName}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerPassword" className="form-label float-start">
                            Customer Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="customerPassword"
                            defaultValue={customer.customerPassword}
                            name="customerPassword"
                            onChange={updateChange}
                        />
                        { errors && <small className="text-danger">{errors.customerPassword}</small>}
                    </div>
                    <div className="d-grid gap-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <Link to='/customers' type="button" className="btn btn-outline-dark">
                            <i className="bi bi-arrow-return-left"></i> Go Back
                        </Link>
                    </div>
                </form>
            </div>
    );
};

export default UpdateCustomer;