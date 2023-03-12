import React, { useEffect, useState } from 'react';
import img from '../images/tracking.png';
import { useNavigate, useParams } from 'react-router-dom';
import { addOrderAction } from '../actions/OrderActions';
import { useSelector, useDispatch } from "react-redux";
import { getAllMedicinesAction } from '../actions/MedicineActions';

const BuyNow = () => {
    // to get current date and dispatch date
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    var orderDate = new Date();

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // to get the customer id to place order
    const user = useSelector((state) => state.login.user);

    // get medicine information to show order total
    var medicines = useSelector((state) => state.fakemedicines.medicines);
    const medicine = medicines.filter((m) => m.productId === parseInt(params.productId));

    useEffect(() => {
        if(user.userId !== 0 && user.userType !== "CUSTOMER"){
            return navigate('/unauth');
        } else if (user.userId === 0){
            return navigate('/login');
        }

        dispatch(getAllMedicinesAction());
    }, []);

    const [order] = useState({
        orderDate: orderDate.toISOString().split('T')[0],
        dispatchDate: currentDate.toISOString().split('T')[0],
        totalCost: medicine[0]?.productCost,
        medicines: [{
            productId: params.productId
        }],
        customer: {
            customerId: user.customer.customerId
        }
    })

    const placeOrder = (event) => {
        event.preventDefault();
        dispatch(addOrderAction(order));
        return navigate('/order-placed');
    }

    return (
        <form className="col-lg-4 mx-auto mt-5 bg-light p-5 rounded shadow" onSubmit={placeOrder}>
            <div class="form-group">
                <img src={img} alt="" className='img-fluid w-50'/>
            </div>
            <div class="form-group mt-3">
                <h3 style={{fontFamily: 'cursive'}}>Order Details</h3>
                <hr/>
                <p>Order Item : {medicine[0]?.productName}</p>
                <h5>Order Total : {medicine[0]?.productCost} ₹</h5>
            </div>
            <div class="form-group">
                <input type="checkbox" class="form-input me-2" id="cash" required />
                <label class="form-check-label" for="cash">Pay By Cash</label>
            </div>
            <button type="submit" class="btn btn-primary mt-4">Place Order</button>
        </form>
    )
}

export default BuyNow;