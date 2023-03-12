import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderByIdAction } from '../actions/OrderActions';
import dimg from '../images/order.png';

const ViewOrder = () => {
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

        dispatch(getOrderByIdAction(params.orderId));
    }, []);

    // Get order details from store
    var getOrder = useSelector((state) => state.fakeorders.order);

    return (
        <div className="card my-5 col-lg-4 col-10 col-sm-8 col-md-8 mx-auto rounded border border-success shadow">
            <img className="card-img-top w-50 p-3 mx-auto" src={dimg} alt=""/>
                <div className="card-body">
                    <h5 className="card-title fst-italic">Order Id: { getOrder?.orderId }</h5>
                    <h4 className="text-success">Ordered by { getOrder?.customer?.customerName }</h4>

                    <hr/>
                    <span class="text-uppercase">Order Date : { getOrder?.orderDate }</span>
                    <p class="text-uppercase">Dispatch Date : { getOrder?.dispatchDate }</p>
                    <Link to='/orders' type="button" className="btn btn-primary m-2">
                        <i class="bi bi-arrow-return-left"></i> Go Back
                    </Link>
                    <Link to={`/orders/update/${getOrder?.orderId}`} type="button" className="btn btn-warning m-2">
                        <i className="bi bi-pencil-fill"></i> Update
                    </Link>
                </div>
        </div>
    );
}

export default ViewOrder;