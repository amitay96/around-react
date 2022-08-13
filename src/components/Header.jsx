import React from 'react';
import logo from "../images/logo.svg";

function Header() {
    return (
        <header className="header">
        <img src={logo} className="logo" alt="Around the U.S logo"></img>
    </header>
    );
}
export default Header;