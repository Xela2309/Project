import React, { useEffect, useState } from 'react';
import Navigation from '../Components/nav';
import Axios from 'axios';
import { Link, Redirect, useHistory } from 'react-router-dom';


const Connexion = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const url = 'http://localhost:3001/connexion';

    const historique = useHistory();

    function handleSubmit(e) {
         e.preventDefault();
         console.log(email, password);
          

         Axios.post(url, {
                email: email,
                password: password
         })
            .then((data) => { 
                let token = data.data.token;
                localStorage.setItem('token', token);
                historique.push('/accueil');
            })
            .catch((err) => {
                const error = document.querySelector('#error_log');
                error.innerHTML = err.response.data.message;
            });

    }



    return (
        <div className="connexion">

            <Navigation />

            <form className="form" onSubmit={ handleSubmit }>
                <input type="text" placeholder="Email" className="form--input" value={ email } onChange={ (e) => setEmail(e.target.value) }></input>
                <input type="password" placeholder="Mot de passe" className="form--input" value={ password } onChange={ (e) => setPassword(e.target.value) }></input>

                <div className="connexion--error">
                    <p className="connexion--error--p" id="error_log"></p>
                </div>

                <button className="button" type="submit">Connexion</button>
            </form>

        </div>
    );

}

export default Connexion;