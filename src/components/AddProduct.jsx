import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Joi from 'joi-browser';
import { withRouter } from "./WithRouter";
import { connect } from "react-redux";

class AddProduct extends Component {
    state = {
        product: {
            productName: "",
            productCost: "",
            description : "",
            category: ""
        },
        // form validation states
        errors: {},
        errMsg: "",
    }

    schema = {
        productName: Joi.string().max(128).required(),
        productCost: Joi.number().min(1).required(),
        productDescription: Joi.string().required(),
        productCategory: Joi.string().required()
    }

    componentDidMount() {
        if(this.props.login.user.userId !== 0 && this.props.login.user.userType !== "ADMIN"){
            return this.props.navigate('/unauth');
        } else if (this.props.login.user.userId === 0){
            return this.props.navigate('/login');
        }
    }

    validate = () => {
        const errors = {};
        const result = Joi.validate(this.state.product, this.schema, {
            abortEarly: false,
        });
        console.log(result);
        if (result.error !== null)
            for (let item of result.error.details) {
                errors[item.path[0]] = item.message;
            }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    // to dynamically set properties of product on input change
    setProduct = (event) => {
        const newProduct = { ...this.state.product };
        newProduct[event.target.name] = event.target.value;
        this.setState({ product: newProduct });
    };

    // to dynamically set properties of category on input change
    setCategory = (event) => {
        var product = { ...this.state.product }
        product.category = event.target.value;
        this.setState({ product })
    }

    // post request to add a product
    addProduct = (event) => {
        event.preventDefault();
        console.log("handleSubmit");

        // update state with errors after validation
        // this.setState({ errors: this.validate() });
        // this.setState({ errors: null });
        // console.log(this.state.errors);
        // if (this.state.errors) return;

        axios
            .post("http://localhost:8000/products/add", this.state.product)
            .then((response) => {
                console.log(response.data);
                window.location.reload(false);
                alert("Product added successfully!");
                window.location.href = "/products";
            })
            .catch((err) => {
                console.log(err);
                this.setState({ errMsg: err.response.data.message });
            });
    };

    render() {
        const { errors, errMsg } = this.state;
        return (
            <div
                style={{ marginLeft: "auto", marginRight: "auto" }}
                className="col-lg-4 col-10 col-sm-8 col-md-8 border p-4 mt-5 shadow"
            >
                <h3 style={{ fontFamily: 'cursive' }}>Add Product</h3>
                {errMsg && (
                    <div className="alert alert-danger" role="alert">
                        {"Validation error please check your inputs"}
                    </div>
                )}
                <form onSubmit={this.addProduct}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label float-start">
                        Product Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            value={this.state.product.productName}
                            name="productName"
                            onChange={this.setProduct}
                        />
                        {errors && <small className="text-danger">{errors.productName}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productCost" className="form-label float-start">
                        Product Cost
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="productCost"
                            value={this.state.product.productCost}
                            name="productCost"
                            onChange={this.setProduct}
                        />
                        {errors && <small className="text-danger">{errors.productCost}</small>}
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="mfd" className="form-label float-start">
                            Manufacture Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="mfd"
                            value={this.state.product.mfd}
                            name="mfd"
                            onChange={this.setProduct}
                        />
                        {errors && <small className="text-danger">{errors.mfd}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expiryDate" className="form-label float-start">
                            Expiry Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="expiryDate"
                            value={this.state.product.expiryDate}
                            name="expiryDate"
                            onChange={this.setProduct}
                        />
                        {errors && <small className="text-danger">{errors.expiryDate}</small>}
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="discription" className="form-label float-start">
                            Discription
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="discription"
                            value={this.state.product.discription}
                            name="discription"
                            onChange={this.setProduct}
                        />
                        {errors && <small className="text-danger">{errors.discription}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryId" className="form-label float-start">
                            Product Category 
                        </label>
                        <input
                            className="form-control"
                            list="categoryList"
                            id="categoryId"
                            value={this.state.product.category.categoryId}
                            name="categoryId"
                            onChange={this.setCategory}
                        />
                        <datalist id="categoryList">
                            <option value="Food">Food</option>
                            <option value="2">Toys</option>
                            <option value="3">Accessories</option>
                        </datalist>
                        {errors && <small className="text-danger">{errors.category}</small>}
                    </div>
                    <div className="d-grid gap-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <Link to='/products' type="button" className="btn btn-outline-dark">
                            <i className="bi bi-arrow-return-left"></i> Go Back
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

// funtion to get updates from store
const mapStateToProps = (state) => {
    return {
        login: state.login,
    };
};

export default connect(
    mapStateToProps
)(withRouter(AddProduct));


