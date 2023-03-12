import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Joi from 'joi-browser';
import { withRouter } from "./WithRouter";
import { connect } from "react-redux";

class AddUser extends Component {
    state = {
        user: {
            userName: "",
            userType: "",
            customer: {
                customerName: "",
                customerPassword: ""
            }
        },
        // form validation states
        errors: {},
        errMsg: "",
    }

    schema = {
        userName: Joi.string().min(5).max(16).required(),
        userType: Joi.string().required(),
        customer: {
            customerName: Joi.any().when('userType', { is: "CUSTOMER", then: Joi.string().required(), otherwise: Joi.optional()}),
            customerPassword: Joi.string().min(8).required()
        }
    }

    componentDidMount() {
        if(this.props.login.user.userId !== 0 && this.props.login.user.userType !== "ADMIN"){
            return this.props.navigate('/unauth');
        } else if (this.props.login.user.userId === 0){
            return this.props.navigate('/login');
        }
    }

    validate = () => {
        const errors = {};
        const result = Joi.validate(this.state.user, this.schema, {
            abortEarly: false,
        });
        console.log(result);
        if (result.error !== null)
            for (let item of result.error.details) {
                errors[item.path[0]] = item.message;
            }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    // to dynamically set properties of user on input change
    setUser = (event) => {
        const newUser = { ...this.state.user };
        newUser[event.target.name] = event.target.value;
        this.setState({ user: newUser });
    };

    // to dynamically set properties of customer on input change
    setCustomer = (event) => {
        var user = { ...this.state.user }
        user.customer[event.target.name] = event.target.value;
        this.setState({ user })
    }

    // post request to add a medicine
    addUser = (event) => {
        event.preventDefault();

        // update state with errors after validation
        this.setState({ errors: this.validate() });
        if (this.state.errors) return;

        axios
            .post("http://localhost:8000/users/add", this.state.user)
            .then((response) => {
                console.log(response.data);
                window.location.reload(false);
                alert("User added successfully!");
                window.location.href = "/users";
            })
            .catch((err) => {
                console.log(err);
                this.setState({ errMsg: err.response.data.message });
            });
    };

    render() {
        const { errors, errMsg } = this.state;
        return (
            <div
                style={{ marginLeft: "auto", marginRight: "auto" }}
                className="col-lg-4 col-10 col-sm-8 col-md-8 border p-4 mt-5 shadow"
            >
                <h3 style={{ fontFamily: 'cursive' }}>Add User</h3>
                {errMsg && (
                    <div className="alert alert-danger" role="alert">
                        {"Validation error please check your inputs"}
                    </div>
                )}
                <form onSubmit={this.addUser}>
                    <div className="mb-3">
                        <label htmlFor="userName" className="form-label float-start">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="userName"
                            value={this.state.user.userName}
                            name="userName"
                            onChange={this.setUser}
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
                            onChange={this.setUser}>
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
                            value={this.state.customer ? this.state.customer.customerName : null}
                            name="customerName"
                            onChange={this.setCustomer}
                        />
                        {errors && <small className="text-danger">{errors.customer}</small>}
                    </div>

                    {
                        this.state.user.userType === "CUSTOMER" && 
                    <div className="mb-3">
                        <label htmlFor="customerPassword" className="form-label float-start">
                            Customer Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="customerPassword"
                            value={this.state.customer ? this.state.customer.customerPassword : null}
                            name="customerPassword"
                            onChange={this.setCustomer}
                        />
                        {errors && <small className="text-danger">{errors.customer}</small>}
                    </div>
                    }
                    {
                        this.state.user.userType === "ADMIN" && 
                    <div className="mb-3">
                        <label htmlFor="customerPassword" className="form-label float-start">
                            Admin Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="customerPassword"
                            value={this.state.customer ? this.state.customer.customerPassword : null}
                            name="customerPassword"
                            onChange={this.setCustomer}
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
    }
}

// funtion to get updates from store
const mapStateToProps = (state) => {
    return {
        login: state.login,
    };
};

export default connect(
    mapStateToProps
)(withRouter(AddUser));