import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Joi from 'joi-browser';
import { withRouter } from "./WithRouter";
import { connect } from "react-redux";

class AddCustomer extends Component {
    state = {
        customer: {
            customerName: "",
            customerPassword: ""
        },
        // form validation states
        errors: {},
        errMsg: "",
    }

    schema = {
        customerName: Joi.string().max(128).required(),
        customerPassword: Joi.string().min(8).required()
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
        const result = Joi.validate(this.state.customer, this.schema, {
            abortEarly: false,
        });
        console.log(result);
        if (result.error !== null)
            for (let item of result.error.details) {
                errors[item.path[0]] = item.message;
            }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    // to dynamically set properties of customer on input change
    setCustomer = (event) => {
        const newCustomer = { ...this.state.customer };
        newCustomer[event.target.name] = event.target.value;
        this.setState({ customer: newCustomer });
    };

    // post request to add a customer
    addCustomer = (event) => {
        event.preventDefault();
        console.log("handleSubmit");

        // update state with errors after validation
        this.setState({ errors: this.validate() });
        console.log(this.state.errors);
        if (this.state.errors) return;

        axios
            .post("http://localhost:8000/customers/add", this.state.customer)
            .then((response) => {
                console.log(response.data);
                window.location.reload(false);
                alert("Customer added successfully!");
                window.location.href = '/customers';
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
                <h3 style={{ fontFamily: 'cursive' }}>Add Customer</h3>
                {errMsg && (
                    <div className="alert alert-danger" role="alert">
                        {"Validation error please check your inputs"}
                    </div>
                )}
                <form onSubmit={this.addCustomer}>
                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label float-start">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="customerName"
                            value={this.state.customer.customerName}
                            name="customerName"
                            onChange={this.setCustomer}
                        />
                        {errors && <small className="text-danger">{errors.customerName}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerPassword" className="form-label float-start">
                            Customer Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="customerPassword"
                            value={this.state.customer.customerPassword}
                            name="customerPassword"
                            onChange={this.setCustomer}
                        />
                        {errors && <small className="text-danger">{errors.customerPassword}</small>}
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
)(withRouter(AddCustomer));