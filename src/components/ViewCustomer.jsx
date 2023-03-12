import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerByIdAction } from '../actions/CustomerActions';
import dimg from '../images/customer.png';

const ViewCustomer = () => {
    const params = useParams();
    const dispatch = useDispatch();

    // validating user
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.user);

    useEffect(() => {
        if(user.userId !== 0 && user.userType !== "ADMIN"){
            return navigate('/unauth');
        } else if (user.userId === 0){
            return navigate('/login');
        }

        dispatch(getCustomerByIdAction(params.customerId));
    });

    // Get customer details from store
    var getCustomer = useSelector((state) => state.fakecustomers.customer);

    return (
        <div className="card my-5 col-lg-4 col-10 col-sm-8 col-md-8 mx-auto rounded border border-success shadow">
            <img className="card-img-top w-50 p-3 mx-auto" src={dimg} alt=""/>
                <div className="card-body">
                    <h5 className="card-title fst-italic">{ getCustomer?.customerName }</h5>
                    <h3 className="text-danger hidden">********</h3>

                    <Link to='/customers' type="button" className="btn btn-primary m-2">
                        <i class="bi bi-arrow-return-left"></i> Go Back
                    </Link>
                    <Link to={`/customers/update/${getCustomer?.customerId}`} type="button" className="btn btn-warning m-2">
                        <i class="bi bi-pencil-fill"></i> Update
                    </Link>
                </div>
        </div>
    );
}

export default ViewCustomer;