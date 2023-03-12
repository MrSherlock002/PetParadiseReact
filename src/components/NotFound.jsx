import React from "react";
import { Link } from "react-router-dom";
import notfound from "../images/404-error.png";

const NotFound = () => {

    return (
        <div>
            <img className="img-fluid mt-5" src={notfound} alt="" style={{maxWidth: '300px'}}/>
            <h1 className="mt-5">
                Oops! The page you are looking for is not found
            </h1>
            <Link to='/' type="button" className="btn btn-primary m-2">
                <i class="bi bi-house-fill"></i> Home
            </Link>
        </div>
    );

};

export default NotFound;