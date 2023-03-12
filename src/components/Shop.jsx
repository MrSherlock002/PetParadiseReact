import React, { useEffect } from 'react';
import img from "../images/petlogo6.png";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMedicinesAction } from '../actions/MedicineActions';

const Shop = () => {
    // dispatch an action
    const dispatch = useDispatch();

    // use state to access data
    const user = useSelector((state) => state.login.user);
    const medicines = useSelector((state) => state.fakemedicines.medicines);

    useEffect(() => {
        dispatch(getAllMedicinesAction());
    }, []);

    return (
        <div class="row ms-3 me-3">
            {medicines.map((m) => (
                <div key={m.productId} className="my-4 col-lg-3 col-12 col-sm-6 col-md-4 rounded shadow">
                    <img className="card-img-top w-25 p-3 mx-3" src={img} alt="" />
                    <div className="card-body">
                        <h5 className="card-title fst-italic">{m.productName}</h5>
                        <h3 className="text-danger">{m.productCost} <span className='fs-1'>₹</span></h3>

                        <hr />
                        {/* class="text-uppercase" */}
                        <span >Description : {m.productDescription}</span>
                        {/* <p class="text-uppercase">Exp Date : {m.expiryDate}</p> */}
                        <hr />
                        {/* A {m.category ? m.category.productCategory : "Product"} by */}
                        <p className="card-text" class="text-uppercase" > {m.productCategory}</p>

                        {user.userId !== 0 && user.userType !== "ADMIN" &&
                            <div>
                                <Link to={`/buy/${m.productId}`} type="button" className="btn btn-success m-2">
                                    <i class="bi bi-cash-coin"></i> Buy now
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Shop;