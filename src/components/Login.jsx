import React, { Component } from 'react';
import { loginAction, logoutAction } from "../actions/LoginActions";
import { withRouter } from "./WithRouter";
import { connect } from "react-redux";
import Joi from 'joi-browser';
import logo from '../images/petlogo3.png';

class Login extends Component {
    state = {
        user: {
            userName: "",
            userType: "",
            customer: {
                customerName: "",
                customerPassword: ""
            }
        },

        errors: {},
        errMsg: "",
    }

    componentDidMount() {
        if(this.props.login.user.userId > 0){
            return this.props.navigate('/');
        } else if (this.props.login.user.userId === 0){
            return this.props.navigate('/login');
        }
    }

    schema = {
        userName: Joi.string().min(5).max(16).required(),
        userType: Joi.string().required(),
        customer: {
            customerName: Joi.any().when('userType', { is: "CUSTOMER", then: Joi.string().required(), otherwise: Joi.optional() }),
            customerPassword: Joi.string().min(8).required()
        }
    }

    validate = () => {
        const errors = {};
        const result = Joi.validate(this.state.user, this.schema, {
            abortEarly: false,
        });

        if (result.error !== null)
            for (let item of result.error.details) {
                errors[item.path[0]] = item.message;
            }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    // Get user input from form and update state object
    handleChange = (event) => {
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

    // Send user credentials to backend for validation
    handleSubmit = (event) => {
        event.preventDefault();

        // update state with errors after validation
        this.setState({ errors: this.validate() });
        if (this.state.errors) return;

        // dispatch login action
        this.props.loginAction(this.state.user);

        // If user enters valid credentials, display alert msg and redirect to home page
        if (this.props.login.user.userId > 0) {
            this.props.navigate("/");
        } else if (this.props.login.user.userName === null) {
            this.props.navigate("/login");
        }
    };

    render() {
        const { errors, errMsg } = this.state;
        return (
            <div className="col-lg-4 col-md-6 col-sm-8 col-11 mx-auto my-5 bg-light p-5 rounded shadow">
                <form className="" onSubmit={this.handleSubmit}>
                    <img className="mb-4" src={logo} alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
                    {errMsg !== "" && (
                        <div className="alert alert-danger p-0" role="alert">
                            {errMsg}
                        </div>
                    )}
                    <div className="mb-3">
                        <input
                            type="text" id="username"
                            className="form-control" placeholder="Username"
                            name='userName'
                            defaultValue={this.state.user.userName}
                            onChange={this.handleChange}
                            required="" />
                        {errors && <small className="text-danger">{errors.userName}</small>}
                    </div>

                    <div className="mb-3">
                        <select
                            className="form-control"
                            id="userType"
                            name="userType"
                            onChange={this.handleChange}>
                            <option>Choose Role...</option>
                            <option value="ADMIN">Admin</option>
                            <option value="CUSTOMER">Customer</option>
                        </select>
                        {errors && <small className="text-danger">{errors.userType}</small>}
                    </div>
                    {
                        this.state.user.userType === "ADMIN" &&
                        <div>
                            <input
                                type="password" id="customerPassword"
                                className="form-control" placeholder="Password"
                                name='customerPassword'
                                defaultValue={this.state.user.customer.customerPassword}
                                onChange={this.setCustomer}
                                required="" />
                            {errors && <small className="text-danger">{errors.customer}</small>}
                        </div>
                    }

                    {
                        this.state.user.userType === "CUSTOMER" &&
                        <div>
                            <input
                                type="password" id="customerPassword"
                                className="form-control" placeholder="Password"
                                name='customerPassword'
                                defaultValue={this.state.user.customer.customerPassword}
                                onChange={this.setCustomer}
                                required />
                            {errors && <small className="text-danger">{errors.customer}</small>}
                        </div>
                    }
                    <br />
                    <button className="btn btn-primary btn-block" type="submit">Login</button>
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

// function to dispatch actions
const mapDispatchToProps = (dispatch) => {
    return {
        loginAction,
        logoutAction,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(withRouter(Login));