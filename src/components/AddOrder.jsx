import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Joi from 'joi-browser';
import { withRouter } from "./WithRouter";
import { connect } from "react-redux";

class AddOrder extends Component {
    state = {
        order: {
            orderDate: "",
            dispatchDate: "",
            medicine: {
                productId: ""
            },
            customer: {
                customerId: ""
            }
        },
        // form validation states
        errors: {},
        errMsg: "",
    }

    schema = {
        orderDate: Joi.date().required(),
        dispatchDate: Joi.date().required(),
        customer: {
            customerId: Joi.number().min(1).required()
        },
        medicine: {
            productId: Joi.number().min(1).optional()
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
        const result = Joi.validate(this.state.order, this.schema, {
            abortEarly: false,
        });
        console.log(result);
        if (result.error !== null)
            for (let item of result.error.details) {
                errors[item.path[0]] = item.message;
            }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    // to dynamically set properties of order on input change
    setOrder = (event) => {
        const newOrder = { ...this.state.order };
        newOrder[event.target.name] = event.target.value;
        this.setState({ order: newOrder });
    };

    // to dynamically set properties of customer on input change
    setCustomer = (event) => {
        var order = { ...this.state.order }
        order.customer[event.target.name] = event.target.value;
        this.setState({ order })
    }

    // to dynamically set properties of medicine on input change
    setMedicine = (event) => {
        var order = { ...this.state.order }
        order.medicine[event.target.name] = event.target.value;
        this.setState({ order })
    }

    // post request to add a order
    addOrder = (event) => {
        event.preventDefault();
        console.log(this.state.order);

        // update state with errors after validation
        this.setState({ errors: this.validate() });
        console.log(this.state.errors);
        if (this.state.errors) return;

        axios
            .post("http://localhost:8000/orders/add", this.state.order)
            .then((response) => {
                console.log(response.data);
                window.location.reload(false);
                alert("Order added successfully!");
                window.location.href = '/orders';
            })
            .catch((err) => {
                console.log(err);
                this.setState({ errMsg: err.response.data.message });
            });
    };

    render() {
        const { errors, errMsg } = this.state;
        console.log(this.props.users);
        return (
            <div
                style={{ marginLeft: "auto", marginRight: "auto" }}
                className="col-lg-4 col-10 col-sm-8 col-md-8 border p-4 mt-5 shadow"
            >
                <h3 style={{ fontFamily: 'cursive' }}>Add Order</h3>
                {errMsg && (
                    <div className="alert alert-danger" role="alert">
                        {"Validation error please check your inputs"}
                    </div>
                )}
                <form onSubmit={this.addOrder}>
                    <div className="mb-3">
                        <label htmlFor="orderDate" className="form-label float-start">
                            Order Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="orderDate"
                            value={this.state.order.orderDate}
                            name="orderDate"
                            onChange={this.setOrder}
                        />
                        {errors && <small className="text-danger">{errors.orderDate}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dispatchDate" className="form-label float-start">
                            Dispatch Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="dispatchDate"
                            value={this.state.order.dispatchDate}
                            name="dispatchDate"
                            onChange={this.setOrder}
                        />
                        {errors && <small className="text-danger">{errors.dispatchDate}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerId" className="form-label float-start">
                            Customer
                        </label>
                        <select
                            className="form-control"
                            id="customerId"
                            name="customerId"
                            onChange={this.setCustomer}>
                            <option>Choose...</option>
                            { this.props.users.filter((u) => u.userType === "CUSTOMER")?.map((c) => (
                                <option key={c.customer.customerId} value={c.customer.customerId}>{c.customer.customerName}</option>
                            ))}
                        </select>
                        {errors && <small className="text-danger">{errors.customer}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productId" className="form-label float-start">
                            Product
                        </label>
                        <select
                            className="form-control"
                            id="productId"
                            name="productId"
                            onChange={this.setMedicine}>
                            <option>Choose...</option>
                            { this.props.medicines?.map((m) => (
                                <option key={m.productId} value={m.productId}>{m.medicineName}</option>
                            ))}
                        </select>
                        {errors && <small className="text-danger">{errors.medicine}</small>}
                    </div>
                    <div className="d-grid gap-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <Link to='/orders' type="button" className="btn btn-outline-dark">
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
        medicines: state.fakemedicines.medicines,
        customers: state.fakecustomers.customers,
        users: state.fakeusers.users
    };
};

export default connect(
    mapStateToProps
)(withRouter(AddOrder));