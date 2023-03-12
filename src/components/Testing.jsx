import React, { Component } from 'react';

class Testing extends Component {
    state = {
        count: 0,
        stepValue: 1,
    };

    increment = () => {
        this.setState({ count: this.state.count + parseInt(this.state.stepValue) });
    };

    decrement = () => {
        this.setState({ count: this.state.count - parseInt(this.state.stepValue) });
    };

    handleChange = (event) => {
        this.setState({ stepValue: event.target.value });
    };

    onSubmit = (event) => {
        event.preventDefault();
    }

    render() {
        return (
            <section>
                <div className="col-lg-4 col-md-6 col-sm-8 col-11 mx-auto my-5 bg-light p-5 rounded shadow">
                    <form className="" onSubmit={this.onSubmit} data-testid="form">
                        <img className="mb-4" src="" alt="" width="72" height="72" />
                        <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
                        <div className="mb-3">
                            <label htmlFor="username" className="sr-only my-2">Username</label>
                            <input
                                type="text" id="username"
                                className="form-control" placeholder="robert@12"
                                name='userName'
                                required="" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="userType" className="sr-only my-2">
                                User Type
                            </label>
                            <select
                                className="form-control"
                                id="userType"
                                name="userType">
                                <option>Choose...</option>
                                <option value="ADMIN">Admin</option>
                                <option value="CUSTOMER">Customer</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only my-2">Password</label>
                            <input
                                type="password" id="password"
                                className="form-control" placeholder="Password"
                                name='password'
                                required />
                        </div>

                        <div>
                            <label htmlFor="customerPassword" className="sr-only my-2">Password</label>
                            <input
                                type="password" id="customerPassword"
                                className="form-control" placeholder="Password"
                                name='customerPassword'
                                required />
                        </div>
                        <br />
                        <button className="btn btn-primary btn-block" type="submit">Login</button>
                    </form>
                </div>
                <div className="w-75 mx-auto">
                    <p className="fs-4 mt-3" data-testid="title">
                        Counter Page
                    </p>

                    <button className="btn btn-primary me-2" onClick={this.decrement}>
                        Decrement
                    </button>
                    <p className="fs-3" data-testid="counter">
                        {this.state.count}
                    </p>

                    <button
                        className="btn btn-secondary ms-2"
                        onClick={this.increment}
                        data-testid="increment"
                    >
                        Increment
                    </button>
                    <form>
                        <div>
                            <label className="form-label">
                                Enter step value
                                <input
                                    id="standard-basic"
                                    type="number"
                                    value={this.state.stepValue}
                                    onChange={this.handleChange}
                                    className="form-control"
                                />
                            </label>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default Testing;