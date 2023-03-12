import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteOrderAction, getAllOrdersAction } from "../actions/OrderActions";

const OrderDetails = () => {
    const dispatch = useDispatch();

    // validating user
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.user);

    // dispatch action to get medicines at the time of page loading
    useEffect(() => {
        if(user.userId !== 0 && user.userType !== "ADMIN"){
            return navigate('/unauth');
        } else if (user.userId === 0){
            return navigate('/login');
        }

        dispatch(getAllOrdersAction());
    }, []);

    // Get order details from store
    const orders = useSelector((state) => state.fakeorders.orders);

    const deleteOrder = (orderId) => {
        console.log(orderId);
        const confirmation = window.confirm("Are you sure you want to delete a order?");
        if (confirmation === true) {
            dispatch(deleteOrderAction(orderId));
            window.location.reload(false);
        }
    };

    return (
        <div className="w-75 mx-auto mt-5">
            <h3 style={{ fontFamily: 'cursive' }}>Order List</h3>
            <Link to='/orders/add' type="button" className="btn btn-outline-success  mb-3">
                <i className="bi bi-plus-circle-fill"></i> Add Order
            </Link>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="bg-primary text-light">
                        <tr>
                            <th>#</th>
                            <th>Order Id</th>
                            <th>Order Date</th>
                            <th>Dispatch Date</th>
                            <th>Ordered By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((o, index) => (
                            <tr key={o.orderId}>
                                <td>{index + 1}</td>
                                <td>{o.orderId}</td>
                                <td>{o.orderDate}</td>
                                <td>{o.dispatchDate}</td>
                                <td>{o.customer?.customerName}</td>
                                <td>
                                    <Link to={`/orders/update/${o.orderId}`} type="button">
                                        <i className="bi bi-pen text-success me-3"></i>
                                    </Link>
                                    <Link to={`/orders/view/${o.orderId}`} type="button">
                                        <i className="bi bi-eye text-primary me-3"></i>
                                    </Link>
                                    <i className="bi bi-trash3-fill text-danger me-2"
                                        type="button"
                                        onClick={() => deleteOrder(o.orderId)}>
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

export default OrderDetails;