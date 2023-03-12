import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMedicineByIdAction } from '../actions/MedicineActions';
import dimg from '../images/herbal.png';

const ViewMedicine = () => {
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

        dispatch(getMedicineByIdAction(params.productId));
    });

    // Get medicine details from store
    var getMedicine = useSelector((state) => state.fakemedicines.medicine);

    return (
        <div className="card my-5 col-lg-4 col-10 col-sm-8 col-md-8 mx-auto rounded border border-success shadow">
            <img className="card-img-top w-50 p-3 mx-auto" src={dimg} alt=""/>
                <div className="card-body">
                    <h5 className="card-title fst-italic">{ getMedicine?.productName }</h5>
                    <h3 className="text-danger">{ getMedicine?.productCost } <span className='fs-1'>₹</span></h3>

                    <hr/>
                    <span class="text-uppercase">Mfd Date : { getMedicine?.mfd }</span>
                    <p class="text-uppercase">Exp Date : { getMedicine?.expiryDate }</p>
                    <hr/>
                    <p className="card-text">A { getMedicine?.category ? getMedicine.category.categoryName : "Product" } by { getMedicine?.companyName }</p>
                    <Link to='/medicines' type="button" className="btn btn-primary m-2">
                        <i className="bi bi-arrow-return-left"></i> Go Back
                    </Link>
                    <Link to={`/medicines/update/${getMedicine?.productId}`} type="button" className="btn btn-warning m-2">
                        <i className="bi bi-pencil-fill"></i> Update
                    </Link>
                </div>
        </div>
    );
}

export default ViewMedicine;