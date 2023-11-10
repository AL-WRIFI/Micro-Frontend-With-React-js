import React, { Fragment } from "react";
import "../assest/header.css";
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Fragment>
            <header className="header-outer">
                <div className="header-inner responsive-wrapper">
                    <div className="header-logo">
                        <h1><strong> Micro Frontend</strong></h1>
                    </div>
                    <nav className="header-navigation">
                        <Link to="/Countries">Countries</Link>
                        <Link to="/Cities">Cities</Link>
                        <Link to="/Currencies">Currencies</Link>
                        <button>Menu</button>
                    </nav>
                </div>
            </header>
        </Fragment>
    );
}

export default Header;
