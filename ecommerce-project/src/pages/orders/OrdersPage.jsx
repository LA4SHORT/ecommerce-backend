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

export function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrdersData = async () => {
            const response = await axios.get('/api/orders?expand=products')
                setOrders(response.data);
        }
        fetchOrdersData();
        loadCart();
    }, [loadCart, cart]);

    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                <OrdersGrid orders={orders} />
            </div>
        </>
    )
}