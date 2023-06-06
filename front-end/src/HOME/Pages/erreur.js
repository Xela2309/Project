import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {

    return(
        <div>
            <h1>Une erreur d'authentification</h1>
            <NavLink exact to="/">
                <h3>Cliquez ici pour vous identifier</h3>
            </NavLink>
        </div>
    )
}

export default Error;