import React from "react";
import { Link } from "react-router-dom";
import placed from "../images/placed.png";

const OrderPlaced = () => {

    return (
        <div>
            <img className="img-fluid mt-5" src={placed} alt="" style={{maxWidth: '300px'}}/>
            <h1 className="mt-5">
                Hurray! Order has been placed successfully
            </h1>
            <Link to='/history' type="button" className="btn btn-primary m-2">
            <i class="bi bi-bag"></i> Order History
            </Link>
            <Link to='/' type="button" className="btn btn-primary m-2">
                <i class="bi bi-house-fill"></i> Home
            </Link>
        </div>
    );

};

export default OrderPlaced;