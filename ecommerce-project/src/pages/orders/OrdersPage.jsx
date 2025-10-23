import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Header } from '../../components/Header';
import CartIcon from '../../assets/images/icons/cart-icon.png';
import SearchIcon from '../../assets/images/icons/search-icon.png';
import LogoWhite from '../../assets/images/logo-white.png';
import MobileLogoWhite from '../../assets/images/mobile-logo-white.png';
import './OrdersPage.css';
import { OrdersGrid } from './OrdersGrid';
import { OrderHeader } from './OrderHeader';

export function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrdersData = async () => {
            const response = await axios.get('/api/orders?expand=products')
                setOrders(response.data);
        }
        fetchOrdersData();
    }, []);

    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

            <Header cart={cart} />

            <div className="header">
                <div className="left-section">
                    <Link to="/" className="header-link">
                        <img className="logo"
                            src={LogoWhite} />
                        <img className="mobile-logo"
                            src={MobileLogoWhite} />
                    </Link>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" />

                    <button className="search-button">
                        <img className="search-icon" src={SearchIcon} />
                    </button>
                </div>

                <div className="right-section">
                    <Link className="orders-link header-link" to="/orders">

                        <span className="orders-text">Orders</span>
                    </Link>

                    <Link className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src={CartIcon} />
                        <div className="cart-quantity">{cart.length}</div>
                        <div className="cart-text">Cart</div>
                    </Link>
                </div>
            </div>

            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrdersGrid orders={orders} />
            </div>
        </>
    )
}