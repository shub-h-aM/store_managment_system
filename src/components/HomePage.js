import React from 'react';
import '../index.css';
import Footer from "./Footer";

const HomePage = () => {
    return (
        <div className="home-page">
            <header>
                <h1>Welcome</h1>
                <p>Explore the latest accessories</p>
            </header>
            <section className="featured-products">
                <h2>Featured Products</h2>
                {/* Display featured products */}
                <div className="product">
                    <img src="/HomePageImg/Product1.jpg" alt="Product 1" />
                    <p>Product 1</p>
                </div>
                <div className="product">
                    <img src="/HomePageImg/Product2.jpg" alt="Product 2" />
                    <p>Product 2</p>
                </div>
                <div className="product">
                    <img src="/HomePageImg/Product3.jpg" alt="Product 3" />
                    <p>Product 3</p>
                </div>
                {/* Add more products as needed */}
            </section>
            <section className="promotion">
                <h2>Special Promotion</h2>
                {/* Display special promotion */}
                <div className="promotion-info">
                    <h3>Get 20% off on all smartphones!</h3>
                    <p>Offer valid till the end of this month. Don't miss out!</p>
                </div>
            </section>
            <section className="categories">
                <h2>Shop by Category</h2>
                {/* Display categories */}
                <div className="category">Category 1</div>
                <div className="category">Category 2</div>
                <div className="category">Category 3</div>
                {/* Add more categories as needed */}
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;
