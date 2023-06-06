import React, { useEffect, useState } from "react";
import Navigation from "../Components/nav";
import Axios from "axios";
import { useHistory } from "react-router";


const Newpost = () => {

    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [textLength, setTextLength] = useState('0');

    const url = 'http://localhost:3001/posts';
    const historique = useHistory();
    const token = localStorage.getItem('token');

    if(!token) {
        historique.push('/error');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (textLength <= 250) {

            Axios.post(url, {
                title: titre,
                description: description,
                imageUrl: image
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                console.log('les données ont bien été envoyées');
                historique.push('/accueil')})
            .catch((err) => console.log('les données nont pas été envoyées ' + err));

        } else {

            const error = document.querySelector('#error');
            error.style.display = 'block';
            error.style.color = "red";
        }}
        

    // base64 convertisseur
    function getBase64(e) {
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setImage(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }

     const handleImage = () => {
         setImage(null);
     }

     const handleDescription = (e) => {
        setDescription(e.target.value);
        
     }

     useEffect(() => {
        let textLength = description.length;
        setTextLength(textLength);
        const error = document.querySelector('#error');
        error.style.display = 'none';

        if(textLength > 250) {
            const span = document.querySelector('#textLength');
            span.style.color = 'red';
        } else {
            const span = document.querySelector('#textLength');
            span.style.color = 'black';
        }
     }, [description])



    return (
        <div className="np">
            <Navigation />
            <div className="np__container">
                <h1 className="np__container--title">Exprimez-vous !</h1>
                <form className="np__form" onSubmit={handleSubmit}>

                    <div className="np__form--title">
                        <p className="np--paragraphe">Titre</p>
                        <input type="text" className="np__form--title--titre" value={titre} onChange={ (e) => setTitre(e.target.value) }></input>
                    </div>

                    <div className="np__form--description">
                        <p className="np--paragraphe">Description</p>
                        <textarea className="np__form--description--ta" value={description} onChange={ handleDescription }></textarea>
                        <span id="textLength">{textLength}/250 caractères</span>
                        <span id="error">Votre description est trop longue</span>
                    </div>

                    <div className="np__form--file">
                        <label for="file_button" className="file_button--style">Ajoutez une image !</label>
                        <input type="file" className="np__form--file--in" id="file_button" accept="image/png, image/jpeg, image/jpg" onChange={getBase64}></input>
                        {image && (
                            <div className="np__form--file--container">
                                <img src={image} className="np__form--file--container--img"/>
                                <button className="delete" onClick={handleImage}>x</button>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="np__form--valid">Valider</button>
                </form>
            </div>
        </div>
    )
}

export default Newpost;