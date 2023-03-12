import React from "react";
import { Link } from "react-router-dom";
import unauth from "../images/no-entry.png";

const Unauthorized = () => {

    return (
        <div>
            <img className="img-fluid mt-5" src={unauth} alt="" style={{maxWidth: '300px'}}/>
            <h1 className="mt-5">
                You are not authorized to access the page
            </h1>
            <Link to='/' type="button" className="btn btn-primary m-2">
                <i class="bi bi-house-fill"></i> Home
            </Link>
        </div>
    );

};

export default Unauthorized;