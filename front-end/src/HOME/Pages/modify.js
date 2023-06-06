import React, { useState, useEffect } from "react";
import { Link, Redirect, useHistory } from 'react-router-dom';
import Navigation from "../Components/nav";
import Axios from "axios";
import Cropper from "../Components/cropper";
import Pdp from "../../img/lama.png";

const Modify = () => {

    // variable des inputs
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [date, setDate] = useState('');
    const [radio, setRadio] = useState(null);
    const [bio, setBio] = useState('');
    const [pdpUrl, setPdpUrl] = useState(null);

    const historique = useHistory();
    const token = localStorage.getItem('token');

    let url = 'http://localhost:3001/profils';

    useEffect(() => {

        if (!token) {
            historique.push('/error');
        } else {
            Axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }})
                    .then((data) => {
                        const user = data.data;
                        // injection de la data dans les inputs
                        setPrenom(user.firstname);
                        setNom(user.lastname);
                        setDate(user.birth);
                        setRadio(user.sexe);
                        setBio(user.bio);
                        localStorage.removeItem('img');

                        if(user.imageUrl == null) {
                            setPdpUrl('http://localhost:3001/images/defaultskin.png')
                        } else {
                            setPdpUrl(user.imageUrl);
                        }
                    })
                    .catch((err) => console.log('erreur récupération axios' + err));
        }
        
    }, []);

    
    function post(e) {
        e.preventDefault();

        let img = localStorage.getItem('img');

        if (img != null) {
            console.log('il ya une image')
            Axios.put(url, {
                firstname: prenom,
                lastname: nom,
                birth: date,
                bio: bio,
                sexe: radio,
                imageUrl: img
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            .then(() => {
                console.log('les données ont bien été envoyées !');
                historique.push('/profils')
            })
            .catch(() => console.log('les données nont pas été envoyées :('));
        } else {
            console.log('ilnya pas dimage')
            Axios.put(url, {
                firstname: prenom,
                lastname: nom,
                birth: date,
                bio: bio,
                sexe: radio
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }})
            .then(() => {
                console.log('les données ont bien été envoyées !');
                historique.push('/profils')
            })
            .catch(() => console.log('les données nont pas été envoyées :('));
        }
    }



    return (
        <div className="modif">

            <Navigation />

            <form className="modif__form">

                {/* Nom */}
                <div className="nom">
                    <h2 className="h2_-_modify">Nom, Prénom</h2>
                    <input type="text" className="text text--prenom" placeholder="Prénom" value={ prenom } onChange={ (e) => setPrenom(e.target.value) }></input>
                    <input type="text" className="text" placeholder="Nom" value={ nom } onChange={ (e) => setNom(e.target.value) }></input>
                </div>

                {/* Bio */}
                <div className="bio">
                    <h2 className="h2_-_bio">Biographie</h2>
                    <textarea className="textarea" value={ bio } onChange={ (e) => setBio(e.target.value) }></textarea>
                </div>

                {/* Photo de profil */}
                <div className="pdp">
                    <h2 className="h2_-_pdp">Photo de profil actuel</h2>
                    <img src={ pdpUrl }  className="pdp--img"/>
                    <Cropper />
                </div>

                {/* Sexe et date de naissance */}
                <div className="birth">
                    <h2 className="h2_-_birth">Date de naissance</h2>
                    
                    <input type="date" className="text" value={ date } onChange={ (e) => setDate(e.target.value) }></input>

                </div>
                
                {/* Bouton de confirmation */}
                <div className="button__container">
                    <button onClick={ post } className="validation">Valider</button>
                </div>

            </form>


        </div>
    )
}

export default Modify;