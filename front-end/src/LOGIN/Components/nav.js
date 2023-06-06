import React from 'react';
import { NavLink } from 'react-router-dom';
import CompletLogo from '../../img/logo-3wa.png';


const Navigation = () => {
    return (
        <div className="nav">
            <div className="navbloc">
                <NavLink exact to="/inscription" className="navbloc--insc" activeClassName="nav-active"> Inscription </NavLink>
                <NavLink exact to="/" className="navbloc--conn" activeClassName="nav-active"> Connexion </NavLink>
            </div>
            <img src={CompletLogo} className="nav--img"/>
        </div>
    );
}

export default Navigation;