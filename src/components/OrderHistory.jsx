import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img from '../images/petlogo6.png';
import empty from '../images/box.png';
import { withRouter } from "./WithRouter";
import { connect } from "react-redux";


class OrderHistory extends Component {
    state = {
        orders: {
            orderId: "",
            orderDate: "",
            dispatchDate: "",
            medicine: [],
            customer: {}
        }
    }

    componentDidMount() {
        if(this.props.login.user.userId !== 0 && this.props.login.user.userType !== "CUSTOMER"){
            return this.props.navigate('/unauth');
        } else if (this.props.login.user.userId === 0){
            return this.props.navigate('/login');
        }

        axios
            .get(`http://localhost:8000/orders/show-by-customer/${this.props.login.user?.customer?.customerId}`)
            .then((response) => {
                console.log(response.data);
                this.setState({ orders: response.data })
                console.log(this.state.orders);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        if(this.state.orders.length === 0) return (
            <div>
                <img className="img-fluid mt-5" src={empty} alt="" style={{maxWidth: '300px'}}/>
                <h1 className="mt-5">
                    You haven't ordered anything yet!
                </h1>
                <Link to='/shop' type="button" className="btn btn-primary m-2">
                    <i class="bi bi-cart-fill"></i> Shop
                </Link>
            </div>
        )
       
        return (
            <div class="card rounded-3 my-4 mx-4 shadow">
                { Object.keys(this.state.orders).map((o) => (
                <div class="card-body p-4">
                    <div class="row d-flex justify-content-between align-items-center">
                        <div class="col-md-1 col-lg-1 col-xl-1">
                            <img
                                src={img}
                                class="img-fluid rounded-3" alt="" />
                        </div>
                        <div class="col-md-2 col-lg-2 col-xl-2">
                            <p class="lead fw-normal mb-2">Order Id : {this.state.orders[o].orderId}</p>
                            <p><span class="text-muted">Order Date : {this.state.orders[o].orderDate} </span></p>
                        </div>
                        
                        <div class="col-md-2 col-lg-2 col-xl-2 d-flex">
                            <p className="text-success font-weight-bold">Item will be dispatched by {this.state.orders[o].dispatchDate}</p>
                        </div>
                        <div class="col-md-2 col-lg-2 col-xl-2">
                            Product Name : 
                            {
                                this.state.orders[o].products?.map((m) => (
                                    <p>{m.productName }</p>
                                ))
                            }
                        </div>
                        <div class="col-md-2 col-lg-2 col-xl-2">
                            <h5 class="mb-0">Order Total : {this.state.orders[o].totalCost} ₹</h5>
                        </div>
                    </div>
                </div>
                ))}
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
)(withRouter(OrderHistory));