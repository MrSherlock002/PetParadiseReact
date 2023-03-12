import React, { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserByIdAction } from '../actions/UserActions';
import dimg from '../images/user.png';

const Profile = () => {
    const dispatch = useDispatch();

    // validating user
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.user);

    useEffect(() => {
        if(user.userId !== 0 && user.userType !== "CUSTOMER"){
            return navigate('/unauth');
        } else if (user.userId === 0){
            return navigate('/login');
        }

        dispatch(getUserByIdAction(user.userId));
    });

    // Get user details from store
    var getUser = useSelector((state) => state.fakeusers.user);

    return (
        <div className="card my-5 col-lg-4 col-10 col-sm-8 col-md-8 mx-auto rounded border border-success shadow">
            <img className="card-img-top w-50 p-3 mx-auto" src={dimg} alt=""/>
                <div className="card-body">
                    <h5 className="card-title fst-italic">Username : { getUser.userName }</h5>
                    <h4 className="text-success">{ getUser.userType }</h4>

                    <hr/>
                    <p className="card-text fst-italic">Your Name : { getUser.customer ? getUser.customer.customerName : null }</p>
                    <p className="card-text fst-italic">Your Password : { getUser.customer?.customerPassword }</p>
                    <Link to='/' type="button" className="btn btn-primary m-2">
                        <i class="bi bi-arrow-return-left"></i> Home
                    </Link>
                </div>
        </div>
    );
}

export default Profile;