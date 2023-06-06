import React, { useEffect, useState } from "react";
import Navigation from "../Components/nav";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Setting = () => {

    // création des différentes variables
    const url = 'http://localhost:3001/profils'
    const historique = useHistory();
    const token = localStorage.getItem('token');

    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');
    const [sexe, setSexe] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState(null);


    useEffect(() => { 

        // test du token
        if (!token) {
            historique.push('/error');
        } else {
            Axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }})
                    .then((profil) => {
                        const data = profil.data;
                        setName( `${data.firstname} ${data.lastname}` );
                        setPhoto(data.imageUrl);
                        setBio(data.bio);
                        setBirth(data.birth.split('-').reverse().join('-'));
                        if(data.imageUrl != null) {
                            setPhoto(data.imageUrl);
                        } else {
                            setPhoto('http://localhost:3001/images/defaultskin.png');
                        }
                        
            
                        if (data.sexe == 'm') {
                            setSexe(<div><i class="fas fa-mars left__age--icon"></i></div>);
                        } else {
                            setSexe(<div><i class="fas fa-venus left__age--icon--f"></i></div>);
                        }
            
                    })
                    .catch((err) => console.log(err));
        }

         
    }, []);

    // supression de compte
    const handleDelete = () => {
        
        if(window.confirm('Etes-vous sûr de vouloir faire ça, votre compte ainsi que tous vos posts seront définitivement supprimer !')) {
            Axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }})
                    .then(() => {
                        localStorage.removeItem('token')
                        historique.push('/')
                    })
                    .catch((err) => console.log(err));
        } else {
            window.location.reload();
        }
    }
      
    
    return(
        <div className="set">

            <Navigation />

            <div className="container">

                {/* partie PdP */}
                <div className="left">
                    <img src={ photo } className="left--pdp" />
                    <div className="left__age">
                        <p className="left__age--p">Né(e) le : { birth }</p>
                        { sexe }
                    </div>
                </div>

                {/* Partie description */}
                <div className="right">

                    <div className="right__title">
                        <h1 className="right__title--h1">{ name }</h1>
                    </div>
                    <div className="right__bio">
                        <h2>{ bio }</h2>
                    </div>
                    <div className="right__button">
                        <button className="right__button--modify button" onClick={ () => historique.push('/modify')}>Modifier</button>
                        <button className="right__button--delete button" onClick={handleDelete}>Supprimer</button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Setting;