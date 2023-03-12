import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getAllOrdersAction } from '../actions/OrderActions';
import { getAllMedicinesAction } from '../actions/MedicineActions';
import { getAllUsersAction } from '../actions/UserActions';
import { getAllCustomersAction } from '../actions/CustomerActions';

const Footer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersAction());
        dispatch(getAllMedicinesAction());
        dispatch(getAllUsersAction());
        dispatch(getAllCustomersAction());
    });

    return (
        <div className="d-flex flex-column min-vh-100">
            <footer className="bg-primary text-center text-white mt-auto">
                <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    © {(new Date().getFullYear())} Made with <i class="bi bi-heart-fill"></i> by
                    <Link className="text-white ms-2 text-decoration-none" to="/">Pet Paradise</Link>
                </div>
            </footer>
        </div>
    );
}

export default Footer;