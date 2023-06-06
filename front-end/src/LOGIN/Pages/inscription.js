import React, { useEffect, useState } from 'react';
import Navigation from '../Components/nav';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';


const Inscription = () => {

    // Variables des inputs
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [date, setDate] = useState(null);
    const [radio, setRadio] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Mise en place d'axios
    const url = 'http://localhost:3001/inscription';
    const historique = useHistory();

    const REGEXinput = [
        {
            error: '.sign_nom',
            regex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
            element: nom
        },
        {
            error: '.sign_prenom',
            regex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
            element: prenom
        },
        {
            error: '.sign_email',
            regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            element: email
        },
        {
            error: '.sign_password',
            regex: /.{8,}/,
            element: password
        }

    ]


    function handleSubmit(e) {
        e.preventDefault();

        // Vérification de inputs
        let allTest = true;

        for(const rule of REGEXinput) {
            // récupération des valeurs des inputs
            const input = rule.element;
            const messError = document.querySelector(rule.error);
            
            if(rule.regex.test(input)) {
                messError.style.display = "none";

            } else {
                messError.style.display = "block";
                allTest = false;
            }
        }

        const messBirth = document.querySelector('.sign_birth');
        if(date == null) {
            messBirth.style.display = "block";
            allTest = false;
        } else {
            console.log(date)
            messBirth.style.display = "none";
        }

        const messSexe = document.querySelector('.sign_sexe');
        if(radio == null) {
            messSexe.style.display = "block";
            allTest = false;
        } else {
            console.log(date)
            messSexe.style.display = "none";
        }


        // Envoie vers le server
        if (allTest === true) {

            Axios.post(url,{
                name: nom,
                firstname: prenom,
                birth: date,
                sexe: radio,
                email: email,
                password: password
                })
                    .then(() => {
                        Axios.post('http://localhost:3001/connexion', {
                            email: email,
                            password: password
                        })
                            .then((data) => {
                                let token = data.data.token;
                                localStorage.setItem('token', token);
                                historique.push('/profils');
                            })
                            .catch((err) => console.log(err));
                        })
                    .catch((err) => {
                        const messEmail = document.querySelector('.sign_email');
                        messEmail.style.display = 'block';
                        messEmail.innerHTML = err.response.data.message;
                    });
        }
    }
    

    return (
        <div className="inscription">
            
            <Navigation />
            
            <div className="info">
                <p className="info--text">Inscription</p>

                <form className="form" onSubmit={handleSubmit}>
                    {/* bloc information */}
                    <input type="text" placeholder="Nom" className="form--nom" value={ nom } onChange={ (e) => setNom(e.target.value) }></input>
                    <p className="error sign_nom">Veuillez entrer un nom valide</p>
                    <input type="text" placeholder="Prenom" className="form--nom" value={ prenom } onChange={ (e) => setPrenom(e.target.value) }></input>
                    <p className="error sign_prenom">Veuillez entrer un nom valide</p>
                

                    <div className="form__birth">
                            <p className="form__birth--text">Date de naissance :</p>
                            <input type="date" className="form__birth--date" value={ date } onChange={ (e) => setDate(e.target.value) }></input>
                    </div>
                    <p className="error sign_birth">Entrez votre date de naissance</p>

                    <div className="sexe">
                        <p className="sexe__left">Sexe :</p>
                        <div className="sexe__right">
                            {/* garçon */}
                            <div className="sexe__m sexe__all">
                                <label value="m" className="sexe--label">M</label>
                                <input type="radio" value="m" className="sexe--input" name="radiovalue" onChange={ (e) => setRadio(e.target.value) }></input>
                            </div>
                                {/* fille */}
                            <div className="sexe__f sexe__all">
                                <label value="f" className="sexe--label">F</label>
                                <input type="radio" value="f" className="sexe--input" name="radiovalue" onChange={ (e) => setRadio(e.target.value) }></input>
                            </div>
                        </div>
                    </div>
                    <p className="error sign_sexe">Veuillez renseigner votre sexe</p>

                    {/* bloc compte */}
                    <div className="compte">
                        <p className="compte--texte">Votre compte</p>
                    </div>

                    <input type="text" placeholder="Email" className="form--input" value={ email } onChange={ (e) => setEmail(e.target.value) }></input>
                    <p className="error sign_email">Veuillez saisir une addresse mail valide</p>
                    <input type="password" placeholder="Mot de passe" className="form--input" value={ password } onChange={ (e) => setPassword(e.target.value) }></input>
                    <p className="error sign_password">Votre mot de passe doit contenir au moins 8 caractères</p>

                    <div className="connexion--error"></div>

                    <button className="button" type="submit">Valider</button>
                </form>
            </div>
        </div>
    )
}
export default Inscription;