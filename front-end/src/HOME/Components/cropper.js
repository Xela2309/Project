import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import Axios from "axios";
import 'react-image-crop/dist/ReactCrop.css';


// *********************** Important ************************
// Toutes les lignes de code avec un marqueur rouge sont destinées au système de crop qui est temporairement désactivé
// Porblème: le crop renvoie un image au format base64, et multer ne le supporte pas

const Cropper = () => {

    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [newImage, setNewImage] = useState(null);
    const [test, setTest] = useState(null);
    const [validator, setValidator] = useState(`Valider l'image ?`)

    const url = 'http://localhost:3001/profils';

//$$$$$$$$$$$$$$$$$$$$$$$$ Fonction permettant l'affichage de l'image $$$$$$$$$$$$$$$$$$$$$ 

let getCroppedImg = (e) => {
    e.preventDefault();
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
  
    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    const base64Image = canvas.toDataURL("image/jpeg");
    setNewImage(base64Image);
    localStorage.removeItem('img');

};

//$$$$$$$$$$$$$$$$$$$$$$$$ FIN Fonction permettant l'affichage de l'image $$$$$$$$$$$$$$$$$$$$$        

    const handleFile = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setTest(e.target.files[0]);
    }

    const handleClick = (e) => {
        e.preventDefault();
    }

    const changePdp = () => {
        let remove = document.querySelector('#validator');
        remove.style.display = "block";
    }

    const imageValidator = (e) => {
        e.preventDefault();

        localStorage.setItem('img', newImage);
        let remove = document.querySelector('#validator');
        let removeHnadlePdp = document.querySelector('.labelpdp');
        removeHnadlePdp.style.display = "none";
        remove.style.display = "none";
        setValidator(null);
        setFile(null);
    }

    let formData = new FormData();
    formData.append("image", test);


    const testFile = (e) => {
        e.preventDefault();
        console.log(test);
    }


    return(

        <div className="cropper">
            <label for="handlepdp" className="labelpdp">Modifier photo</label>
            <input type="file" accept="image/*" id="handlepdp" onChange={handleFile} className="cropper--in" name="image"></input>
            {file && (
                <div className="recadrage">
                    <h2 className="recadrage--title">Veuillez recadrez votre photo</h2>
                    <ReactCrop src={file} onImageLoaded={setImage} crop={crop} onChange={setCrop} className="recadrage--crop"/>
                    <button onClick={getCroppedImg} className="recadrage--button">recadrer</button>
                </div>
            )}

            {newImage && (
                <div className="preview">
                    <h2>Votre nouvel photo de profil !</h2>
                    <img src={newImage} onChange={changePdp} className="preview--img"/>
                    <button onClick={imageValidator} className="preview--button" id="validator">{validator}</button>
                </div>
            )}
            

        </div>
    )
}

export default Cropper;