import React from 'react';
import { Link } from "react-router-dom";
import AuthOption from "../auth/AuthOptions";


function Header() {
    return (
        <header id="header">
           <Link to="/">
            <h1 className="title">MERN auth todo</h1>
           </Link>

           <AuthOption />
        </header>
    )
}

export default Header
