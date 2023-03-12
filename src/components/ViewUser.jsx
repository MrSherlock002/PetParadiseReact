import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserByIdAction } from '../actions/UserActions';
import dimg from '../images/user.png';

const ViewUser = () => {
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

        dispatch(getUserByIdAction(params.userId));
    });

    // Get user details from store
    var getUser = useSelector((state) => state.fakeusers.user);

    return (
        <div className="card my-5 col-lg-4 col-10 col-sm-8 col-md-8 mx-auto rounded border border-success shadow">
            <img className="card-img-top w-50 p-3 mx-auto" src={dimg} alt=""/>
                <div className="card-body">
                    <h5 className="card-title fst-italic">{ getUser.userName }</h5>
                    <h4 className="text-success">{ getUser.userType }</h4>

                    <hr/>
                    <p className="card-text">{ getUser.customer ? getUser.customer.customerName : null }</p>
                    <p className="card-text">********</p>
                    <Link to='/users' type="button" className="btn btn-primary m-2">
                        <i className="bi bi-arrow-return-left"></i> Go Back
                    </Link>
                    <Link to={`/users/update/${getUser.userId}`} type="button" className="btn btn-warning m-2">
                        <i className="bi bi-pencil-fill"></i> Update
                    </Link>
                </div>
        </div>
    );
}

export default ViewUser;