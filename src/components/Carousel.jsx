import React, { Component } from 'react';
import slider1 from '../images/slider-1.jpg';
import slider2 from '../images/slider-2.jpg';
import slider3 from '../images/slider-3.jpg';


class Carousel extends Component {
    render() {
        return (
            <div id="carouselExampleCaptions" className="carousel slide m-5 rounded shadow-lg" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img style={{ maxHeight: '600px' }} src={ slider3 } className="d-block w-100 img-fluid" alt="..." />
                            <div className="carousel-caption d-none d-md-block bg-light px-3 rounded text-dark">
                                <h5>Your one stop shop</h5>
                                <p>Ayurveda is an ancient Indian healing system that focuses on balancing the mind, body, and spirit.</p>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img style={{ maxHeight: '600px' }} src={ slider2 } className="d-block w-100 img-fluid" alt="..." />
                            <div className="carousel-caption d-none d-md-block bg-light px-3 rounded text-dark">
                                <h5>Say no to harmful medicines</h5>
                                <p>Ayurvedic medicine aims to prevent illness—rather than respond to disease—by maintaining a balance between your body, mind, and environment.</p>
                            </div>
                    </div>
                    <div className="carousel-item">
                        <img style={{ maxHeight: '600px' }} src={ slider1 } className="d-block w-100 img-fluid" alt="..." />
                            <div className="carousel-caption d-none d-md-block bg-light px-3 rounded text-dark">
                                <h5>Say yes to ayurveda</h5>
                                <p>Some studies have found that certain herbs may benefit people with heart conditions, inflammation, and low mood.</p>
                            </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        );
    }
}

export default Carousel;