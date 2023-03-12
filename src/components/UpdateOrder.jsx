import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Joi, { log } from "joi-browser";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderAction } from "../actions/OrderActions";

const UpdateOrder = () => {
    const params = useParams();
    const dispatch = useDispatch();

    // validating user
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.user);
    const customers = useSelector((state) => state.fakecustomers.customers);
    const users = useSelector((state) => state.fakeusers.users);
    const orders = useSelector((state) => state.fakeorders.orders);
    const medicines = useSelector((state) => state.fakemedicines.medicines);

    // initialize the state
    const [order, setOrder] = useState({
        orderId: params.orderId,
        orderDate: "",
        dispatchDate: "",
        medicines: [{
            productId: ""
        }],
        customer: {
            customerId: "",
            customerName: ""
        }
    });

    // Get name of medicine using order
    const medName = medicines?.filter((m) => m.productId === order.medicines[0]?.productId)[0];
    console.log(medName);
    const [errors, setErrors] = useState({});

    const schema = {
        orderId: Joi.number().min(1).required(),
        orderDate: Joi.date().required(),
        dispatchDate: Joi.date().required(),
        totalCost: Joi.number().optional(),
        customer: {
            customerId: Joi.number().min(1).required(),
            customerPassword: Joi.string().optional(),
            customerName: Joi.string().optional()
        },
        medicines: [{
            productId: Joi.number().min(1).required()
        }]
    }

    const validate = () => {
        const result = Joi.validate(order, schema, {
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
        .get(`http://localhost:8000/orders/view/${params.orderId}`)
        .then((res) => {
            console.log(res);
            setOrder(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    const updateChange = (event) => {
        setOrder({
            ...order,
            [event.target.name]: event.target.value
        });
    };

    const updateCustomer = (event) => {
        setOrder({
            ...order,
            customer: {
                ...order.customer,
                [event.target.name]: event.target.value
            }
        });
    }

    const updateMedicine = (event) => {
        setOrder({
            ...order,
            medicines: [{
                ...order.medicines,
                [event.target.name]: event.target.value
            }]
        });
    }

    const updateOrder = (event) => {
        event.preventDefault();

        dispatch(updateOrderAction(order));
        window.location.reload(false);
        alert("Order updated successfully!");
        window.location.href = '/orders';
    };

    return (
        <div
            style={{ marginLeft: "auto", marginRight: "auto" }}
            className="col-lg-4 col-10 col-sm-8 col-md-8 border p-4 mt-5 shadow"
            >
                <h3 style={{ fontFamily: 'cursive' }}>Update Order</h3>
                <form onSubmit={ updateOrder }>
                <div className="mb-3">
                        <label htmlFor="orderDate" className="form-label float-start">
                            Order Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="orderDate"
                            defaultValue={order.orderDate}
                            name="orderDate"
                            onChange={updateChange}
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
                            defaultValue={order.dispatchDate}
                            name="dispatchDate"
                            onChange={updateChange}
                        />
                        {errors && <small className="text-danger">{errors.dispatchDate}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="customerId" className="form-label float-start">
                            Ordered By
                        </label>
                        <select
                            className="form-control"
                            id="customerId"
                            name="customerId"
                            onChange={updateCustomer} disabled>
                            <option key={order.customer.customerId} value={order.customer.customerId}>{order.customer.customerName}</option>
                            { /* users.filter((u) => ((u.customer.customerId !== order.customer.customerId) && (u.userType === "CUSTOMER")))?.map((c) => (
                                <option key={c.customer.customerId} value={c.customer.customerId}>{c.customer.customerName}</option>
                            )) */}
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
                            onChange={updateMedicine}>
                            <option value={medName?.productId}>{ medName ? medName.productName : 'Choose...'}</option>
                            { medicines.filter((f) => f.productId !== medName?.productId)?.map((m) => (
                                <option key={m.productId} value={m.productId}>{m.productName}</option>
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
};

export default UpdateOrder;