import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCustomerAction, getAllCustomersAction } from "../actions/CustomerActions";

const CustomerDetails = () => {
    const dispatch = useDispatch();

    // validating user
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.user);

    // dispatch action to get customers at the time of page loading
    useEffect(() => {
        if(user.userId !== 0 && user.userType !== "ADMIN"){
            return navigate('/unauth');
        } else if (user.userId === 0){
            return navigate('/login');
        }

        dispatch(getAllCustomersAction());
    }, []);

    // Get customer details from store
    const customers = useSelector((state) => state.fakecustomers.customers);

    const deleteCustomer = (customerId) => {
        console.log(customerId);
        const confirmation = window.confirm("Are you sure you want to delete a customer?");
        if (confirmation === true) {
            dispatch(deleteCustomerAction(customerId));
            window.location.reload(false);
        }
    };

    return (
        <div className="w-75 mx-auto mt-5">
            <h3 style={{ fontFamily: 'cursive' }}>Customer List</h3>
            <Link to='/customers/add' type="button" className="btn btn-outline-success  mb-3">
                <i className="bi bi-plus-circle-fill"></i> Add Customer
            </Link>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="bg-primary text-light">
                        <tr>
                            <th>#</th>
                            <th>Customer Id</th>
                            <th>Customer Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { customers?.map((c, index) => (
                            <tr key={c.customerId}>
                                <td>{index + 1}</td>
                                <td>{c.customerId}</td>
                                <td>{c.customerName}</td>
                                <td>
                                    <Link to={`/customers/update/${c.customerId}`} type="button">
                                        <i className="bi bi-pen text-success me-3"></i>
                                    </Link>
                                    <Link to={`/customers/view/${c.customerId}`} type="button">
                                        <i className="bi bi-eye text-primary me-3"></i>
                                    </Link>
                                    <i className="bi bi-trash3-fill text-danger me-2"
                                        type="button"
                                        onClick={() => deleteCustomer(c.customerId)}>
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

export default CustomerDetails;